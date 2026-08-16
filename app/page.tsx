"use client";

import { FormEvent, useEffect } from "react";

const companies = [
  { name: "Almeida Comércio", meta: "142 documentos", status: "Regular", tone: "ok" },
  { name: "Atlas Serviços", meta: "3 pendências", status: "Atenção", tone: "warn" },
  { name: "Clínica Prime", meta: "1 obrigação hoje", status: "Revisar", tone: "review" },
];

const obligations = [
  ["DCTFWeb", "118/128", "10 pendentes"],
  ["PGDAS-D", "121/128", "7 pendentes"],
  ["EFD-Reinf", "124/128", "4 pendentes"],
  ["DEFIS", "109/128", "19 pendentes"],
];

const states = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const capabilities = [
  "NF-e e NFC-e", "NFS-e", "CT-e", "XML e PDF", "Obrigações", "Pendências",
  "Certidões", "Diagnóstico fiscal", "Parcelamentos", "Fator R", "Relatórios", "Assistente NEXO"
];

export default function Home() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Solicitação de demonstração NEXO");
    const body = encodeURIComponent(
      [
        `Nome: ${data.get("firstName") ?? ""} ${data.get("lastName") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Telefone: ${data.get("phone") ?? ""}`,
        `Escritório: ${data.get("office") ?? ""}`,
        `Tipo de empresa: ${data.get("companyType") ?? ""}`,
        `Estado: ${data.get("state") ?? ""}`,
        `Já utiliza plataforma fiscal: ${data.get("usesPlatform") ?? ""}`,
        `Quantidade de clientes: ${data.get("clients") ?? ""}`,
      ].join("\n")
    );
    window.location.href = `mailto:comercial@nexo.com.br?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      <div className="page-grid" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="nav shell">
        <a href="#top" className="brand" aria-label="NEXO início">
          <span className="brand-mark"><i /><i /><i /></span>
          <strong>NEXO</strong>
        </a>
        <nav>
          <a href="#plataforma">Plataforma</a>
          <a href="#fiscal">Central Fiscal</a>
          <a href="#assistente">Assistente</a>
          <a href="#demonstracao">Demonstração</a>
        </nav>
        <a href="#demonstracao" className="nav-cta">Solicitar demonstração <span>→</span></a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow-row">
            <span className="signal-dot" />
            <span className="eyebrow">OPERAÇÃO FISCAL, COM OUTRA CLAREZA</span>
          </div>
          <h1>Automatize a operação fiscal do seu escritório em um só lugar.</h1>
          <p>
            Capture documentos, acompanhe obrigações, identifique pendências e saiba exatamente
            o que precisa ser feito em cada empresa — antes que o prazo vire urgência.
          </p>
          <div className="hero-actions">
            <a href="#demonstracao" className="button primary">Solicitar demonstração <span>→</span></a>
            <a href="#plataforma" className="button ghost">Conhecer a plataforma</a>
          </div>
          <div className="hero-pills">
            <span>NF-e · NFC-e · NFS-e</span>
            <span>Obrigações</span>
            <span>Pendências fiscais</span>
            <span>Assistente NEXO</span>
          </div>
          <div className="trust-line">
            <span><b>128</b> empresas monitoradas</span>
            <i />
            <span><b>12,4k</b> documentos organizados</span>
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <div className="hero-halo" aria-hidden="true" />
          <div className="orbit orbit-a" aria-hidden="true" />
          <div className="orbit orbit-b" aria-hidden="true" />

          <div className="floating-alert float-a">
            <span className="float-icon success">✓</span>
            <div><small>Documento recebido</small><strong>NFe_0826.xml</strong></div>
          </div>
          <div className="floating-alert float-b">
            <span className="float-icon warning">!</span>
            <div><small>Monitor fiscal</small><strong>3 novas pendências</strong></div>
          </div>
          <div className="floating-alert float-c">
            <span className="float-icon assistant">✦</span>
            <div><small>Assistente NEXO</small><strong>14 empresas precisam de ação</strong></div>
          </div>

          <div className="app-frame" aria-label="Demonstração da plataforma NEXO">
            <aside className="sidebar">
              <div className="side-logo">N</div>
              <span className="active">⌂</span><span>◇</span><span>□</span><span>◎</span><span>⌁</span>
            </aside>
            <div className="workspace">
              <div className="topbar">
                <div><small>VISÃO GERAL</small><strong>Bom dia, Juliana.</strong></div>
                <div className="topbar-actions"><span>⌕</span><span>◉</span><div className="avatar">JM</div></div>
              </div>
              <div className="metrics">
                <div><small>Empresas monitoradas</small><strong>128</strong><span className="positive">↗ +6 este mês</span></div>
                <div><small>Pendências fiscais</small><strong>23</strong><span>8 prioritárias</span></div>
                <div><small>Obrigações hoje</small><strong>09</strong><span>3 para revisar</span></div>
              </div>
              <div className="dashboard-grid">
                <div className="panel companies">
                  <div className="panel-head"><div><small>CARTEIRA</small><strong>Empresas em atenção</strong></div><span>Ver todas</span></div>
                  {companies.map((company) => (
                    <div className="company-row" key={company.name}>
                      <div className="company-avatar">{company.name[0]}</div>
                      <div className="company-info"><strong>{company.name}</strong><small>{company.meta}</small></div>
                      <span className={`status ${company.tone}`}>{company.status}</span>
                    </div>
                  ))}
                </div>
                <div className="panel obligations">
                  <div className="panel-head"><div><small>AGOSTO</small><strong>Obrigações</strong></div><span>•••</span></div>
                  {obligations.slice(0, 3).map(([name, value, detail]) => (
                    <div className="obligation-row" key={name}>
                      <div><strong>{name}</strong><small>{detail}</small></div>
                      <b>{value}</b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="assistant-card">
                <div className="assistant-icon">✦</div>
                <div><small>ASSISTENTE NEXO</small><strong>“Quais empresas precisam de atenção hoje?”</strong></div>
                <span>23 encontradas →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="capability-marquee" aria-label="Recursos da plataforma">
        <div className="marquee-track">
          {[...capabilities, ...capabilities].map((item, index) => (
            <span key={`${item}-${index}`}><i />{item}</span>
          ))}
        </div>
      </section>

      <section className="proof-strip">
        <div className="shell proof-grid" data-reveal>
          <div><strong>128</strong><span>empresas em uma única visão</span></div>
          <div><strong>5 tipos</strong><span>de documentos fiscais centralizados</span></div>
          <div><strong>1 rotina</strong><span>para fiscal, documentos e obrigações</span></div>
          <div><strong>24/7</strong><span>monitoramento de sinais importantes</span></div>
        </div>
      </section>

      <section className="section shell" id="plataforma">
        <div className="section-heading" data-reveal>
          <div className="eyebrow-row"><span className="signal-dot" /><span className="eyebrow">UMA OPERAÇÃO, NÃO MAIS DEZ FERRAMENTAS</span></div>
          <h2>O escritório inteiro conectado ao contexto de cada empresa.</h2>
          <p>Do documento recebido até a obrigação transmitida, o NEXO organiza o fluxo e deixa claro onde sua equipe precisa agir.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card large" data-reveal>
            <span className="feature-number">01</span><h3>Central Fiscal</h3>
            <p>Acompanhe documentos, situação fiscal, declarações, pendências e responsáveis por empresa.</p>
            <div className="mini-monitor">
              <div><span className="dot green"/><strong>Almeida Comércio</strong><b>Regular</b></div>
              <div><span className="dot amber"/><strong>Atlas Serviços</strong><b>3 pendências</b></div>
              <div><span className="dot blue"/><strong>Clínica Prime</strong><b>Revisar</b></div>
            </div>
            <div className="card-grid-glow" />
          </article>
          <article className="feature-card feature-lift" data-reveal>
            <span className="feature-number">02</span><h3>Captura de documentos</h3>
            <p>Centralize NF-e, NFC-e, NFS-e, CT-e, XMLs e arquivos recebidos pela operação.</p>
            <div className="file-stack"><span>XML</span><span>NF-e</span><span>NFS-e</span></div>
          </article>
          <article className="feature-card feature-lift" data-reveal>
            <span className="feature-number">03</span><h3>Cofre Fiscal</h3>
            <p>Encontre documentos por empresa, CNPJ, competência, tipo, chave ou status.</p>
            <div className="search-demo"><i>⌕</i><span>Buscar empresa, XML ou chave da nota</span><kbd>⌘ K</kbd></div>
          </article>
        </div>
      </section>

      <section className="workflow-section">
        <div className="shell">
          <div className="section-heading centered" data-reveal>
            <div className="eyebrow-row centered-row"><span className="signal-dot" /><span className="eyebrow">DO DOCUMENTO À AÇÃO</span></div>
            <h2>Uma rotina fiscal que se move sozinha.</h2>
            <p>O fluxo deixa de depender de memória, planilha e troca de mensagens soltas.</p>
          </div>
          <div className="workflow-line" data-reveal>
            {[
              ["01", "Entrada", "Documento recebido"],
              ["02", "Leitura", "Dados identificados"],
              ["03", "Contexto", "Empresa relacionada"],
              ["04", "Ação", "Pendência ou tarefa"],
              ["05", "Controle", "Status acompanhado"],
            ].map(([number, title, text], index) => (
              <div className="workflow-step" key={title}>
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{text}</small>
                {index < 4 && <i className="workflow-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section" id="fiscal">
        <div className="dark-noise" aria-hidden="true" />
        <div className="shell fiscal-layout">
          <div className="section-heading light" data-reveal>
            <div className="eyebrow-row"><span className="signal-dot light-dot" /><span className="eyebrow">MONITOR FISCAL</span></div>
            <h2>Descubra o problema antes que ele vire urgência.</h2>
            <p>O NEXO reúne sinais da carteira e transforma alterações, pendências e vencimentos em uma fila clara de ação.</p>
            <ul className="check-list">
              <li>Novas pendências por empresa</li>
              <li>Certidões e obrigações próximas do vencimento</li>
              <li>Empresas sem documentos do período</li>
              <li>Priorização por risco e prazo</li>
            </ul>
          </div>
          <div className="monitor-wrap" data-reveal>
            <div className="monitor-glow" aria-hidden="true" />
            <div className="monitor-card">
              <div className="monitor-head"><div><small>NEXO MONITOR</small><strong>128 empresas monitoradas</strong></div><span className="live"><i /> AO VIVO</span></div>
              <div className="monitor-summary"><div><strong>03</strong><span>críticas</span></div><div><strong>07</strong><span>atenção</span></div><div><strong>118</strong><span>regulares</span></div></div>
              <div className="alert critical"><span>!</span><div><strong>3 novas pendências</strong><small>Detectadas desde a última verificação</small></div><b>Ver →</b></div>
              <div className="alert warning"><span>↗</span><div><strong>7 certidões próximas do vencimento</strong><small>Próximos 15 dias</small></div><b>Revisar →</b></div>
              <div className="alert normal"><span>✓</span><div><strong>118 empresas sem alterações críticas</strong><small>Carteira regular neste momento</small></div><b>Detalhes →</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading centered" data-reveal>
          <div className="eyebrow-row centered-row"><span className="signal-dot" /><span className="eyebrow">OBRIGAÇÕES</span></div>
          <h2>Fechamento mensal sem depender de memória.</h2>
          <p>Veja o andamento de cada obrigação e descubra exatamente o que ainda está pendente.</p>
        </div>
        <div className="obligation-board" data-reveal>
          <div className="board-head"><strong>Obrigações · Agosto</strong><span>Competência 08/2026</span></div>
          {obligations.map(([name, value, detail], index) => (
            <div className="board-row" key={name}>
              <div><span className={`board-icon i${index}`}>{index + 1}</span><strong>{name}</strong></div>
              <div className="progress"><i style={{ width: `${[92, 95, 97, 85][index]}%` }}/></div>
              <small>{detail}</small><b>{value}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="assistant-section" id="assistente">
        <div className="assistant-orb" aria-hidden="true" />
        <div className="shell assistant-layout">
          <div className="assistant-copy" data-reveal>
            <div className="eyebrow-row"><span className="signal-dot" /><span className="eyebrow">ASSISTENTE NEXO</span></div>
            <h2>Pergunte sobre sua operação como se estivesse falando com alguém da equipe.</h2>
            <p>O assistente usa o contexto da carteira para encontrar empresas, documentos, obrigações e pendências.</p>
            <div className="assistant-prompts">
              <span>Quem ainda não enviou documentos?</span>
              <span>Quais obrigações vencem esta semana?</span>
              <span>Quais empresas precisam de atenção?</span>
            </div>
          </div>
          <div className="chat-card" data-reveal>
            <div className="chat-top"><span className="assistant-icon">✦</span><div><strong>Assistente NEXO</strong><small>Contexto da sua carteira</small></div><span className="online-chip">Online</span></div>
            <div className="question">Quais empresas ainda não enviaram os documentos de agosto?</div>
            <div className="answer"><p>Encontrei <strong>14 empresas</strong> com documentação incompleta.</p><div className="answer-preview"><span>Almeida Comércio</span><b>4 documentos</b></div><div className="answer-preview"><span>Atlas Serviços</span><b>3 documentos</b></div><div className="answer-actions"><button>Ver empresas</button><button>Criar tarefa</button><button>Notificar responsável</button></div></div>
            <div className="prompt-row"><span>Pergunte sobre sua operação...</span><b>↑</b></div>
          </div>
        </div>
      </section>

      <section className="section shell form-section" id="demonstracao">
        <div className="form-card" data-reveal>
          <div className="form-watermark" aria-hidden="true">NEXO</div>
          <div className="form-heading">
            <div className="eyebrow-row"><span className="signal-dot" /><span className="eyebrow">FALE COM O NEXO</span></div>
            <h2>O diferencial que leva seus clientes mais longe está aqui.</h2>
            <p>Preencha seus dados e fale com nosso time para conhecer a plataforma aplicada ao seu escritório.</p>
          </div>

          <form className="lead-form" onSubmit={handleLeadSubmit}>
            <div className="form-grid">
              <label>
                <span>Primeiro Nome</span>
                <input name="firstName" type="text" placeholder="Digite o seu primeiro nome" required />
              </label>
              <label>
                <span>Sobrenome</span>
                <input name="lastName" type="text" placeholder="Digite o seu sobrenome" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" placeholder="seuemail@empresa.com.br" required />
              </label>
              <label>
                <span>Telefone</span>
                <input name="phone" type="tel" placeholder="(00) 00000-0000" required />
              </label>
              <label>
                <span>Nome do escritório</span>
                <input name="office" type="text" placeholder="Nome da sua empresa" required />
              </label>
              <label>
                <span>Qual tipo de empresa?</span>
                <select name="companyType" defaultValue="" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Escritório de Contabilidade</option>
                  <option>Contabilidade Interna</option>
                </select>
              </label>
              <label>
                <span>Estado</span>
                <select name="state" defaultValue="" required>
                  <option value="" disabled>Selecione uma opção</option>
                  {states.map((state) => <option key={state}>{state}</option>)}
                </select>
              </label>
              <label>
                <span>Já utiliza alguma plataforma fiscal?</span>
                <select name="usesPlatform" defaultValue="" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Sim, já utilizo</option>
                  <option>Não utilizo</option>
                  <option>Estou avaliando alternativas</option>
                </select>
              </label>
              <label className="full-field">
                <span>Quantos clientes sua empresa atende?</span>
                <select name="clients" defaultValue="" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Menos de 50 clientes</option>
                  <option>De 51 a 100 clientes</option>
                  <option>De 101 a 150 clientes</option>
                  <option>De 151 a 200 clientes</option>
                  <option>De 201 a 300 clientes</option>
                  <option>Mais de 300 clientes</option>
                </select>
              </label>
            </div>
            <div className="form-footer">
              <p>Ao enviar, seu aplicativo de e-mail será aberto com os dados preenchidos.</p>
              <button type="submit" className="submit-button">ENVIAR <span>→</span></button>
            </div>
          </form>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand"><span className="brand-mark"><i/><i/><i/></span><strong>NEXO</strong></div>
        <p>Operação contábil e fiscal, com outra clareza.</p>
        <span>© 2026 NEXO</span>
      </footer>
    </main>
  );
}
