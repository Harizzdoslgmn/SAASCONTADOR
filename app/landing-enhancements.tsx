"use client";

import { useEffect } from "react";

const story = [
  ["Captura", "NF-e recebida", "Documento fiscal"],
  ["Organização", "XML centralizado", "Empresa e competência"],
  ["Conferência", "SPED em análise", "Informações cruzadas"],
  ["Monitoramento", "Declaração atualizada", "Status acompanhado"],
  ["Controle", "Operação fiscal em foco", "Carteira acompanhada"],
];

export function LandingEnhancements() {
  useEffect(() => {
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

    const copyright = document.querySelector<HTMLElement>(".site-footer > small");
    if (copyright) copyright.textContent = `© ${new Date().getFullYear()} NEXO. Todos os direitos reservados.`;

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
          const detailCopy = copy.querySelector("span");
          if (small) small.textContent = label;
          if (strong) strong.textContent = title;
          if (detailCopy) detailCopy.textContent = detail;
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

    return () => {
      window.removeEventListener("scroll", updateHeader);
      menu?.removeEventListener("click", toggleMenu);
      mobileLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      observer.disconnect();
      window.clearInterval(storyTimer);
    };
  }, []);

  return null;
}
