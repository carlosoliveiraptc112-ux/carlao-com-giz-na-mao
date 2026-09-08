"use client";

import { useEffect, useRef, useState } from "react";

const suggestions = [
  { icon: "%", title: "Porcentagem", prompt: "Como calculo 15% de 200?" },
  { icon: "½", title: "Frações", prompt: "Explique frações equivalentes." },
  { icon: "x", title: "Equações", prompt: "Resolva 2x + 6 = 18 passo a passo." },
  { icon: "△", title: "Geometria", prompt: "Como calculo a área de um triângulo?" },
];

const demoAnswers = {
  "%": "Para calcular 15% de 200, transforme 15% em 0,15 e multiplique: 0,15 × 200 = 30. Portanto, 15% de 200 é 30.",
  "fraç": "Frações equivalentes representam a mesma quantidade. Por exemplo: 1/2 = 2/4 = 3/6. Multiplicamos o numerador e o denominador pelo mesmo número.",
  "2x": "Vamos resolver: 2x + 6 = 18. Primeiro, subtraia 6 dos dois lados: 2x = 12. Depois, divida os dois lados por 2: x = 6.",
  "área": "A área de um triângulo é base × altura ÷ 2. Se a base mede 8 cm e a altura 5 cm, a área é 8 × 5 ÷ 2 = 20 cm².",
};

function getDemoAnswer(message) {
  const normalized = message.toLocaleLowerCase("pt-BR");
  const key = Object.keys(demoAnswers).find((item) => normalized.includes(item));
  return key
    ? demoAnswers[key]
    : "Ótima pergunta! Nesta primeira versão, a conversa está em modo de demonstração. Na próxima etapa, vou conectar a inteligência artificial para explicar qualquer exercício passo a passo.";
}

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    setMessages((current) => [...current, { role: "student", text: cleanText }]);
    setInput("");

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { role: "carlao", text: getDemoAnswer(cleanText) },
      ]);
    }, 450);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function newConversation() {
    setMessages([]);
    setInput("");
    setIsMenuOpen(false);
  }

  return (
    <main className="app-shell">
      <aside className={isMenuOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">C</div>
          <div>
            <strong>Carlão</strong>
            <span>com Giz na Mão</span>
          </div>
        </div>

        <button className="new-chat" onClick={newConversation} type="button">
          <span aria-hidden="true">＋</span> Nova conversa
        </button>

        <nav aria-label="Menu principal">
          <p className="nav-label">Aprenda Matemática</p>
          <button className="nav-item active" type="button" onClick={() => setIsMenuOpen(false)}>
            <span aria-hidden="true">▣</span> Conversar com Carlão
          </button>
          <button className="nav-item" type="button" disabled>
            <span aria-hidden="true">◷</span> Histórico <small>em breve</small>
          </button>
        </nav>

        <div className="sidebar-tip">
          <span aria-hidden="true">✦</span>
          <div>
            <strong>Aprenda de verdade</strong>
            <p>Peça explicações passo a passo e tire suas dúvidas.</p>
          </div>
        </div>
      </aside>

      {isMenuOpen && (
        <button className="backdrop" aria-label="Fechar menu" onClick={() => setIsMenuOpen(false)} />
      )}

      <section className="chat-panel">
        <header className="topbar">
          <button className="menu-button" type="button" aria-label="Abrir menu" onClick={() => setIsMenuOpen(true)}>☰</button>
          <div className="teacher-status">
            <div className="mini-mark" aria-hidden="true">C</div>
            <div>
              <strong>Professor Carlão</strong>
              <span><i /> Online para ajudar</span>
            </div>
          </div>
          <span className="demo-badge">Versão inicial</span>
        </header>

        <div className="conversation" aria-live="polite">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="hero-mark" aria-hidden="true">C<span>✎</span></div>
              <p className="eyebrow">MATEMÁTICA SEM COMPLICAÇÃO</p>
              <h1>Oi! Eu sou o Carlão.</h1>
              <p className="intro">Mande sua dúvida ou escolha um assunto. Vamos resolver juntos, um passo de cada vez.</p>

              <div className="suggestions" aria-label="Sugestões de perguntas">
                {suggestions.map((item) => (
                  <button key={item.title} type="button" onClick={() => sendMessage(item.prompt)}>
                    <span className="topic-icon" aria-hidden="true">{item.icon}</span>
                    <span><strong>{item.title}</strong><small>{item.prompt}</small></span>
                    <b aria-hidden="true">›</b>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages">
              {messages.map((message, index) => (
                <div className={`message-row ${message.role}`} key={`${message.role}-${index}`}>
                  {message.role === "carlao" && <div className="message-avatar" aria-hidden="true">C</div>}
                  <div className="message-bubble">
                    <span>{message.role === "carlao" ? "Professor Carlão" : "Você"}</span>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <footer className="composer-area">
          <form className="composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="question">Digite sua dúvida de Matemática</label>
            <textarea
              id="question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(input);
                }
              }}
              rows="1"
              placeholder="Digite sua dúvida de Matemática..."
            />
            <button type="submit" aria-label="Enviar pergunta" disabled={!input.trim()}>➜</button>
          </form>
          <p>O Carlão pode cometer erros. Confira informações importantes com seu professor.</p>
        </footer>
      </section>
    </main>
  );
}
