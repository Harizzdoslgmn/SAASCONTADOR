import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LandingEnhancements } from "./landing-enhancements";

const copyReplacements: ReadonlyArray<readonly [string, string]> = [
  ["Operação contábil, com outra clareza", "Tecnologia fiscal para escritórios contábeis"],
  [
    "Seu escritório cuida de dezenas de empresas. <em>Agora tenha um assistente que acompanha todas elas.</em>",
    "Centralize e automatize a operação fiscal <em>dos seus clientes.</em>",
  ],
  [
    "Centralize clientes, documentos, pendências e rotinas em uma operação mais clara, organizada e previsível.",
    "Capture documentos fiscais, centralize XMLs, monitore declarações e pendências e acompanhe toda a carteira em um só lugar.",
  ],
  ["Conhecer a plataforma", "Ver o NEXO em ação"],
  ["Prontas para fechamento", "Declarações acompanhadas"],
  ["↗ 4 esta semana", "mudanças recentes"],
  ["Pronta para fechamento", "Declaração em revisão"],
  ["Fechamento fiscal", "Monitoramento fiscal"],
  ["Quem ainda não enviou os documentos?", "O que mudou na operação fiscal?"],
  ["<strong>14 empresas</strong> possuem pendências neste mês.", "<strong>Alertas fiscais</strong> organizados por contexto."],
  ["<small>Entrada</small><strong>XML recebido</strong><span>NFe_0826.xml</span>", "<small>Captura</small><strong>NF-e recebida</strong><span>Documento fiscal</span>"],
  ["O ruído invisível", "A rotina que ninguém deveria repetir"],
  ["Quanto tempo sua equipe perde procurando informação?", "Quantos portais sua equipe precisa abrir para fechar um mês?"],
  [
    "Quando a carteira cresce, o problema não é falta de informação. É descobrir onde ela está.",
    "Entre portais, planilhas, pastas e e-mails, a operação fiscal se fragmenta — e a equipe perde tempo reconstruindo contexto.",
  ],
  [
    "Quando a carteira cresce, o problema não é falta de informação. <strong>É descobrir onde ela está.</strong>",
    "Entre portais, planilhas, pastas e e-mails, a operação fiscal se fragmenta. <strong>A equipe perde tempo reconstruindo contexto.</strong>",
  ],
  ["O extrato já foi enviado?", "A nota fiscal já foi capturada?"],
  ["Vou procurar aqui.", "Vou entrar no portal."],
  [
    "O problema não é falta de informação. É ela estar espalhada.",
    "O problema não é só informação espalhada. É a rotina fiscal depender de busca, conferência e controle manual.",
  ],
  [
    "O problema não é falta de informação. <strong>É ela estar espalhada.</strong>",
    "O problema não é só informação espalhada. <strong>É a rotina fiscal depender de busca, conferência e controle manual.</strong>",
  ],
  [
    "O problema não é falta de informação. <span>É ela estar espalhada.</span>",
    "O problema não é só informação espalhada. <span>É a rotina fiscal depender de busca, conferência e controle manual.</span>",
  ],
  ["Seu escritório inteiro, em foco.", "A situação fiscal de cada cliente, em foco."],
  [
    "Seu escritório inteiro, <strong>em foco.</strong>",
    "A situação fiscal de cada cliente, <strong>em foco.</strong>",
  ],
  [
    "Seu escritório inteiro,<br><strong>em foco.</strong>",
    "A situação fiscal de cada cliente,<br><strong>em foco.</strong>",
  ],
  [
    "Seu escritório inteiro,<br/><strong>em foco.</strong>",
    "A situação fiscal de cada cliente,<br/><strong>em foco.</strong>",
  ],
  [
    "Consulte a operação em linguagem natural e receba uma leitura estruturada da carteira — com contexto, responsáveis e próximos passos.",
    "Consulte documentos, declarações, parcelamentos e pendências em linguagem natural — com empresa, prazo e contexto operacional.",
  ],
  [
    "Quais clientes ainda não enviaram os documentos deste mês?",
    "Quais clientes têm declarações que precisam de acompanhamento?",
  ],
  ["14 empresas ainda possuem pendências.", "Há declarações com mudança de status na carteira."],
  ["Do primeiro documento ao fechamento.", "Da captura do documento à conferência fiscal."],
  [
    "Do primeiro documento <strong>ao fechamento.</strong>",
    "Da captura do documento <strong>à conferência fiscal.</strong>",
  ],
  [
    "Do primeiro documento<br><strong>ao fechamento.</strong>",
    "Da captura do documento<br><strong>à conferência fiscal.</strong>",
  ],
  [
    "Do primeiro documento<br/><strong>ao fechamento.</strong>",
    "Da captura do documento<br/><strong>à conferência fiscal.</strong>",
  ],
  [
    "Veja exatamente em que etapa está cada cliente da sua carteira. O trabalho avança, a visão acompanha.",
    "Acompanhe captura, organização, conferência, apuração, revisão e conclusão em um fluxo que reflete a rotina do escritório.",
  ],
  ["Documentos no contexto", "Captura e Cofre Fiscal"],
  ["O arquivo certo. Na empresa certa.", "Documentos fiscais entram organizados — e continuam fáceis de encontrar."],
  [
    "O arquivo certo. <strong>Na empresa certa.</strong>",
    "Documentos fiscais organizados. <strong>Fáceis de encontrar.</strong>",
  ],
  [
    "O arquivo certo.<br><span>Na empresa certa.</span>",
    "Documentos fiscais organizados.<br><span>Fáceis de encontrar.</span>",
  ],
  [
    "O arquivo certo.<br/><span>Na empresa certa.</span>",
    "Documentos fiscais organizados.<br/><span>Fáceis de encontrar.</span>",
  ],
  [
    "Recebimento, competência, conferência e histórico em uma experiência que deixa de parecer uma pasta infinita.",
    "Capture NF-e, NFC-e e NFS-e, centralize XMLs e consulte cada arquivo por empresa, competência, tipo e status.",
  ],
  ["Sinais antes da urgência", "Monitoramento fiscal"],
  ["O que pede atenção chega até você.", "Mudanças, declarações e pendências chegam até você."],
  [
    "A plataforma organiza alertas por criticidade, prazo e contexto. Sem transformar cada pendência em uma emergência.",
    "A plataforma organiza alertas por criticidade, prazo, empresa e contexto para reduzir controle manual e reação de última hora.",
  ],
  [
    "Seu escritório já cresceu. <em>Sua operação também precisa crescer.</em>",
    "Menos portais. <em>Mais contexto para cuidar de toda a carteira.</em>",
  ],
  [
    "Conheça o NEXO e veja sua carteira com mais clareza, contexto e controle.",
    "Conheça o NEXO e veja como centralizar documentos, conferências, declarações e pendências em uma operação fiscal mais simples.",
  ],
  ["Software operacional para escritórios contábeis.", "Plataforma de operação fiscal para escritórios contábeis."],
  [
    "<span><i>✓</i>Carteira</span><span><i>✓</i>Documentos</span><span><i>✓</i>Pendências</span><span><i>✓</i>Rotinas</span><span><i>✓</i>Responsáveis</span><span><i>✓</i>Assistente NEXO</span>",
    "<span><i>✓</i>Captura fiscal</span><span><i>✓</i>Cofre de XML</span><span><i>✓</i>Emissão NF-e e NFS-e</span><span><i>✓</i>Conferência SPED</span><span><i>✓</i>Monitoramento fiscal</span><span><i>✓</i>Assistente NEXO</span>",
  ],
  [
    "Não. A plataforma organiza a operação, a carteira, os documentos, as pendências e as rotinas. Ela trabalha ao lado dos sistemas contábeis usados pelo escritório.",
    "Não. O NEXO adiciona uma camada operacional para captura, organização, conferência e monitoramento fiscal. Ele trabalha ao lado dos sistemas contábeis usados pelo escritório.",
  ],
];

