"use client";

import { useRef, useState } from "react";
import {
  getQuestions,
  normalizeAnswer,
} from "@/data/questions";

const mainOptions = [
  {
    id: "learn",
    icon: "📚",
    title: "Aprender um conteúdo",
    subtitle: "Aulas guiadas por assunto",
  },
  {
    id: "solve",
    icon: "📝",
    title: "Resolver uma questão passo a passo",
    subtitle: "Envie sua dúvida",
  },
  {
    id: "mock",
    icon: "🎯",
    title: "Fazer simulado",
    subtitle: "Modo prova demonstrativo",
    badge: "Simulado",
  },
  {
    id: "challenge",
    icon: "🔥",
    title: "Desafio de Matemática",
    subtitle: "Questões aleatórias",
  },
  {
    id: "enem",
    icon: "🏆",
    title: "Treino ENEM",
    subtitle: "Questões contextualizadas",
  },
  {
    id: "exam",
    icon: "🎓",
    title: "Vestibulares",
    subtitle: "Fuvest e Unicamp",
  },
  {
    id: "progress",
    icon: "📊",
    title: "Ver meu desempenho",
    subtitle: "Resumo desta demonstração",
  },
  {
    id: "level",
    icon: "🚀",
    title: "Descobrir meu nível",
    subtitle: "Diagnóstico rápido",
  },
];

const categories = [
  {
    name: "Álgebra",
    count: 3,
    topics: [
      "Equações do 1º grau",
      "Produtos notáveis",
      "Sistemas lineares",
    ],
  },
  {
    name: "Funções",
    count: 3,
    topics: [
      "Função afim",
      "Função quadrática",
      "Leitura de gráficos",
    ],
  },
  {
    name: "Geometria",
    count: 3,
    topics: [
      "Áreas de figuras",
      "Teorema de Pitágoras",
      "Semelhança",
    ],
  },
  {
    name: "Trigonometria",
    count: 2,
    topics: [
      "Razões trigonométricas",
      "Ciclo trigonométrico",
    ],
  },
  {
    name: "Sequências",
    count: 2,
    topics: [
      "Progressão aritmética",
      "Progressão geométrica",
    ],
  },
  {
    name: "Matemática financeira",
    count: 3,
    topics: [
      "Porcentagem",
      "Juros simples",
      "Juros compostos",
    ],
  },
];

const lessons = {
  Porcentagem: [
    {
      title: "1. O conceito",
      text:
        "Porcentagem significa uma parte de cada 100. Assim, 15% representa 15 de 100.",
      example: "15% = 15/100 = 0,15",
    },
    {
      title: "2. Como calcular",
      text:
        "Transforme a porcentagem em decimal e multiplique pelo valor total.",
      example: "15% de 200 = 0,15 × 200 = 30",
    },
    {
      title: "3. Sua vez",
      text: "Quanto é 20% de 150?",
      example: "20% de 150 = 0,20 × 150 = 30",
    },
  ],

  "Equações do 1º grau": [
    {
      title: "1. O conceito",
      text:
        "Uma equação é uma igualdade que possui um valor desconhecido.",
      example: "2x + 6 = 18",
    },
    {
      title: "2. Equilibrando",
      text:
        "Tudo o que fazemos de um lado da igualdade também deve ser feito do outro.",
      example: "2x + 6 − 6 = 18 − 6",
    },
    {
      title: "3. Encontrando x",
      text:
        "Depois de obter 2x = 12, dividimos os dois lados por 2.",
      example: "x = 6",
    },
  ],
};

const challengeStages = [
  {
    id: "fundamental-ii",
    icon: "📘",
    title: "Fundamental II",
    subtitle: "6º ao 9º ano",
  },
  {
    id: "ensino-medio",
    icon: "🎓",
    title: "Ensino Médio",
    subtitle: "1º ao 3º ano",
  },
];

const challengeLevels = [
  {
    id: "easy",
    icon: "🌱",
    title: "Fácil",
    subtitle: "Fundamentos e cálculos diretos",
  },
  {
    id: "medium",
    icon: "⚡",
    title: "Médio",
    subtitle: "Aplicação e raciocínio",
  },
  {
    id: "hard",
    icon: "🚀",
    title: "Difícil",
    subtitle: "Problemas mais avançados",
  },
];

function tutor(text) {
  return { role: "tutor", text };
}

