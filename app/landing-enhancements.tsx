"use client";

import { useEffect } from "react";

const story = [
  ["Captura", "NF-e recebida", "Documento fiscal"],
  ["Organização", "XML centralizado", "Empresa e competência"],
  ["Conferência", "SPED em análise", "Informações cruzadas"],
  ["Monitoramento", "Declaração atualizada", "Status acompanhado"],
  ["Controle", "Operação fiscal em foco", "Carteira acompanhada"],
];

const assistantModes = [
  {
    label: "Declarações",
    question: "Quais clientes têm declarações que precisam de acompanhamento?",
    answer: "Há declarações com mudança de status na carteira.",
    rows: [
      ["Almeida Comércio", "Declaração em revisão", "Hoje"],
      ["Studio Prime", "Status atualizado", "Acompanhar"],
      ["Clínica Essence", "Envio pendente", "Esta semana"],
    ],
  },
  {
    label: "Parcelamentos",
    question: "Quais parcelamentos precisam de atenção?",
    answer: "Há parcelamentos que exigem revisão da equipe.",
    rows: [
      ["Clínica Prime", "Parcela próxima", "Revisar"],
      ["NovaTech", "Situação regular", "Acompanhar"],
      ["Atlas Serviços", "Atualização necessária", "Pendente"],
    ],
  },
  {
    label: "Atenção fiscal",
    question: "O que mudou na situação fiscal da carteira hoje?",
    answer: "Estes pontos merecem contexto antes da próxima ação.",
    rows: [
      ["Atlas Serviços", "Obrigação próxima", "Priorizar"],
      ["Almeida Comércio", "Documento não localizado", "Hoje"],
      ["Studio Prime", "SPED aguardando conferência", "Revisar"],
    ],
  },
];

const setupSteps = [
  ["Entendemos sua operação.", "Mapeamos carteira, equipe, prazos e a forma como o escritório trabalha hoje."],
  ["Configuramos sua carteira.", "Estruturamos empresas, competências e responsáveis dentro do ambiente."],
  ["Organizamos usuários e responsáveis.", "Cada pessoa entra com o contexto e a visibilidade adequados à sua função."],
  ["Definimos os fluxos.", "O ciclo mensal passa a refletir as etapas reais da sua operação."],
  ["Preparamos o ambiente.", "Ajustamos regras, alertas e pontos de controle antes da estreia da equipe."],
  ["Orientamos sua equipe.", "Conduzimos o primeiro uso para que o novo processo comece com clareza."],
  ["Liberamos o acesso.", "O escritório entra em um ambiente já organizado, pronto para acompanhar a carteira."],
];

const documentData = [
  { type: "XML", tone: "xml", name: "NFe_0826_Almeida.xml", company: "Almeida Comércio", status: "Conferido", competence: "Julho / 2026", kind: "NF-e" },
  { type: "PDF", tone: "pdf", name: "Extrato_Julho.pdf", company: "Almeida Comércio", status: "Aguardando", competence: "Julho / 2026", kind: "Extrato" },
  { type: "NF", tone: "nfe", name: "Relatorio_NFe.xlsx", company: "Clínica Prime", status: "Recebido", competence: "Agosto / 2026", kind: "Relatório fiscal" },
  { type: "DOC", tone: "report", name: "Folha_Julho.pdf", company: "Atlas Serviços", status: "Recebido", competence: "Julho / 2026", kind: "Folha" },
];

