import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = '919876543210';
  const message = encodeURIComponent(
    'Hi Holiday Emporium! I would like to enquire about your travel packages. / नमस्कार! मला तुमच्या प्रवास पॅकेजबद्दल माहिती हवी आहे.'
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg whatsapp-btn hover:scale-110 transition-transform"
      data-testid="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
    </a>
  );
}
