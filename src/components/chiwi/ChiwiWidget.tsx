"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Message {
    role: "user" | "chiwi";
    content: string;
}

export function ChiwiWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "chiwi", content: "Hola. Soy Chiwi. No vengo a venderte atajos. ¿En qué te ayudo a escalar tu audiencia?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll al fondo de la conversación
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");

        // Add user message
        const newHistory = [...messages, { role: "user" as const, content: userMessage }];
        setMessages(newHistory);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages([...newHistory, { role: "chiwi", content: data.response }]);
            } else {
                setMessages([...newHistory, { role: "chiwi", content: "Lo siento, falló mi conexión. Por favor, intenta de nuevo o ve a /contacto." }]);
            }
        } catch (error) {
            setMessages([...newHistory, { role: "chiwi", content: "Error de red inesperado." }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-transform animate-in fade-in"
            >
                <span className="font-bold text-lg leading-none">💬 Chiwi</span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-card border rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 z-50">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
                <div>
                    <h3 className="font-bold">Hablar con Chiwi</h3>
                    <p className="text-xs opacity-80">Respuestas rápidas y honestas</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 text-xl font-bold p-2">✕</button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-muted/20">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted border text-foreground rounded-bl-sm"}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-muted border rounded-2xl px-4 py-2 rounded-bl-sm text-sm flex gap-1 items-center">
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t bg-background flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading || !input.trim()}>
                    ↑
                </Button>
            </form>
        </div>
    );
}
