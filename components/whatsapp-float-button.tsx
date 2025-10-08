'use client';

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
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        
        {/* Tooltip - apenas em desktop */}
        <div className="hidden sm:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Fale conosco no WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </button>
    </div>
  );
}
