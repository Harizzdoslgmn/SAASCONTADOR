import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LandingEnhancements } from "./landing-enhancements";

const copyReplacements: ReadonlyArray<readonly [string, string]> = [
  ["Operação contábil, com outra clareza", "Automação fiscal para escritórios contábeis"],
  [
    "Seu escritório cuida de dezenas de empresas. <em>Agora tenha um assistente que acompanha todas elas.</em>",
    "Menos portais. <em>Mais controle da operação fiscal.</em>",
  ],
  [
    "Centralize clientes, documentos, pendências e rotinas em uma operação mais clara, organizada e previsível.",
    "O NEXO captura documentos fiscais, organiza XMLs, acompanha pendências e centraliza rotinas fiscais em um só lugar.",
  ],
  ["Conhecer a plataforma", "Conhecer os módulos"],
  ["Prontas para fechamento", "Declarações monitoradas"],
  ["↗ 4 esta semana", "mudanças recentes"],
  ["Pronta para fechamento", "Declaração em revisão"],
  ["Fechamento fiscal", "Monitoramento fiscal"],
  ["Quem ainda não enviou os documentos?", "O que mudou na operação fiscal?"],
  ["<strong>14 empresas</strong> possuem pendências neste mês.", "<strong>Alertas fiscais</strong> organizados por contexto."],
  ["<small>Entrada</small><strong>XML recebido</strong><span>NFe_0826.xml</span>", "<small>Captura</small><strong>NF-e recebida</strong><span>Documento fiscal</span>"],
  ["#produto", "#recursos"],
  ['href="#implantacao"', 'href="#demonstracao"'],
  [">Implantação<", ">Demonstração<"],
  [
    "Seu escritório já cresceu. <em>Sua operação também precisa crescer.</em>",
    "Pronto para simplificar <em>sua operação fiscal?</em>",
  ],
  [
    "Conheça o NEXO e veja sua carteira com mais clareza, contexto e controle.",
    "Veja como o NEXO pode centralizar documentos, pendências, emissão e monitoramento fiscal no seu escritório.",
  ],
  ["Software operacional para escritórios contábeis.", "Automação fiscal para escritórios contábeis."],
];

const productOverviewMarkup = `
  <section class="nexo-overview-section section-pad" id="recursos">
    <div class="shell">
      <div class="nexo-overview-heading" data-reveal>
        <div>
          <p class="eyebrow"><span></span> O NEXO EM POUCOS SEGUNDOS</p>
          <h2>Uma plataforma.<br><strong>Quatro áreas do fiscal.</strong></h2>
        </div>
        <p>O NEXO é uma plataforma para contadores centralizarem documentos, pendências, emissões e declarações dos clientes sem depender de vários portais e controles paralelos.</p>
      </div>

      <div class="nexo-module-grid" data-reveal>
        <article class="nexo-module-card module-docs">
          <div class="module-card-top"><span>01</span><small>DOCUMENTOS FISCAIS</small></div>
          <h3>Notas e XMLs entram organizados.</h3>
          <p>Capture, consulte e reúna os documentos fiscais de cada cliente.</p>
          <ul>
            <li>Captura de NF-e, NFC-e e NFS-e</li>
            <li>Cofre, consulta e recuperação de XML</li>
            <li>Comparação de SPED</li>
            <li>Dashboards, relatórios e APIs</li>
          </ul>
          <div class="module-visual docs-visual" aria-hidden="true">
            <span><i>XML</i><b>NF-e recebida</b><small>Almeida Comércio</small></span>
            <span><i>XML</i><b>NFC-e organizada</b><small>Agosto / 2026</small></span>
            <span><i>PDF</i><b>NFS-e localizada</b><small>Consulta concluída</small></span>
          </div>
        </article>

        <article class="nexo-module-card">
          <div class="module-card-top"><span>02</span><small>CONTROLE DE PENDÊNCIAS</small></div>
          <h3>O que exige atenção aparece antes.</h3>
          <p>Diagnóstico fiscal, parcelamentos e cálculos reunidos por cliente.</p>
          <ul>
            <li>Diagnóstico e pendências fiscais</li>
            <li>Acompanhamento de parcelamentos</li>
            <li>Fator R e calculadora de anexos</li>
            <li>Alertas de mudança de status</li>
          </ul>
        </article>

        <article class="nexo-module-card">
          <div class="module-card-top"><span>03</span><small>EMISSÃO FISCAL</small></div>
          <h3>Emita dentro do mesmo contexto.</h3>
          <p>Dados fiscais e cadastrais disponíveis no momento de emitir.</p>
          <ul>
            <li>Emissão de NF-e</li>
            <li>Emissão de NFS-e</li>
            <li>Histórico organizado por cliente</li>
            <li>Operação centralizada do escritório</li>
          </ul>
        </article>

        <article class="nexo-module-card">
          <div class="module-card-top"><span>04</span><small>DECLARAÇÕES E IRPF</small></div>
          <h3>Acompanhe a carteira sem abrir cliente por cliente.</h3>
          <p>Status, pendências e indicadores visíveis em uma única operação.</p>
          <ul>
            <li>Monitoramento de declarações</li>
            <li>Notificações automáticas de status</li>
            <li>Indicadores de evolução e carteira</li>
            <li>Dashboards e análise de informações</li>
          </ul>
        </article>
      </div>

      <div class="nexo-how-strip" id="como-funciona" data-reveal>
        <div class="how-strip-heading"><small>COMO FUNCIONA</small><strong>Da entrada do dado à próxima ação.</strong></div>
        <ol>
          <li><span>01</span><div><strong>Captura</strong><p>Documentos e informações entram no NEXO.</p></div></li>
          <li><span>02</span><div><strong>Organização</strong><p>O sistema relaciona empresa, competência e contexto.</p></div></li>
          <li><span>03</span><div><strong>Acompanhamento</strong><p>A equipe visualiza o que precisa conferir ou resolver.</p></div></li>
        </ol>
      </div>
    </div>
  </section>
`;