const fiscalPlatformMarkup = `
  <section class="fiscal-platform-section section-pad" id="operacao-fiscal">
    <div class="fiscal-orbit fiscal-orbit-one" aria-hidden="true"></div>
    <div class="fiscal-orbit fiscal-orbit-two" aria-hidden="true"></div>
    <div class="shell fiscal-platform-shell">
      <div class="fiscal-platform-heading" data-reveal>
        <div class="section-kicker"><span></span> OPERAÇÃO FISCAL CENTRALIZADA</div>
        <h2>Da captura ao diagnóstico, menos portais no caminho.</h2>
        <p>O NEXO reúne documentos, conferências, cálculos e monitoramentos em uma camada operacional pensada para a rotina de escritórios contábeis.</p>
      </div>

      <div class="fiscal-console" data-reveal>
        <aside class="fiscal-console-nav">
          <div class="fiscal-console-brand"><i>N</i><div><strong>NEXO Fiscal</strong><small>Central de operações</small></div></div>
          <nav aria-label="Módulos fiscais demonstrados">
            <span class="active"><i>01</i> Captura fiscal</span>
            <span><i>02</i> Cofre e XML</span>
            <span><i>03</i> Emissão</span>
            <span><i>04</i> Conferência</span>
            <span><i>05</i> Monitoramento</span>
            <span><i>06</i> Inteligência tributária</span>
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
              <div class="sped-compare">
                <div><small>Documentos fiscais</small><b></b><b></b><b></b></div>
                <i>↔</i>
                <div><small>Arquivo SPED</small><b></b><b></b><b></b></div>
              </div>
              <p><i>✓</i> Compare informações e concentre os pontos que exigem conferência.</p>
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
              <p>Centralize os dados usados na avaliação e compare os anexos relacionados.</p>
            </article>

            <article class="fiscal-panel issue-panel">
              <div class="fiscal-panel-title"><div><small>EMISSÃO</small><strong>NF-e e NFS-e</strong></div><span>Nova nota</span></div>
              <div class="issue-flow"><span>Dados do cliente</span><i>→</i><span>Conferência</span><i>→</i><span class="done">Emitir</span></div>
              <p>Emissão integrada ao contexto fiscal e cadastral da empresa.</p>
            </article>
          </div>
          <small class="fiscal-demo-note">Representação demonstrativa da interface e dos módulos do NEXO.</small>
        </div>
      </div>

      <div class="fiscal-capability-grid" data-reveal>
        <article><span>01</span><h3>Captura e Cofre Fiscal</h3><p>NF-e, NFC-e, NFS-e, XMLs, consulta, armazenamento e recuperação em um fluxo organizado.</p><small>DOCUMENTOS FISCAIS</small></article>
        <article><span>02</span><h3>Conferência e diagnóstico</h3><p>Comparação de SPED, indicadores e pontos de atenção reunidos para apoiar a revisão da equipe.</p><small>CONTROLE FISCAL</small></article>
        <article><span>03</span><h3>Monitoramento contínuo</h3><p>Declarações, parcelamentos, pendências e mudanças de status acompanhados por cliente.</p><small>CARTEIRA EM FOCO</small></article>
        <article><span>04</span><h3>Automação e integrações</h3><p>APIs e automações para reduzir tarefas repetitivas, trabalho manual e retrabalho operacional.</p><small>MAIS PRODUTIVIDADE</small></article>
      </div>

      <div class="fiscal-platform-cta" data-reveal>
        <div><small>UMA CAMADA OPERACIONAL PARA O FISCAL</small><strong>O sistema contábil continua. O trabalho espalhado, não precisa continuar.</strong></div>
        <a href="#plano">Conhecer o NEXO <span>→</span></a>
      </div>
    </div>
  </section>
`;

function enhanceLandingMarkup(markup: string) {
  let enhanced = markup;

  for (const [currentCopy, nextCopy] of copyReplacements) {
    enhanced = enhanced.replace(currentCopy, nextCopy);
  }

  const insertionPoint = '<section class="alerts-section shell section-pad">';

  if (!enhanced.includes(insertionPoint)) {
    throw new Error("O ponto de inserção da demonstração fiscal não foi encontrado.");
  }

  return enhanced.replace(insertionPoint, `${fiscalPlatformMarkup}${insertionPoint}`);
}

function readLandingMarkup() {
  const exportedPage = readFileSync(join(process.cwd(), "index.html"), "utf8");
  const main = exportedPage.match(/<main>[\s\S]*?<\/main>/i);

  if (!main) {
    throw new Error("A composição principal da landing não foi encontrada.");
  }

  return enhanceLandingMarkup(main[0]);
}

export default function Home() {
  return (
    <>
      <LandingEnhancements />
      <div dangerouslySetInnerHTML={{ __html: readLandingMarkup() }} />
    </>
  );
}
