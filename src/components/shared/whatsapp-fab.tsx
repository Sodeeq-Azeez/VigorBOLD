"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  const whatsappNumber = "2348141181083"; // Without the +
  const message = "Hi VigorBOLD, I would like to make an inquiry.";
  const encodedMessage = encodeURIComponent(message);
  
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