const fiscalPlatformMarkup = `
  <section class="fiscal-platform-section fiscal-platform-compact" id="demonstracao">
    <div class="fiscal-orbit fiscal-orbit-one" aria-hidden="true"></div>
    <div class="shell fiscal-platform-shell">
      <div class="fiscal-platform-heading" data-reveal>
        <div class="section-kicker"><span></span> VISÃO CENTRALIZADA</div>
        <h2>O contador entra para analisar. O NEXO organiza o fluxo.</h2>
        <p>Uma visão única para documentos fiscais, conferências, pendências, cálculos e emissões da carteira.</p>
      </div>

      <div class="fiscal-console" data-reveal>
        <aside class="fiscal-console-nav">
          <div class="fiscal-console-brand"><i>N</i><div><strong>NEXO Fiscal</strong><small>Central de operações</small></div></div>
          <nav aria-label="Módulos fiscais demonstrados">
            <span class="active"><i>01</i> Documentos fiscais</span>
            <span><i>02</i> Pendências</span>
            <span><i>03</i> Emissão fiscal</span>
            <span><i>04</i> Declarações e IRPF</span>
          </nav>
          <div class="fiscal-api-status"><i></i><span><strong>APIs e integrações</strong><small>Conexões conforme escopo</small></span></div>
        </aside>

        <div class="fiscal-console-main">
          <header>
            <div><small>VISÃO FISCAL DA CARTEIRA</small><strong>Operação em um só lugar</strong></div>
            <span class="fiscal-sync"><i></i> Ambiente atualizado</span>
          </header>

          <div class="capture-strip">
            <article><span class="capture-icon nfe">NF</span><div><small>NF-e</small><strong>Captura e organização</strong></div><em>XML</em></article>
            <article><span class="capture-icon nfce">CF</span><div><small>NFC-e</small><strong>Documentos centralizados</strong></div><em>XML</em></article>
            <article><span class="capture-icon nfse">NS</span><div><small>NFS-e</small><strong>Consulta e recuperação</strong></div><em>PDF</em></article>
          </div>

          <div class="fiscal-console-grid">
            <article class="fiscal-panel sped-panel">
              <div class="fiscal-panel-title"><div><small>CONFERÊNCIA</small><strong>SPED e diagnóstico fiscal</strong></div><span>Revisar</span></div>
              <div class="sped-compare"><div><small>Documentos fiscais</small><b></b><b></b><b></b></div><i>↔</i><div><small>Arquivo SPED</small><b></b><b></b><b></b></div></div>
              <p><i>✓</i> Informações cruzadas e pontos de atenção reunidos.</p>
            </article>

            <article class="fiscal-panel monitor-panel">
              <div class="fiscal-panel-title"><div><small>ACOMPANHAMENTO</small><strong>Monitor fiscal</strong></div><span>Hoje</span></div>
              <ul>
                <li><i class="blue"></i><span><strong>Declarações</strong><small>Status e mudanças</small></span><em>Acompanhar</em></li>
                <li><i class="amber"></i><span><strong>Parcelamentos</strong><small>Visão por cliente</small></span><em>Revisar</em></li>
                <li><i class="red"></i><span><strong>Pendências</strong><small>Prazo e contexto</small></span><em>Priorizar</em></li>
              </ul>
            </article>

            <article class="fiscal-panel tax-panel">
              <div class="fiscal-panel-title"><div><small>SIMPLES NACIONAL</small><strong>Fator R e anexos tributários</strong></div><span>Calcular</span></div>
              <div class="tax-ratio"><span>Fator R</span><div><b></b></div><strong>Contexto para análise</strong></div>
              <p>Dados reunidos para simular e apoiar a conferência.</p>
            </article>

            <article class="fiscal-panel issue-panel">
              <div class="fiscal-panel-title"><div><small>EMISSÃO</small><strong>NF-e e NFS-e</strong></div><span>Nova nota</span></div>
              <div class="issue-flow"><span>Dados</span><i>→</i><span>Conferir</span><i>→</i><span class="done">Emitir</span></div>
              <p>Emissão conectada ao contexto fiscal do cliente.</p>
            </article>
          </div>
          <small class="fiscal-demo-note">Representação demonstrativa dos módulos do NEXO.</small>
        </div>
      </div>
    </div>
  </section>
`;

