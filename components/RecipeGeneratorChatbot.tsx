
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import XIcon from './icons/XIcon';
import SendMessageIcon from './icons/SendMessageIcon';
import SparklesIcon from './icons/SparklesIcon';
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
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md h-[60vh] flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-2xl animate-fade-in">
            <header className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-lg font-bold text-white">
                        AI Culinary Assistant
                    </h2>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700" aria-label="Close chatbot">
                    <XIcon className="w-5 h-5 text-gray-400" />
                </button>
            </header>
            
            <main className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                     <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-cyan-400"/></div>}
                        <div className={`p-3 rounded-lg max-w-xs md:max-w-sm text-white ${msg.role === 'user' ? 'bg-cyan-600' : 'bg-gray-700'}`}>
                            <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><SparklesIcon className="w-5 h-5 text-cyan-400"/></div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 border-t border-gray-700">
                <div className="relative">
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask anything about food..."
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg pl-4 pr-12 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        disabled={isLoading}
                    />
                     <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-cyan-400 disabled:opacity-50 disabled:hover:text-gray-400 transition-colors">
                        <SendMessageIcon className="w-6 h-6"/>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default RecipeGeneratorChatbot;
