
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import XIcon from './icons/XIcon';
import SendMessageIcon from './icons/SendMessageIcon';
import DishGenIcon from './icons/DishGenIcon';
import type { ChatMessage } from '../types';

interface ChatbotProps {
    onClose: () => void;
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const RecipeGeneratorChatbot: React.FC<ChatbotProps> = ({ onClose, messages, setMessages }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessageText = input;
        const userMessage: ChatMessage = { role: 'user', text: userMessageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const result = await getChatbotResponse(userMessageText);
        
        const modelMessage: ChatMessage = {
            role: 'model',
            text: result.text
        };
        
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        /* 
         Mobile: Fixed bottom sheet (bottom-0, left-0, w-full)
         Desktop: Floating card (bottom-6, right-6, w-96)
         Z-index 70 to be above recipe detail (60) and other elements.
        */
        <div className="fixed bottom-0 left-0 right-0 w-full z-[70] flex flex-col bg-gray-800 border-t border-gray-700 shadow-2xl animate-fade-in rounded-t-2xl h-[60vh] md:h-[600px] md:max-h-[80vh] md:w-96 md:rounded-xl md:border md:bottom-6 md:right-6 md:left-auto md:top-auto">
            <header className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800 rounded-t-2xl md:rounded-t-xl">
                <div className="flex items-center space-x-2">
                    <div className="bg-gray-700 p-1.5 rounded-lg">
                        <DishGenIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-lg font-bold text-white">
                        Culinary Assistant
                    </h2>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors" aria-label="Close chatbot">
                    <XIcon className="w-5 h-5" />
                </button>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-800/50 scroll-smooth">
                {messages.map((msg, index) => (
                     <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                                <DishGenIcon className="w-full h-full"/>
                            </div>
                        )}
                        <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-md leading-relaxed ${
                            msg.role === 'user' 
                                ? 'bg-cyan-600 text-white rounded-br-none' 
                                : 'bg-gray-700 text-gray-100 rounded-bl-none'
                        }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-end gap-2 justify-start animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <DishGenIcon className="w-full h-full"/>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-2xl rounded-bl-none">
                            <div className="flex items-center space-x-1.5">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-3 md:p-4 border-t border-gray-700 bg-gray-800 md:rounded-b-xl">
                <div className="relative flex items-center">
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about recipes, tips..."
                        className="w-full bg-gray-900 border border-gray-600 rounded-full pl-4 pr-12 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                        disabled={isLoading}
                    />
                     <button 
                        onClick={handleSend} 
                        disabled={isLoading || input.trim() === ''} 
                        className="absolute right-2 p-1.5 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-all shadow-sm"
                     >
                        <SendMessageIcon className="w-5 h-5"/>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default RecipeGeneratorChatbot;
