'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WhatsAppFloatButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFloatButton({ 
  phoneNumber = "5519989178896", 
  message = "Olá! Gostaria de saber mais sobre o SEMA." 
}: WhatsAppFloatButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para evitar flash durante o carregamento
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    // Remove todos os caracteres não numéricos do número
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-105 group touch-manipulation"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
        style={{ 
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          minWidth: '48px',
          minHeight: '48px'
        }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        
        {/* Tooltip - apenas em desktop */}
        <div className="hidden sm:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Fale conosco no WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </button>
    </div>
  );
}