const faqMarkup = `
  <section class="faq-section faq-section-compact shell section-pad" id="faq">
    <div class="faq-heading" data-reveal>
      <p class="eyebrow"><span></span> PERGUNTAS DIRETAS</p>
      <h2>O essencial antes da demonstração.</h2>
    </div>
    <div class="faq-grid" data-reveal>
      <details><summary><span>01</span>O que é o NEXO?<i></i></summary><p>Uma plataforma de automação fiscal para escritórios contábeis. Ela centraliza documentos, XMLs, pendências, emissões, declarações e indicadores dos clientes.</p></details>
      <details><summary><span>02</span>O NEXO substitui meu software contábil?<i></i></summary><p>Não. O NEXO funciona como uma camada operacional para captura, organização, conferência e monitoramento fiscal ao lado dos sistemas já usados pelo escritório.</p></details>
      <details><summary><span>03</span>Quais documentos fiscais o NEXO organiza?<i></i></summary><p>O escopo inclui NF-e, NFC-e, NFS-e e seus XMLs, com recursos de captura, consulta, armazenamento e recuperação.</p></details>
      <details><summary><span>04</span>Como funcionam as integrações?<i></i></summary><p>As integrações por API dependem da disponibilidade técnica, das autorizações necessárias e do escopo contratado para cada escritório.</p></details>
    </div>
  </section>
`;

function extractBetween(markup: string, start: string, end: string) {
  const startIndex = markup.indexOf(start);
  const endIndex = markup.indexOf(end, startIndex);

  if (startIndex < 0 || endIndex < 0) {
    throw new Error(`Não foi possível montar a seção iniciada por: ${start}`);
  }

  return markup.slice(startIndex, endIndex);
}

function enhanceApprovedSection(markup: string) {
  let enhanced = markup;

  for (const [currentCopy, nextCopy] of copyReplacements) {
    enhanced = enhanced.replaceAll(currentCopy, nextCopy);
  }

  return enhanced;
}

function readLandingMarkup() {
  const exportedPage = readFileSync(join(process.cwd(), "index.html"), "utf8");
  const main = exportedPage.match(/<main>[\s\S]*?<\/main>/i);

  if (!main) {
    throw new Error("A composição principal da landing não foi encontrada.");
  }

  const source = main[0];
  const header = extractBetween(source, '<header class="site-header">', '<section class="hero"');
  const hero = extractBetween(source, '<section class="hero"', '<section class="problem-section"');
  const final = extractBetween(source, '<section class="final-section"', "</main>");
  const assurances = '<div class="nexo-assurances"><span>Implantação assistida</span><span>Contratação anual</span><span>Suporte especializado</span></div>';
  const finalWithAssurances = final.replace('<a class="button button-cream"', `${assurances}<a class="button button-cream"`);

  return enhanceApprovedSection(`<main>${header}${hero}${productOverviewMarkup}${fiscalPlatformMarkup}${faqMarkup}${finalWithAssurances}</main>`);
}

export default function Home() {
  return (
    <>
      <LandingEnhancements />
      <div dangerouslySetInnerHTML={{ __html: readLandingMarkup() }} />
    </>
  );
}