function student(text) {
  return { role: "student", text };
}

function Avatar({ className, alt = "" }) {
  return (
    <div className={className}>
      <img src="/carlao-avatar.png" alt={alt} />
    </div>
  );
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function ChatApp() {
  const [messages, setMessages] = useState([
    tutor(
      "Fala! 👋 Eu sou o Professor Carlão. Meu foco é fazer você dominar a Matemática com explicações claras e passo a passo. Como posso ajudar agora?"
    ),
  ]);

  const [view, setView] = useState("main");
  const [selectedCategory, setSelectedCategory] =
    useState(null);
  const [selectedTopic, setSelectedTopic] =
    useState(null);
  const [lessonStep, setLessonStep] = useState(0);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [challengeStage, setChallengeStage] =
    useState(null);
  const [challengeLevel, setChallengeLevel] =
    useState(null);
  const [currentChallenge, setCurrentChallenge] =
    useState(null);
  const [lastChallengeId, setLastChallengeId] =
    useState(null);

  const bottomRef = useRef(null);

  function addMessages(...newMessages) {
    setMessages((current) => [
      ...current,
      ...newMessages,
    ]);
  }

  function chooseMain(option) {
    if (!option) return;

    if (option.id === "learn") {
      addMessages(
        student(option.title),
        tutor(
          "Escolha qual grande área da Matemática você quer estudar agora:"
        )
      );

      setView("categories");
      return;
    }

    if (option.id === "solve") {
      addMessages(
        student(option.title),
        tutor(
          "Digite ou cole sua questão no campo abaixo."
        )
      );

      setView("question");
      return;
    }

    if (option.id === "challenge") {
      addMessages(
        student(option.title),
        tutor(
          "Escolha a etapa escolar do desafio:"
        )
      );

      setView("challenge-stages");
      return;
    }

    const replies = {
      mock:
        "O simulado completo será acrescentado em uma próxima atualização.",

      enem:
        "O treino ENEM será acrescentado em uma próxima atualização.",

      exam:
        "O treino para vestibulares será acrescentado em uma próxima atualização.",

      progress:
        "Seu desempenho será registrado quando o sistema de histórico estiver conectado.",

      level:
        "O diagnóstico de nível será acrescentado em uma próxima atualização.",
    };

    addMessages(
      student(option.title),
      tutor(replies[option.id] || "Opção selecionada.")
    );

    setView("return");
  }

  function chooseCategory(category) {
    if (!category) return;

    setSelectedCategory(category);

    addMessages(
      student(category.name),
      tutor(
        `Ótima escolha! Estes são os tópicos de ${category.name}:`
      )
    );

    setView("topics");
  }

  function chooseTopic(topic) {
    if (!topic) return;

    setSelectedTopic(topic);
    setLessonStep(0);

    addMessages(
      student(topic),
      tutor(
        `Perfeito! Vamos começar uma aula guiada de ${topic}.`
      )
    );

    setView("lesson");
  }

  function chooseChallengeStage(stage) {
    setChallengeStage(stage);

    addMessages(
      student(stage.title),
      tutor("Agora escolha o nível do desafio:")
    );

    setView("challenge-levels");
  }

  function chooseChallengeLevel(level) {
    if (!challengeStage) return;

    const bank = getQuestions(
      challengeStage.id,
      level.id
    );

    if (!bank.length) {
      addMessages(
        tutor(
          "Não encontrei questões para essa combinação."
        )
      );

      return;
    }

    const availableQuestions = bank.filter(
      (question) => question.id !== lastChallengeId
    );

    const available = availableQuestions.length
      ? availableQuestions
      : bank;

    const selected =
      available[
        Math.floor(Math.random() * available.length)
      ];

    const preparedQuestion = {
      ...selected,
      options:
        selected.type === "multiple-choice"
          ? shuffle(selected.options)
          : [],
    };

    setChallengeLevel(level);
    setCurrentChallenge(preparedQuestion);
    setLastChallengeId(preparedQuestion.id);

    addMessages(
      student(`Nível ${level.title}`),
      tutor(
        `${preparedQuestion.subject}: ${preparedQuestion.question}`
      )
    );

    setView("challenge");
  }

  function gradeChallengeAnswer(answer) {
    if (!currentChallenge) return;

    const normalized = normalizeAnswer(answer);

    const acceptedAnswers = [
      currentChallenge.answer,
      ...(currentChallenge.accepted || []),
    ].map(normalizeAnswer);

    const correct =
      acceptedAnswers.includes(normalized);

    if (correct) {
      addMessages(
        student(answer),
        tutor(
          `Muito bem! ✅ Resposta correta: ${currentChallenge.answer}.

Resolução passo a passo:

${currentChallenge.explanation}`
        )
      );
    } else {
      addMessages(
        student(answer),
        tutor(
          `Ainda não. ❌ A resposta correta é ${currentChallenge.answer}.

Resolução passo a passo:

${currentChallenge.explanation}`
        )
      );
    }

    setInput("");
    setView("challenge-result");
  }

  function nextLesson() {
    const lessonSteps =
      lessons[selectedTopic] ||
      lessons["Equações do 1º grau"];

    if (lessonStep < lessonSteps.length - 1) {
      setLessonStep((current) => current + 1);
      return;
    }

    addMessages(
      tutor(
        "Aula concluída! Você pode escolher outro tópico ou voltar ao menu principal."
      )
    );

    setView("finished");
  }

  function needHelp() {
    addMessages(
      student("Não entendi"),
      tutor(
        "Sem problema. Pense na igualdade como uma balança: para ela continuar equilibrada, precisamos fazer a mesma operação nos dois lados."
      )
    );
  }

  function sendQuestion(event) {
    event.preventDefault();

    const text = input.trim();

    if (!text) return;

    if (view === "challenge" && currentChallenge) {
      gradeChallengeAnswer(text);
      return;
    }

    addMessages(
      student(text),
      tutor(
        "Recebi sua pergunta. As respostas livres serão conectadas à inteligência artificial em uma etapa futura."
      )
    );

    setInput("");
    setView("return");
  }

  function restart() {
    setMessages([
      tutor(
        "Vamos começar de novo. Como posso ajudar agora?"
      ),
    ]);

    setView("main");
    setSelectedCategory(null);
    setSelectedTopic(null);
    setLessonStep(0);
    setInput("");
    setMenuOpen(false);
    setChallengeStage(null);
    setChallengeLevel(null);
    setCurrentChallenge(null);
  }

  const lessonSteps = selectedTopic
    ? lessons[selectedTopic] ||
      lessons["Equações do 1º grau"]
    : [];

  const currentStep = lessonSteps[lessonStep];

  return (
    <main className="app-shell">
      <aside
        className={
          menuOpen
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <div className="brand">
          <Avatar className="brand-mark" />

          <div>
            <strong>Carlão</strong>
            <span>com Giz na Mão</span>
          </div>
        </div>

        <button
          className="new-chat"
          type="button"
          onClick={restart}
        >
          ＋ Nova conversa
        </button>

        <p className="nav-label">
          Tutor de Matemática
        </p>

        <button
          className="nav-item active"
          type="button"
          onClick={() => setMenuOpen(false)}
        >
          ▣ Aula guiada
        </button>

        <div className="sidebar-tip">
          <span>✦</span>

          <div>
            <strong>Aprenda no seu ritmo</strong>

            <p>
              Escolha, pratique e peça outra explicação
              quando precisar.
            </p>
          </div>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="backdrop"
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <section className="chat-panel">
        <header className="topbar">
          <button
            className="menu-button"
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div className="teacher-status">
            <Avatar className="mini-mark" />

            <div>
              <strong>Professor Carlão</strong>

              <span>
                <i /> Tutor online
              </span>
            </div>
          </div>

          <span className="demo-badge">
            Banco de questões
          </span>
        </header>

        <div className="conversation">
          <div className="messages">
            {messages.map((message, index) => (
              <div
                className={`message-row ${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.role === "tutor" && (
                  <Avatar
                    className="message-avatar"
                    alt="Professor Carlão"
                  />
                )}

                <div className="message-bubble">
                  <span>
                    {message.role === "tutor"
                      ? "Professor Carlão"
                      : "Você"}
                  </span>

                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {view === "main" && (
              <OptionList
                items={mainOptions}
                onChoose={chooseMain}
              />
            )}

            {view === "categories" && (
              <OptionList
                items={categories.map((category) => ({
                  ...category,
                  title: category.name,
                  subtitle: `${category.count} tópicos`,
                  badge: `${category.count} tópicos`,
                }))}
                onChoose={chooseCategory}
              />
            )}

            {view === "topics" &&
              selectedCategory && (
                <OptionList
                  items={selectedCategory.topics.map(
                    (topic, index) => ({
                      title: topic,
                      subtitle:
                        index === 0
                          ? "Iniciante"
                          : index === 1
                          ? "Intermediário"
                          : "Prática",
                    })
                  )}
                  onChoose={(option) =>
                    chooseTopic(option.title)
                  }
                />
              )}

            {view === "challenge-stages" && (
              <OptionList
                items={challengeStages}
                onChoose={chooseChallengeStage}
              />
            )}

            {view === "challenge-levels" && (
              <OptionList
                items={challengeLevels}
                onChoose={chooseChallengeLevel}
              />
            )}

            {view === "challenge" &&
              currentChallenge?.type ===
                "multiple-choice" && (
                <OptionList
                  items={currentChallenge.options.map(
                    (option, index) => ({
                      id: `answer-${index}`,
                      icon: String.fromCharCode(
                        65 + index
                      ),
                      title: option,
                      subtitle:
                        "Escolher esta alternativa",
                    })
                  )}
                  onChoose={(option) =>
                    gradeChallengeAnswer(option.title)
                  }
                />
              )}

            {view === "lesson" && currentStep && (
              <div className="lesson-card">
                <span className="lesson-progress">
                  Etapa {lessonStep + 1} de{" "}
                  {lessonSteps.length}
                </span>

                <h2>{currentStep.title}</h2>
                <p>{currentStep.text}</p>

                <div className="formula">
                  {currentStep.example}
                </div>

                <button
                  className="primary-action"
                  type="button"
                  onClick={nextLesson}
                >
                  Entendi! Ir para a próxima etapa →
                </button>

                <button
                  className="secondary-action"
                  type="button"
                  onClick={needHelp}
                >
                  ? Não entendi
                </button>
              </div>
            )}

            {(view === "return" ||
              view === "finished") && (
              <div className="actions">
                <button
                  className="primary-action"
                  type="button"
                  onClick={restart}
                >
                  Voltar ao menu principal
                </button>

                {view === "finished" &&
                  selectedCategory && (
                    <button
                      className="secondary-action"
                      type="button"
                      onClick={() =>
                        setView("topics")
                      }
                    >
                      Escolher outro tópico
                    </button>
                  )}
              </div>
            )}

            {view === "challenge-result" &&
              challengeLevel && (
                <div className="actions">
                  <button
                    className="primary-action"
                    type="button"
                    onClick={() =>
                      chooseChallengeLevel(
                        challengeLevel
                      )
                    }
                  >
                    Outra questão do mesmo nível
                  </button>

                  <button
                    className="secondary-action"
                    type="button"
                    onClick={() =>
                      setView("challenge-levels")
                    }
                  >
                    Escolher outro nível
                  </button>

                  <button
                    className="secondary-action"
                    type="button"
                    onClick={() =>
                      setView("challenge-stages")
                    }
                  >
                    Escolher outra etapa escolar
                  </button>

                  <button
                    className="secondary-action"
                    type="button"
                    onClick={restart}
                  >
                    Voltar ao menu principal
                  </button>
                </div>
              )}

            <div ref={bottomRef} />
          </div>
        </div>

        <footer className="composer-area">
          <form
            className="composer"
            onSubmit={sendQuestion}
          >
            <textarea
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder={
                view === "challenge"
                  ? "Digite sua resposta..."
                  : view === "question"
                  ? "Digite ou cole sua questão..."
                  : "Digite sua dúvida de Matemática..."
              }
              rows="1"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Enviar resposta"
            >
              ➜
            </button>
          </form>

          <p>
            300 questões com correção e resolução
            explicada.
          </p>
        </footer>
      </section>
    </main>
  );
}

function OptionList({ items, onChoose }) {
  if (!Array.isArray(items)) return null;

  return (
    <div className="option-list">
      {items.map((item, index) => (
        <button
          key={
            item.id ||
            item.name ||
            item.title ||
            index
          }
          type="button"
          onClick={() => onChoose(item)}
        >
          <span className="option-icon">
            {item.icon || "›"}
          </span>

          <span>
            <strong>{item.title}</strong>
            <small>{item.subtitle}</small>
          </span>

          {item.badge && <em>{item.badge}</em>}

          <b>›</b>
        </button>
      ))}
    </div>
  );
}
  

        
