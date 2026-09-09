"use client";

import { useEffect, useRef, useState } from "react";

const mainOptions = [
  { id: "learn", icon: "📚", title: "Aprender um conteúdo", subtitle: "Aulas guiadas por assunto" },
  { id: "solve", icon: "📝", title: "Resolver uma questão passo a passo", subtitle: "Envie sua dúvida" },
  { id: "mock", icon: "🎯", title: "Fazer simulado", subtitle: "Modo prova demonstrativo", badge: "Simulado" },
  { id: "challenge", icon: "🔥", title: "Desafio de Matemática", subtitle: "Teste seu raciocínio" },
  { id: "enem", icon: "🏆", title: "Treino ENEM", subtitle: "Questões contextualizadas" },
  { id: "exam", icon: "🎓", title: "Vestibulares", subtitle: "Fuvest e Unicamp" },
  { id: "progress", icon: "📊", title: "Ver meu desempenho", subtitle: "Resumo desta demonstração" },
  { id: "level", icon: "🚀", title: "Descobrir meu nível", subtitle: "Diagnóstico rápido" },
];

const categories = [
  { name: "Álgebra", count: 5, topics: ["Equações do 1º grau", "Produtos notáveis", "Sistemas lineares"] },
  { name: "Funções", count: 4, topics: ["Função afim", "Função quadrática", "Leitura de gráficos"] },
  { name: "Geometria", count: 5, topics: ["Áreas de figuras", "Teorema de Pitágoras", "Semelhança"] },
  { name: "Trigonometria", count: 2, topics: ["Razões trigonométricas", "Ciclo trigonométrico"] },
  { name: "Sequências", count: 2, topics: ["Progressão aritmética", "Progressão geométrica"] },
  { name: "Matemática financeira", count: 3, topics: ["Porcentagem", "Juros simples", "Juros compostos"] },
  { name: "Probabilidade", count: 2, topics: ["Probabilidade básica", "Análise combinatória"] },
  { name: "Estatística", count: 2, topics: ["Média, moda e mediana", "Gráficos e tabelas"] },
  { name: "ENEM e Vestibulares", count: 3, topics: ["Interpretação", "Estratégias de prova", "Questões mistas"] },
];

const lessons = {
  Porcentagem: [
    { title: "1. O conceito", text: "Porcentagem significa uma parte de cada 100. Assim, 15% representa 15 de 100, ou 15/100 = 0,15.", example: "15% = 15/100 = 0,15" },
    { title: "2. Como calcular", text: "Transforme a porcentagem em decimal e multiplique pelo valor total.", example: "15% de 200 = 0,15 × 200 = 30" },
    { title: "3. Sua vez", text: "Quanto é 20% de 150? Pense antes de avançar.", example: "Resposta: 0,20 × 150 = 30" },
  ],
  "Equações do 1º grau": [
    { title: "1. O conceito", text: "Uma equação é uma igualdade com um valor desconhecido. Nosso objetivo é deixar a incógnita sozinha.", example: "2x + 6 = 18" },
    { title: "2. Equilibrando", text: "Tudo o que fazemos de um lado deve ser feito do outro. Primeiro, subtraímos 6 dos dois lados.", example: "2x = 12" },
    { title: "3. Encontrando x", text: "Agora dividimos os dois lados por 2.", example: "x = 6" },
  ],
};

function tutor(text) { return { role: "tutor", text }; }
function student(text) { return { role: "student", text }; }

