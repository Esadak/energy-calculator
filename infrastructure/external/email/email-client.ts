export interface EmailParams {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  console.log(`Email sent to ${params.to}: ${params.subject}`);
  return true;
}