export function LandingEnhancements() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const listen = (target: EventTarget | null, type: string, listener: EventListener) => {
      if (!target) return;
      target.addEventListener(type, listener);
      cleanups.push(() => target.removeEventListener(type, listener));
    };
    const header = document.querySelector<HTMLElement>(".site-header");
    const menu = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const mobileLinks = document.querySelectorAll<HTMLAnchorElement>(".mobile-nav-panel a");
    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
    const closeMenu = () => {
      header?.classList.remove("menu-open");
      menu?.setAttribute("aria-expanded", "false");
      menu?.setAttribute("aria-label", "Abrir menu");
    };
    const toggleMenu = () => {
      const isOpen = !header?.classList.contains("menu-open");
      header?.classList.toggle("menu-open", isOpen);
      menu?.setAttribute("aria-expanded", String(isOpen));
      menu?.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    menu?.addEventListener("click", toggleMenu);
    mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6%" },
    );
    revealNodes.forEach((node) => observer.observe(node));

    const year = String(new Date().getFullYear());
    const copyright = document.querySelector<HTMLElement>(".site-footer > small");
    if (copyright) copyright.textContent = `© ${year} NEXO. Todos os direitos reservados.`;

    let currentStory = 0;
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    const storyCard = document.querySelector<HTMLElement>(".hero-story-card");
    const storyProgress = document.querySelectorAll<HTMLElement>(".hero-story-progress span");
    const renderStory = (storyIndex: number) => {
      stage?.classList.forEach((name) => {
        if (name.startsWith("story-step-")) stage.classList.remove(name);
      });
      stage?.classList.add(`story-step-${storyIndex}`);

      if (storyCard) {
        const [label, title, detail] = story[storyIndex];
        const index = storyCard.querySelector<HTMLElement>(".story-index");
        const copy = storyCard.querySelector<HTMLElement>(".story-index + div");
        const arrow = storyCard.querySelector<HTMLElement>(":scope > i");
        if (index) index.textContent = `0${storyIndex + 1}`;
        if (copy) {
          const small = copy.querySelector("small");
          const strong = copy.querySelector("strong");
          const span = copy.querySelector("span");
          if (small) small.textContent = label;
          if (strong) strong.textContent = title;
          if (span) span.textContent = detail;
        }
        if (arrow) {
          arrow.textContent = storyIndex === story.length - 1 ? "✓" : "→";
          arrow.classList.toggle("complete", storyIndex === story.length - 1);
        }
      }

      storyProgress.forEach((step, index) => {
        const marker = step.querySelector("i");
        if (marker) step.replaceChildren(marker, document.createTextNode(story[index][0]));
        step.classList.toggle("active", index <= storyIndex);
      });
    };
    renderStory(currentStory);
    const storyTimer = window.setInterval(() => {
      currentStory = (currentStory + 1) % story.length;
      renderStory(currentStory);
    }, 2400);

    const portfolioFilters = [...document.querySelectorAll<HTMLButtonElement>(".filter-tabs button")];
    const companyRows = [...document.querySelectorAll<HTMLElement>(".company-rows .company-row")];
    const portfolioSearch = document.querySelector<HTMLInputElement>(".workspace-controls input");
    const rowCategories = ["Pendências", "Fechamento", "Atenção", "Documentos"];
    let activePortfolioFilter = "Todos";
    const renderPortfolio = () => {
      const query = portfolioSearch?.value.trim().toLocaleLowerCase("pt-BR") ?? "";
      companyRows.forEach((row, index) => {
        const matchesFilter = activePortfolioFilter === "Todos" || rowCategories[index] === activePortfolioFilter;
        const matchesQuery = !query || (row.textContent ?? "").toLocaleLowerCase("pt-BR").includes(query);
        row.hidden = !(matchesFilter && matchesQuery);
      });
    };
    portfolioFilters.forEach((button) => {
      listen(button, "click", () => {
        activePortfolioFilter = (button.textContent ?? "").replace(/\d+/g, "").trim();
        portfolioFilters.forEach((item) => item.classList.toggle("active", item === button));
        renderPortfolio();
      });
    });
    listen(portfolioSearch, "input", renderPortfolio);

    const suggestionButtons = [...document.querySelectorAll<HTMLButtonElement>(".suggestion-tabs button")];
    const assistantQuestion = document.querySelector<HTMLElement>(".user-query p");
    const assistantAnswer = document.querySelector<HTMLElement>(".response-content h3");
    const resultRows = [...document.querySelectorAll<HTMLElement>(".result-row")];
    const renderAssistant = (modeIndex: number) => {
      const mode = assistantModes[modeIndex];
      if (assistantQuestion) assistantQuestion.textContent = mode.question;
      if (assistantAnswer) assistantAnswer.textContent = mode.answer;
      suggestionButtons.forEach((button, index) => {
        button.textContent = assistantModes[index].label;
        button.classList.toggle("active", index === modeIndex);
      });
      resultRows.forEach((row, index) => {
        const [name, detail, status] = mode.rows[index];
        const cells = row.querySelectorAll<HTMLElement>(":scope > span");
        const initial = document.createElement("i");
        initial.textContent = name.charAt(0);
        cells[0]?.replaceChildren(initial, document.createTextNode(name));
        if (cells[1]) cells[1].textContent = detail;
        const arrow = document.createElement("b");
        arrow.textContent = "→";
        cells[2]?.replaceChildren(document.createTextNode(`${status} `), arrow);
      });
    };
    suggestionButtons.forEach((button, index) => listen(button, "click", () => renderAssistant(index)));
    listen(document.querySelector(".new-query"), "click", () => renderAssistant(0));
    renderAssistant(0);

    const setupItems = [...document.querySelectorAll<HTMLElement>(".setup-wizard aside ol li")];
    const setupProgress = document.querySelector<HTMLElement>(".setup-progress");
    const setupCopy = document.querySelector<HTMLElement>(".setup-copy");
    const setupActions = [...document.querySelectorAll<HTMLButtonElement>(".setup-actions button")];
    let activeSetupStep = 0;
    const renderSetup = () => {
      setupItems.forEach((item, index) => {
        item.className = index < activeSetupStep ? "done" : index === activeSetupStep ? "current" : "";
        const button = item.querySelector<HTMLButtonElement>("button");
        const number = button?.querySelector<HTMLElement>(":scope > i");
        if (number) number.textContent = index < activeSetupStep ? "✓" : String(index + 1).padStart(2, "0");
        button?.querySelector(":scope > small")?.remove();
        if (button && index === activeSetupStep) {
          const current = document.createElement("small");
          current.textContent = "Em preparação";
          button.append(current);
        }
      });

      const progress = Math.round(((activeSetupStep + 1) / setupSteps.length) * 100);
      const progressLabel = setupProgress?.querySelector<HTMLElement>(":scope > span");
      const progressBar = setupProgress?.querySelector<HTMLElement>("b");
      const progressValue = setupProgress?.querySelector<HTMLElement>("em");
      if (progressLabel) progressLabel.textContent = `Etapa ${activeSetupStep + 1} de ${setupSteps.length}`;
      if (progressBar) progressBar.style.width = `${((activeSetupStep + 1) / setupSteps.length) * 100}%`;
      if (progressValue) progressValue.textContent = `${progress}% concluído`;

      const [title, description] = setupSteps[activeSetupStep];
      const setupLabel = setupCopy?.querySelector<HTMLElement>("small");
      const setupTitle = setupCopy?.querySelector<HTMLElement>("h3");
      const setupDescription = setupCopy?.querySelector<HTMLElement>("p");
      if (setupLabel) setupLabel.textContent = `CONFIGURAÇÃO OPERACIONAL · ${String(activeSetupStep + 1).padStart(2, "0")}`;
      if (setupTitle) setupTitle.textContent = title;
      if (setupDescription) setupDescription.textContent = description;
      if (setupActions[0]) setupActions[0].disabled = activeSetupStep === 0;
      if (setupActions[1]) setupActions[1].textContent = activeSetupStep === setupSteps.length - 1 ? "Ambiente preparado ✓" : "Salvar e continuar →";
    };
    setupItems.forEach((item, index) => listen(item.querySelector("button"), "click", () => {
      activeSetupStep = index;
      renderSetup();
    }));
    listen(setupActions[0], "click", () => {
      activeSetupStep = Math.max(0, activeSetupStep - 1);
      renderSetup();
    });
    listen(setupActions[1], "click", () => {
      activeSetupStep = Math.min(setupSteps.length - 1, activeSetupStep + 1);
      renderSetup();
    });
    listen(document.querySelector(".setup-form .switch"), "click", (event) => {
      const target = event.currentTarget as HTMLButtonElement;
      target.classList.toggle("active");
      target.setAttribute("aria-label", target.classList.contains("active") ? "Alertas de prazo ativados" : "Alertas de prazo desativados");
    });

    const documentFilters = [...document.querySelectorAll<HTMLButtonElement>(".docs-filters button")];
    const documentCards = [...document.querySelectorAll<HTMLButtonElement>(".docs-list button")];
    const filterIndexes: Record<string, number[]> = { Todos: [0, 1, 2, 3], XML: [0], "NF-e": [2], Extratos: [1], PDF: [1, 3] };
    documentFilters.forEach((button) => listen(button, "click", () => {
      const filter = (button.textContent ?? "").replace(/\d+/g, "").trim();
      const visibleIndexes = filterIndexes[filter] ?? filterIndexes.Todos;
      documentFilters.forEach((item) => item.classList.toggle("active", item === button));
      documentCards.forEach((card, index) => { card.hidden = !visibleIndexes.includes(index); });
    }));
    documentCards.forEach((card, index) => listen(card, "click", () => {
      documentCards.forEach((item) => item.classList.toggle("selected", item === card));
      const data = documentData[index];
      const previewType = document.querySelector<HTMLElement>(".preview-top .doc-type");
      const previewName = document.querySelector<HTMLElement>(".preview-top strong");
      const previewKind = document.querySelector<HTMLElement>(".preview-top small");
      const paperCompany = document.querySelector<HTMLElement>(".paper-title strong");
      const paperStatus = document.querySelector<HTMLElement>(".paper-title > span");
      const paperValues = document.querySelectorAll<HTMLElement>(".paper-grid strong");
      const metaValues = document.querySelectorAll<HTMLElement>(".preview-meta > div > span");
      if (previewType) { previewType.className = `doc-type ${data.tone}`; previewType.textContent = data.type; }
      if (previewName) previewName.textContent = data.name;
      if (previewKind) previewKind.textContent = `${data.kind} · ${data.type}`;
      if (paperCompany) paperCompany.textContent = data.company;
      if (paperStatus) paperStatus.textContent = data.status;
      if (paperValues[0]) paperValues[0].textContent = data.competence;
      if (paperValues[1]) paperValues[1].textContent = data.kind;
      if (metaValues[0]) metaValues[0].lastChild!.textContent = data.company;
      if (metaValues[1]) metaValues[1].lastChild!.textContent = data.competence;
      if (metaValues[3]) metaValues[3].lastChild!.textContent = `● ${data.status}`;
    }));

    return () => {
      window.removeEventListener("scroll", updateHeader);
      menu?.removeEventListener("click", toggleMenu);
      mobileLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      observer.disconnect();
      window.clearInterval(storyTimer);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
