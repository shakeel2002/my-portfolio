import React, { useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";
import projects from "../data/projects.json";

const SESSION_MODE_KEY = "shakeel-bot-mode";
const SESSION_FLOW_KEY = "shakeel-bot-flow";

const MODES = {
  GENERAL: "GENERAL_MODE",
  INTERVIEW: "INTERVIEW_MODE",
  CLIENT: "CLIENT_MODE",
  CONTACT: "CONTACT_MODE",
};
const INTENTS = {
  NAME: "NAME",
  INTERVIEW: "INTERVIEW",
  PROJECT: "PROJECT",
  SKILLS: "SKILLS",
  CONTACT: "CONTACT",
  RESUME: "RESUME",
  PERSONAL: "PERSONAL",
  DEFAULT: "DEFAULT",
};

const containsAny = (text, words) => words.some((word) => text.includes(word));

const detectIntent = (raw) => {
  const m = raw.toLowerCase().trim();
  if (containsAny(m, ["shakeel", "shakeel ahamed", "who is shakeel"]) || m === "about")
    return INTENTS.NAME;
  if (m === "resume" || m === "cv" || m === "view resume") return INTENTS.RESUME;
  if (
    containsAny(m, [
      "why should we hire",
      "experience",
      "tell about yourself",
      "strengths",
      "interview questions",
      "hire",
      "interview",
      "hr",
      "recruiter",
      "job",
    ])
  )
    return INTENTS.INTERVIEW;
  if (
    containsAny(m, [
      "project",
      "build",
      "crm",
      "app",
      "website",
      "cost",
      "requirement",
      "demo",
    ])
  )
    return INTENTS.PROJECT;
  if (
    containsAny(m, [
      "skills",
      "skill",
      "excel",
      "it support",
      "troubleshooting",
      "ai",
      "document",
    ])
  )
    return INTENTS.SKILLS;
  if (containsAny(m, ["contact", "email", "whatsapp", "talk"])) return INTENTS.CONTACT;
  if (containsAny(m, ["age", "dob", "location", "status", "single"])) return INTENTS.PERSONAL;
  return INTENTS.DEFAULT;
};

const modeFromIntent = (intent) => {
  if ([INTENTS.INTERVIEW, INTENTS.SKILLS, INTENTS.RESUME].includes(intent))
    return MODES.INTERVIEW;
  if (intent === INTENTS.PROJECT) return MODES.CLIENT;
  if (intent === INTENTS.CONTACT) return MODES.CONTACT;
  return MODES.GENERAL;
};

const getAgeFromDob = (dob) => {
  const [day, month, year] = dob.split("/").map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() + 1 - month;
  const dayDiff = today.getDate() - day;
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
  return age;
};

const formatProjectThreePoints = (project) =>
  `✔ ${project.title}
• ${project.description}
• Built to deliver practical workflow execution with clear business value
• Impact / Tech: ${project.tech.join(", ")}`;

const getProjectResponse = () =>
  `Here are key projects:\n\n${projects.map(formatProjectThreePoints).join("\n\n")}`;

const getSkillsResponse = () =>
  `Excel / Document Work
• Used for reporting, tracking, and structured data management in live projects
• Supports document control, version flow, and business workflow tracking

IT Support
• Handled troubleshooting, software installation, and user support operations
• Worked in Windows environments with system maintenance and networking basics

AI / Development
• Built full stack systems with modern UI, APIs, and automation workflows
• Implemented AI integrations (YOLOv5, OpenCV, prompt engineering) for practical outcomes`;

const getInterviewResponse = () =>
  `Why hire Shakeel:
• Strong full stack + AI engineering capability for real-world product delivery
• Hands-on project execution across CRM, AI apps, and workflow automation
• Proven IT support and documentation control experience (Excel, version tracking)
• Reliable problem-solving mindset with ownership from build to deployment
• UAE job readiness with professional communication and active availability`;

const CONTACT_PHONE = "+971589098875";

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
      : {
          clientAskedFollowUp: false,
          whatsappShown: false,
          contactShown: false,
          lastIntent: "",
        };
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I'm Shakeel Bot. How can I help you today?",
      actions: [
        { label: "About", query: "who is shakeel" },
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

    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      let actions = [];
      const nextFlow = { ...flowState };
      const showActions = flowState.lastIntent !== intent;

      if (intent === INTENTS.NAME) {
        reply = `${profile.name} is a Full Stack Developer + AI Engineer based in ${profile.location}.\n\nHe is actively job searching and focused on building scalable products, IT-supported workflows, and business-ready systems.`;
        actions = showActions
          ? [
              { label: "Projects", query: "projects" },
              { label: "Skills", query: "skills" },
              { label: "Contact", query: "contact" },
            ]
          : [];
      } else if (intent === INTENTS.INTERVIEW) {
        reply = getInterviewResponse();
        actions = showActions
          ? [
              { label: "Resume", query: "resume" },
              { label: "Skills", query: "skills" },
              { label: "Experience", query: "interview questions" },
            ]
          : [];
      } else if (intent === INTENTS.SKILLS) {
        reply = getSkillsResponse();
        actions = showActions
          ? [
              { label: "Projects", query: "projects" },
              { label: "Resume", query: "resume" },
            ]
          : [];
      } else if (intent === INTENTS.RESUME) {
        reply = `You can view my resume here:\n${profile.resumePath}`;
        actions = showActions
          ? [
              { label: "View Resume", url: profile.resumePath },
              { label: "Projects", query: "projects" },
            ]
          : [{ label: "View Resume", url: profile.resumePath }];
      } else if (intent === INTENTS.PROJECT) {
        if (!nextFlow.clientAskedFollowUp) {
          reply = `${getProjectResponse()}\n\nCould you share your requirement in one line (website, AI system, or mobile app)?`;
          nextFlow.clientAskedFollowUp = true;
          actions = showActions
            ? [
                { label: "WhatsApp", url: profile.whatsappLink },
                { label: "Call", query: "contact" },
              ]
            : [];
        } else if (!nextFlow.whatsappShown) {
          reply = `Let's continue on WhatsApp for faster communication.\nPhone: ${CONTACT_PHONE}`;
          nextFlow.whatsappShown = true;
          actions = [
            { label: "WhatsApp Now", url: profile.whatsappLink },
            { label: "Phone", query: "contact" },
          ];
        } else {
          reply = `${getProjectResponse()}\n\nFor project discussion:\nPhone: ${CONTACT_PHONE}`;
          actions = [
            { label: "WhatsApp", url: profile.whatsappLink },
            { label: "Email", url: `mailto:${profile.email}` },
          ];
        }
      } else if (intent === INTENTS.CONTACT) {
        if (!nextFlow.contactShown) {
          reply = `You can contact ${profile.name} here:\n\n📞 ${CONTACT_PHONE}\n📧 ${profile.email}\nWhatsApp is available on this number.`;
          nextFlow.contactShown = true;
        } else {
          reply = `Contact details:\n📞 ${CONTACT_PHONE}\n📧 ${profile.email}`;
        }
        actions = [
          { label: "Email", url: `mailto:${profile.email}` },
          { label: "WhatsApp", url: profile.whatsappLink },
        ];
      } else if (intent === INTENTS.PERSONAL) {
        const age = getAgeFromDob(profile.dob);
        reply = `${profile.name} is ${age} years old, born on ${profile.dob}, currently based in ${profile.location}. He is ${profile.status.toLowerCase()} and ${profile.jobStatus.toLowerCase()}.`;
      } else if (flowState.lastIntent === INTENTS.DEFAULT) {
        reply =
          "I’m mainly here to help with Shakeel’s portfolio, projects, and professional information 😊";
      } else {
        reply = "Hi 👋 I'm Shakeel Bot. How can I help you today?";
        actions = showActions
          ? [
              { label: "About", query: "who is shakeel" },
              { label: "Projects", query: "projects" },
              { label: "Contact", query: "contact" },
            ]
          : [];
      }

      nextFlow.lastIntent = intent;
      setFlowState(nextFlow);
      setIsTyping(false);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === reply) {
          return prev;
        }
        return [...prev, { role: "assistant", content: reply, actions }];
      });
    }, 450);
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