export default function ChatApp() {
  const [messages, setMessages] = useState([
    tutor("Fala! 👋 Eu sou o Professor Carlão. Meu foco é fazer você dominar a Matemática com explicações claras e passo a passo. Como posso ajudar agora?")
  ]);
  const [view, setView] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, view, lessonStep]);

  function chooseMain(option) {
    setMessages((m) => [...m, student(option.title)]);
    if (option.id === "learn") {
      setMessages((m) => [...m, tutor("Escolha qual grande área da Matemática você quer estudar agora:")]);
      setView("categories");
      return;
    }
    if (option.id === "solve") {
      setMessages((m) => [...m, tutor("Digite a questão no campo abaixo. Nesta versão demonstrativa, vou mostrar como o atendimento será organizado.")]);
      setView("question");
      return;
    }
    const replies = {
      mock: "Simulado demonstrativo iniciado: 5 questões, uma por vez, com resultado ao final.",
      challenge: "Desafio: um número somado ao seu dobro resulta em 36. Qual é esse número?",
      enem: "Treino ENEM selecionado. Escolha Aprender um conteúdo para revisar uma área antes das questões.",
      exam: "Vestibulares selecionados. A versão completa permitirá escolher banca, assunto e dificuldade.",
      progress: "Desempenho da demonstração: você explorou o tutor guiado. O histórico completo será conectado na próxima etapa.",
      level: "Diagnóstico demonstrativo: responda a algumas questões e o Carlão indicará seu ponto de partida.",
    };
    setMessages((m) => [...m, tutor(replies[option.id])]);
    setView("return");
  }

  function chooseCategory(category) {
    setSelectedCategory(category);
    setMessages((m) => [...m, student(category.name), tutor(`Ótima escolha! Estes são os tópicos de ${category.name}:`)]);
    setView("topics");
  }

  function chooseTopic(topic) {
    setSelectedTopic(topic);
    setLessonStep(0);
    setMessages((m) => [...m, student(topic), tutor(`Perfeito! Vamos começar uma aula guiada de ${topic}.`)]);
    setView("lesson");
  }

  function nextLesson() {
    const steps = lessons[selectedTopic] || lessons["Equações do 1º grau"];
    if (lessonStep < steps.length - 1) setLessonStep((s) => s + 1);
    else {
      setMessages((m) => [...m, tutor("Aula concluída! Você pode revisar outro tópico ou voltar ao menu principal.")]);
      setView("finished");
    }
  }

  function needHelp() {
    setMessages((m) => [...m, student("Não entendi"), tutor("Sem problema. Vou explicar de outro jeito: pense na igualdade como uma balança. Para ela continuar equilibrada, faça sempre a mesma operação nos dois lados.")]);
  }

  function sendQuestion(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, student(text), tutor("Recebi sua questão. Na próxima etapa, a IA fará a leitura e explicará a resolução passo a passo. Por enquanto, este é o fluxo demonstrativo.")]);
    setInput("");
    setView("return");
  }

  function restart() {
    setMessages([tutor("Vamos começar de novo. Como posso ajudar agora?")]);
    setView("main"); setSelectedCategory(null); setSelectedTopic(null); setLessonStep(0); setMenuOpen(false);
  }

  const steps = selectedTopic ? (lessons[selectedTopic] || lessons["Equações do 1º grau"]) : [];
  const currentStep = steps[lessonStep];

  return (
    <main className="app-shell">
      <aside className={menuOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="brand"><div className="brand-mark">C</div><div><strong>Carlão</strong><span>com Giz na Mão</span></div></div>
        <button className="new-chat" onClick={restart}>＋ Nova conversa</button>
        <p className="nav-label">Tutor de Matemática</p>
        <button className="nav-item active" onClick={() => setMenuOpen(false)}>▣ Aula guiada</button>
        <div className="sidebar-tip"><span>✦</span><div><strong>Aprenda no seu ritmo</strong><p>Escolha, pratique e peça outra explicação quando precisar.</p></div></div>
      </aside>
      {menuOpen && <button className="backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}

      <section className="chat-panel">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)}>☰</button>
          <div className="teacher-status"><div className="mini-mark">C</div><div><strong>Professor Carlão</strong><span><i /> Tutor online</span></div></div>
          <span className="demo-badge">Demonstração</span>
        </header>

        <div className="conversation">
          <div className="messages">
            {messages.map((message, index) => (
              <div className={`message-row ${message.role}`} key={index}>
                {message.role === "tutor" && <div className="message-avatar">C</div>}
                <div className="message-bubble"><span>{message.role === "tutor" ? "Professor Carlão" : "Você"}</span><p>{message.text}</p></div>
              </div>
            ))}

            {view === "main" && <OptionList items={mainOptions} onChoose={chooseMain} />}
            {view === "categories" && <OptionList items={categories.map((c) => ({...c, title:c.name, subtitle:`${c.count} tópicos`, badge:`${c.count} tópicos`}))} onChoose={chooseCategory} />}
            {view === "topics" && <OptionList items={selectedCategory.topics.map((t, i) => ({title:t, subtitle:i === 0 ? "Iniciante" : i === 1 ? "Intermediário" : "Prática"}))} onChoose={(o) => chooseTopic(o.title)} />}
            {view === "lesson" && currentStep && (
              <div className="lesson-card">
                <span className="lesson-progress">Etapa {lessonStep + 1} de {steps.length}</span>
                <h2>{currentStep.title}</h2><p>{currentStep.text}</p><div className="formula">{currentStep.example}</div>
                <button className="primary-action" onClick={nextLesson}>Entendi! Ir para a próxima etapa →</button>
                <button className="secondary-action" onClick={needHelp}>? Não entendi</button>
              </div>
            )}
            {(view === "return" || view === "finished") && <div className="actions"><button className="primary-action" onClick={restart}>Voltar ao menu principal</button>{view === "finished" && <button className="secondary-action" onClick={() => {setView("topics");}}>Escolher outro tópico</button>}</div>}
            <div ref={bottomRef} />
          </div>
        </div>

        <footer className="composer-area">
          <form className="composer" onSubmit={sendQuestion}>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={view === "question" ? "Digite ou cole sua questão..." : "Digite sua dúvida de Matemática..."} rows="1" />
            <button type="submit" disabled={!input.trim()}>➜</button>
          </form>
          <p>Versão demonstrativa — respostas livres com IA serão adicionadas na próxima etapa.</p>
        </footer>
      </section>
    </main>
  );
}

function OptionList({ items, onChoose }) {
  return <div className="option-list">{items.map((item) => <button key={item.id || item.name || item.title} onClick={() => onChoose(item)}><span className="option-icon">{item.icon || "›"}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span>{item.badge && <em>{item.badge}</em>}<b>›</b></button>)}</div>;
}
