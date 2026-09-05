
import type {
  GeminiRequest,
  GeminiResponse,
  EnergyReport,
  Recommendation,
} from './types';

// Gemini-modeller
const PRIMARY_MODEL = 'gemini-3.7-flash';
const FALLBACK_MODEL = 'gemini-3.8-flash';

const GEMINI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';

const TIMEOUT_MS = 20_000;
const MAX_RETRIES = 3;

// Väntetid mellan retries
const RETRY_DELAYS = [1500, 3000, 6000];

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status: number): boolean {
  return (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

async function callGeminiModel(
  model: string,
  request: GeminiRequest,
  apiKey: string
): Promise<GeminiResponse | null> {
  const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`;

  const body = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: request.prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: request.temperature ?? 0.7,
      maxOutputTokens: request.maxOutputTokens ?? 2048,
      responseMimeType: 'application/json',
    },
  });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `🤖 Gemini ${model} - försök ${attempt + 1}/${MAX_RETRIES + 1}`
      );

      const response = await fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        },
        TIMEOUT_MS
      );

      if (response.ok) {
        console.log(`✅ Gemini ${model} svarade korrekt`);
        return (await response.json()) as GeminiResponse;
      }

      const errorText = await response.text();

      console.error(
        `❌ Gemini ${model} error (försök ${attempt + 1}):`,
        response.status,
        response.statusText
      );

      console.error('Google error details:', errorText);

      // Om felet inte är tillfälligt behöver vi inte försöka igen.
      if (!isRetryableStatus(response.status)) {
        console.error(
          `🛑 Felet ${response.status} är inte retryable. Avbryter.`
        );

        return null;
      }

      // Om vi har fler försök kvar
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAYS[attempt] ?? 6000;

        console.log(
          `⏳ Gemini är tillfälligt otillgänglig. Väntar ${delay} ms...`
        );

        await sleep(delay);
      }
    } catch (error) {
      const isTimeout =
        error instanceof Error && error.name === 'AbortError';

      console.error(
        `❌ Gemini ${isTimeout ? 'timeout' : 'call'} (försök ${
          attempt + 1
        }/${MAX_RETRIES + 1}):`,
        error
      );

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAYS[attempt] ?? 6000;

        console.log(
          `⏳ Försöker igen om ${delay} ms...`
        );

        await sleep(delay);
      }
    }
  }

  console.error(`❌ Gemini ${model} misslyckades efter alla försök.`);

  return null;
}

export async function callGemini(
  request: GeminiRequest
): Promise<GeminiResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  console.log(
    '🔑 Gemini API Key laddad:',
    apiKey
      ? `Ja (börjar med ${apiKey.substring(0, 8)}...)`
      : 'NEJ, saknas!'
  );

  if (!apiKey) {
    console.warn(
      '⚠️ GEMINI_API_KEY är inte satt. Använder fallback-rekommendationer.'
    );

    return null;
  }

  // --------------------------------------------------
  // FÖRSÖK 1: Primär modell
  // --------------------------------------------------

  console.log(`🚀 Försöker använda Gemini-modell: ${PRIMARY_MODEL}`);

  const primaryResponse = await callGeminiModel(
    PRIMARY_MODEL,
    request,
    apiKey
  );

  if (primaryResponse) {
    return primaryResponse;
  }

  // --------------------------------------------------
  // FÖRSÖK 2: Alternativ modell
  // --------------------------------------------------

  console.warn(
    `⚠️ ${PRIMARY_MODEL} kunde inte svara. Försöker ${FALLBACK_MODEL}...`
  );

  const fallbackResponse = await callGeminiModel(
    FALLBACK_MODEL,
    request,
    apiKey
  );

  if (fallbackResponse) {
    console.log(
      `✅ Alternativ Gemini-modell ${FALLBACK_MODEL} fungerade`
    );

    return fallbackResponse;
  }

  // --------------------------------------------------
  // BÅDA MODELLERNA MISSLYCKADES
  // --------------------------------------------------

  console.error(
    '❌ Både primär och alternativ Gemini-modell misslyckades.'
  );

  console.warn(
    '⚠️ Applikationen använder fallback-rekommendationer.'
  );

  return null;
}

function extractJson(text: string): unknown {
  const fenceMatch = text.match(
    /```(?:json)?\s*([\s\S]*?)```/
  );

  const jsonStr = fenceMatch ? fenceMatch[1] : text;

  return JSON.parse(jsonStr.trim());
}

export async function getEnergyReport(
  prompt: string
): Promise<EnergyReport> {
  const response = await callGemini({
    prompt,
    temperature: 0.7,
  });

  if (
    !response?.candidates?.[0]?.content?.parts?.[0]?.text
  ) {
    console.warn(
      '⚠️ Inget giltigt Gemini-svar. Använder fallback-report.'
    );

    return getFallbackReport();
  }

  try {
    const text =
      response.candidates[0].content.parts[0].text;

    const parsed = extractJson(text) as EnergyReport;

    if (
      !parsed ||
      typeof parsed.summary !== 'string' ||
      typeof parsed.potentialSavings !== 'number' ||
      !Array.isArray(parsed.recommendations)
    ) {
      console.error(
        '❌ Gemini returnerade JSON med felaktig struktur.'
      );

      return getFallbackReport();
    }

    return parsed;
  } catch (error) {
    console.error(
      '❌ Failed to parse Gemini JSON:',
      error
    );

    return getFallbackReport();
  }
}

function getFallbackReport(): EnergyReport {
  const recommendations: Recommendation[] = [
    {
      type: 'immediate_win',
      title: 'Sänk inomhustemperaturen 1 grad',
      description:
        'Att sänka temperaturen med bara 1 grad kan minska din uppvärmningskostnad med cirka 5%. Det är en gratisåtgärd du kan göra idag.',
      savings: 150,
    },
    {
      type: 'investment',
      title: 'Installera programmerbar termostat',
      description:
        'En smart termostat optimerar uppvärmningen efter dina vanor och sänker kostnaden när du inte är hemma. Betalar sig på under 2 år.',
      cost: 2000,
      roi: 8,
    },
    {
      type: 'subsidy',
      title: 'Rot-avdrag för energieffektivisering',
      description:
        'Du kan ha rätt till skatteavdrag för arbete som förbättrar energieffektiviteten i din bostad. Kontakta Skatteverket för att se om du kvalificerar.',
      link: 'https://www.skatteverket.se',
    },
  ];

  return {
    summary:
      'Baserat på din profil finns det flera effektiva sätt att sänka dina energikostnader. Genom att kombinera gratisåtgärder med riktade investeringar kan du uppnå betydande besparingar.',
    potentialSavings: 350,
    recommendations,
  };
}

