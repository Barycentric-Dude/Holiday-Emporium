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
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg whatsapp-btn hover:scale-110 transition-transform"
      data-testid="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  );
}
