"use client";

import { ExternalLink } from "lucide-react";

interface AffiliateLinkProps {
  name: string;
  description: string;
  url: string;
  category: string;
  calculationId?: string;
}

export function AffiliateLinkCard({ 
  name, 
  description, 
  url, 
  category,
  calculationId 
}: AffiliateLinkProps) {
  const handleClick = async () => {
    // Logga klicket innan användaren navigerar
    try {
      await fetch("/api/affiliate/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliateId: name.toLowerCase().replace(/\s+/g, '_'),
          category,
          calculationId,
        }),
      });
    } catch (error) {
      console.error("Failed to log click:", error);
    }
    
    // Öppna länken i nytt fönster
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {name}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition flex-shrink-0" />
      </div>
      <p className="text-xs text-gray-400 mt-2">*Annonslänk</p>
    </button>
  );
}