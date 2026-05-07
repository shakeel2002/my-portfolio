import React, { useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";
import projects from "../data/projects.json";
import skills from "../data/skills.json";

const SESSION_MODE_KEY = "shakeel-bot-mode";
const SESSION_FLOW_KEY = "shakeel-bot-flow";

const MODES = { GENERAL: "GENERAL_MODE", INTERVIEW: "INTERVIEW_MODE", CLIENT: "CLIENT_MODE", CONTACT: "CONTACT_MODE" };
const INTENTS = { ABOUT: "ABOUT", PROJECTS: "PROJECTS", CONTACT: "CONTACT", INTERVIEW: "INTERVIEW", SKILLS: "SKILLS", RESUME: "RESUME", CRM: "CRM", DEFAULT: "DEFAULT" };

const containsAny = (text, words) => words.some((word) => text.includes(word));

const detectIntent = (raw) => {
  const m = raw.toLowerCase().trim();
  if (m === "about" || m === "tell about yourself") return INTENTS.ABOUT;
  if (m === "projects" || m === "show projects" || m === "view projects") return INTENTS.PROJECTS;
  if (m === "contact" || m === "email" || m === "whatsapp") return INTENTS.CONTACT;
  if (m === "skills" || m.includes("skill")) return INTENTS.SKILLS;
  if (m === "resume" || m === "cv" || m === "view resume") return INTENTS.RESUME;
  if (m === "crm demo" || m.includes("crm")) return INTENTS.CRM;
  if (containsAny(m, ["why should we hire", "hire", "experience", "strengths", "interview"])) return INTENTS.INTERVIEW;
  if (containsAny(m, ["project", "build", "app", "website", "cost", "requirement"])) return INTENTS.PROJECTS;
  return INTENTS.DEFAULT;
};

const modeFromIntent = (intent) => {
  if ([INTENTS.INTERVIEW, INTENTS.SKILLS, INTENTS.RESUME].includes(intent)) return MODES.INTERVIEW;
  if ([INTENTS.PROJECTS, INTENTS.CRM].includes(intent)) return MODES.CLIENT;
  if (intent === INTENTS.CONTACT) return MODES.CONTACT;
  return MODES.GENERAL;
};

const renderProject = (project) =>
  `• ${project.title}\n  ${project.description}\n  Tech: ${project.tech.join(", ")}`;

const renderMessageText = (text) => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => {
    const isUrl = /^https?:\/\/[^\s]+$/.test(part);
    if (!isUrl) return <span key={`${part}-${index}`}>{part}</span>;
    return (
      <a
        key={`${part}-${index}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-stitch-red underline break-all"
      >
        {part}
      </a>
    );
  });
};

const ShakeelBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(() => {
    const saved = sessionStorage.getItem(SESSION_MODE_KEY);
    return saved || MODES.GENERAL;
  });
  const [flowState, setFlowState] = useState(() => {
    const saved = sessionStorage.getItem(SESSION_FLOW_KEY);
    return saved
      ? JSON.parse(saved)
      : { clientAskedFollowUp: false, whatsappShown: false, contactShown: false };
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I'm Shakeel Bot. How can I help you today?",
      actions: [
        { label: "About", query: "about" },
        { label: "Projects", query: "projects" },
        { label: "Contact", query: "contact" },
      ],
    },
  ]);

  useEffect(() => {
    sessionStorage.setItem(SESSION_MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    sessionStorage.setItem(SESSION_FLOW_KEY, JSON.stringify(flowState));
  }, [flowState]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendUserMessage = (text) => {
    const userText = text.trim();
    if (!userText) return;

    const normalized = userText.toLowerCase().trim();
    const intent = detectIntent(normalized);
    const nextMode = modeFromIntent(intent);
    setMode(nextMode);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      let reply =
        "I’m mainly here to help with portfolio, projects, interview details, and contact information.";
      let actions = [];
      const nextFlow = { ...flowState };

      if (intent === INTENTS.ABOUT) {
        reply = `I'm ${profile.name}, based in ${profile.location}.\n\nWhy hire me:\n• Strong full stack execution from UI to backend\n• AI workflow integration for real business use\n• Reliable delivery, communication, documentation\n\nI focus on production-ready systems.`;
        actions = [
          { label: "Projects", query: "projects" },
          { label: "Skills", query: "skills" },
          { label: "Contact", query: "contact" },
        ];
      } else if (intent === INTENTS.INTERVIEW) {
        reply = `I'm ${profile.name}, based in ${profile.location}.\n\nWhy hire me:\n• Strong full stack execution from UI to backend\n• Hands-on AI workflow integration for real business use\n• Reliable delivery, communication, and documentation\n\nI focus on production-ready systems, not just demos.`;
        actions = [
          { label: "View Resume", url: profile.resumePath },
          { label: "Skills", query: "skills" },
          { label: "Experience", query: "experience" },
        ];
      } else if (intent === INTENTS.SKILLS) {
        reply = `My Skills:\n\nFrontend:\n• React.js, Tailwind CSS\n\nBackend:\n• Node.js, Flask\n\nAI:\n• TensorFlow, OpenCV\n\nTools:\n• Git, Supabase, Firebase`;
        actions = [
          { label: "Projects", query: "projects" },
          { label: "About", query: "about" },
          { label: "Contact", query: "contact" },
        ];
      } else if (intent === INTENTS.RESUME) {
        reply = `You can view my resume here:\n${profile.resumePath}`;
        actions = [
          { label: "Skills", query: "skills" },
          { label: "Experience", query: "experience" },
        ];
      } else if (intent === INTENTS.PROJECTS || intent === INTENTS.CRM) {
        const crmProject = projects.find((project) => project.id === "smart-crm-system") || projects[0];
        const allProjects = projects.map((project) => `• ${project.title}`).join("\n");
        if (!nextFlow.clientAskedFollowUp) {
          reply = `Here are my key projects:\n${allProjects}\n\n${renderProject(crmProject)}\n\nCould you share your main requirement in one line?`;
          nextFlow.clientAskedFollowUp = true;
          actions = [
            { label: "View CRM", query: "crm demo" },
            { label: "AI Projects", query: "projects" },
          ];
        } else if (!nextFlow.whatsappShown) {
          reply = `Great, thank you.\n\nLet's continue on WhatsApp for faster communication:\n${profile.whatsappLink}`;
          nextFlow.whatsappShown = true;
          actions = [{ label: "WhatsApp Now", url: profile.whatsappLink }];
        } else {
          reply = renderProject(crmProject);
          actions = [{ label: "WhatsApp Now", url: profile.whatsappLink }];
        }
      } else if (intent === INTENTS.CONTACT) {
        if (!nextFlow.contactShown) {
          reply = `You can contact Shakeel here:\n\n📧 ${profile.email}\n📱 WhatsApp available for quick discussion`;
          nextFlow.contactShown = true;
        } else {
          reply = `You can reach me on:\n📧 ${profile.email}\n📱 ${profile.whatsappLink}`;
        }
        actions = [
          { label: "WhatsApp Now", url: profile.whatsappLink },
          { label: "Email", url: `mailto:${profile.email}` },
        ];
      } else if (normalized === "experience") {
        reply = `Experience highlights:\n• ${skills.experienceHighlights.join("\n• ")}`;
        actions = [
          { label: "View Resume", url: profile.resumePath },
          { label: "Skills", query: "skills" },
        ];
      } else {
        if (nextMode === MODES.INTERVIEW) {
          reply = `I'm ${profile.name}, based in ${profile.location}.\n\nWhy hire me:\n• Strong full stack execution from UI to backend\n• Hands-on AI workflow integration for real business use\n• Reliable delivery, communication, and documentation\n\nI focus on production-ready systems, not just demos.`;
          actions = [
            { label: "View Resume", url: profile.resumePath },
            { label: "Skills", query: "skills" },
            { label: "Experience", query: "experience" },
          ];
        } else if (nextMode === MODES.CLIENT) {
          reply = `Please share your requirement scope and timeline.`;
          actions = [{ label: "WhatsApp Now", url: profile.whatsappLink }];
        } else if (nextMode === MODES.CONTACT) {
          reply = `You can reach me here:\n📧 ${profile.email}\n📱 ${profile.whatsappLink}`;
          actions = [
            { label: "WhatsApp Now", url: profile.whatsappLink },
            { label: "Email", url: `mailto:${profile.email}` },
          ];
        } else {
          reply = "Hi 👋 I'm Shakeel Bot. How can I help you today?";
          actions = [
            { label: "About", query: "about" },
            { label: "Projects", query: "projects" },
            { label: "Contact", query: "contact" },
          ];
        }
      }

      setFlowState(nextFlow);
      setIsTyping(false);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === reply) {
          return prev;
        }
        return [...prev, { role: "assistant", content: reply, actions }];
      });
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUserMessage(input);
    setInput("");
  };

  const handleMessageAction = (action) => {
    if (action.query) {
      sendUserMessage(action.query);
      return;
    }
    if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close Shakeel Bot" : "Open Shakeel Bot"}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#d6133b] text-white text-xl shadow-xl hover:bg-[#b00f2e] transition-all duration-200 flex items-center justify-center"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[94vw] max-w-[390px] rounded-2xl border border-white/40 bg-white/75 shadow-2xl backdrop-blur-xl overflow-hidden dark:border-slate-700/60 dark:bg-slate-900/75">
          <div className="px-4 py-3 border-b border-white/40 bg-linear-to-r from-white/70 to-rose-50/70 flex items-start justify-between gap-3 dark:border-slate-700/60 dark:from-slate-900/70 dark:to-slate-800/70">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Shakeel Bot
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Portfolio assistant for recruiters and clients
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-800 text-sm dark:text-slate-300 dark:hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="px-3 pt-3 pb-2 max-h-[330px] overflow-y-auto space-y-2 bg-slate-50/70 dark:bg-slate-950/60">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-3 py-2.5 text-sm whitespace-pre-line leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-white/90 text-slate-800 border border-slate-200 mr-8 dark:bg-slate-800/90 dark:text-slate-100 dark:border-slate-700"
                    : "bg-[#d6133b] text-white ml-8"
                }`}
                style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
              >
                {renderMessageText(message.content)}
                {message.role === "assistant" && message.actions?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.actions.map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => handleMessageAction(action)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors dark:border-rose-400/40 dark:text-rose-200 dark:bg-rose-900/30 dark:hover:bg-rose-900/40"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="rounded-2xl px-3 py-2 text-sm bg-white/90 text-slate-700 border border-slate-200 mr-8 dark:bg-slate-800/90 dark:text-slate-100 dark:border-slate-700">
                <span className="inline-flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: "120ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: "240ms" }}
                  />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-rose-100 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#d6133b] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#b00f2e] transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ShakeelBot;
