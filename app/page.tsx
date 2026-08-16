const companies = [
  { name: "Almeida Comércio", meta: "142 documentos", status: "Regular", tone: "ok" },
  { name: "Atlas Serviços", meta: "3 pendências", status: "Atenção", tone: "warn" },
  { name: "Clínica Prime", meta: "1 obrigação hoje", status: "Revisar", tone: "review" },
];

const obligations = [
  ["DCTFWeb", "118/128", "10 pendentes"],
  ["PGDAS-D", "121/128", "7 pendentes"],
  ["EFD-Reinf", "124/128", "4 pendentes"],
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a href="#top" className="brand" aria-label="NEXO início">
          <span className="brand-mark"><i /><i /><i /></span>
          <strong>NEXO</strong>
        </a>
        <nav>
          <a href="#plataforma">Plataforma</a>
          <a href="#fiscal">Central Fiscal</a>
          <a href="#assistente">Assistente</a>
          <a href="#implantacao">Implantação</a>
        </nav>
        <a href="mailto:comercial@nexo.com.br" className="nav-cta">Solicitar demonstração →</a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <span className="eyebrow">OPERAÇÃO FISCAL, COM OUTRA CLAREZA</span>
          <h1>Automatize a operação fiscal do seu escritório em um só lugar.</h1>
          <p>
            Capture documentos, acompanhe obrigações, identifique pendências e saiba exatamente
            o que precisa ser feito em cada empresa.
          </p>
          <div className="hero-actions">
            <a href="mailto:comercial@nexo.com.br" className="button primary">Solicitar demonstração</a>
            <a href="#plataforma" className="button ghost">Conhecer a plataforma</a>
          </div>
          <div className="hero-pills">
            <span>NF-e · NFC-e · NFS-e</span>
            <span>Obrigações</span>
            <span>Pendências fiscais</span>
            <span>Assistente NEXO</span>
          </div>
        </div>

        <div className="app-frame" aria-label="Demonstração da plataforma NEXO">
          <aside className="sidebar">
            <div className="side-logo">N</div>
            <span className="active">⌂</span><span>◇</span><span>□</span><span>◎</span><span>⌁</span>
          </aside>
          <div className="workspace">
            <div className="topbar">
              <div><small>VISÃO GERAL</small><strong>Bom dia, Juliana.</strong></div>
              <div className="avatar">JM</div>
            </div>
            <div className="metrics">
              <div><small>Empresas monitoradas</small><strong>128</strong><span>+6 este mês</span></div>
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
                {obligations.map(([name, value, detail]) => (
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
      </section>

      <section className="proof-strip">
        <div className="shell proof-grid">
          <div><strong>128</strong><span>empresas em uma única visão</span></div>
          <div><strong>5 tipos</strong><span>de documentos fiscais centralizados</span></div>
          <div><strong>1 rotina</strong><span>para fiscal, documentos e obrigações</span></div>
          <div><strong>24/7</strong><span>monitoramento de sinais importantes</span></div>
        </div>
      </section>

      <section className="section shell" id="plataforma">
        <div className="section-heading">
          <span className="eyebrow">UMA OPERAÇÃO, NÃO MAIS DEZ FERRAMENTAS</span>
          <h2>O escritório inteiro conectado ao contexto de cada empresa.</h2>
          <p>Do documento recebido até a obrigação transmitida, o NEXO organiza o fluxo e deixa claro onde sua equipe precisa agir.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card large">
            <span className="feature-number">01</span><h3>Central Fiscal</h3>
            <p>Acompanhe documentos, situação fiscal, declarações, pendências e responsáveis por empresa.</p>
            <div className="mini-monitor">
              <div><span className="dot green"/><strong>Almeida Comércio</strong><b>Regular</b></div>
              <div><span className="dot amber"/><strong>Atlas Serviços</strong><b>3 pendências</b></div>
              <div><span className="dot blue"/><strong>Clínica Prime</strong><b>Revisar</b></div>
            </div>
          </article>
          <article className="feature-card">
            <span className="feature-number">02</span><h3>Captura de documentos</h3>
            <p>Centralize NF-e, NFC-e, NFS-e, CT-e, XMLs e arquivos recebidos pela operação.</p>
            <div className="file-stack"><span>XML</span><span>NF-e</span><span>NFS-e</span></div>
          </article>
          <article className="feature-card">
            <span className="feature-number">03</span><h3>Cofre Fiscal</h3>
            <p>Encontre documentos por empresa, CNPJ, competência, tipo, chave ou status.</p>
            <div className="search-demo">⌕ Buscar empresa, XML ou chave da nota</div>
          </article>
        </div>
      </section>

      <section className="dark-section" id="fiscal">
        <div className="shell fiscal-layout">
          <div className="section-heading light">
            <span className="eyebrow">MONITOR FISCAL</span>
            <h2>Descubra o problema antes que ele vire urgência.</h2>
            <p>O NEXO reúne sinais da carteira e transforma alterações, pendências e vencimentos em uma fila clara de ação.</p>
            <ul className="check-list">
              <li>Novas pendências por empresa</li>
              <li>Certidões e obrigações próximas do vencimento</li>
              <li>Empresas sem documentos do período</li>
              <li>Priorização por risco e prazo</li>
            </ul>
          </div>
          <div className="monitor-card">
            <div className="monitor-head"><div><small>NEXO MONITOR</small><strong>128 empresas monitoradas</strong></div><span className="live">● AO VIVO</span></div>
            <div className="alert critical"><span>!</span><div><strong>3 novas pendências</strong><small>Detectadas desde a última verificação</small></div><b>Ver →</b></div>
            <div className="alert warning"><span>↗</span><div><strong>7 certidões próximas do vencimento</strong><small>Próximos 15 dias</small></div><b>Revisar →</b></div>
            <div className="alert normal"><span>✓</span><div><strong>118 empresas sem alterações críticas</strong><small>Carteira regular neste momento</small></div><b>Detalhes →</b></div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading centered">
          <span className="eyebrow">OBRIGAÇÕES</span>
          <h2>Fechamento mensal sem depender de memória.</h2>
          <p>Veja o andamento de cada obrigação e descubra exatamente o que ainda está pendente.</p>
        </div>
        <div className="obligation-board">
          <div className="board-head"><strong>Obrigações · Agosto</strong><span>Competência 08/2026</span></div>
          {obligations.map(([name, value, detail], index) => (
            <div className="board-row" key={name}>
              <div><span className={`board-icon i${index}`}>{index + 1}</span><strong>{name}</strong></div>
              <div className="progress"><i style={{ width: `${[92, 95, 97][index]}%` }}/></div>
              <small>{detail}</small><b>{value}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="assistant-section" id="assistente">
        <div className="shell assistant-layout">
          <div className="assistant-copy">
            <span className="eyebrow">ASSISTENTE NEXO</span>
            <h2>Pergunte sobre sua operação como se estivesse falando com alguém da equipe.</h2>
            <p>O assistente usa o contexto da carteira para encontrar empresas, documentos, obrigações e pendências.</p>
          </div>
          <div className="chat-card">
            <div className="chat-top"><span className="assistant-icon">✦</span><div><strong>Assistente NEXO</strong><small>Contexto da sua carteira</small></div></div>
            <div className="question">Quais empresas ainda não enviaram os documentos de agosto?</div>
            <div className="answer"><p>Encontrei <strong>14 empresas</strong> com documentação incompleta.</p><div className="answer-actions"><button>Ver empresas</button><button>Criar tarefa</button><button>Notificar responsável</button></div></div>
            <div className="prompt-row"><span>Pergunte sobre sua operação...</span><b>↑</b></div>
          </div>
        </div>
      </section>

      <section className="section shell" id="implantacao">
        <div className="cta-card">
          <span className="eyebrow">PRONTO PARA COMEÇAR?</span>
          <h2>Menos procura. Menos atraso. Mais controle sobre cada empresa.</h2>
          <p>Veja como o NEXO pode organizar a operação fiscal do seu escritório.</p>
          <a href="mailto:comercial@nexo.com.br" className="button light-button">Solicitar demonstração →</a>
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
