import type {CSSProperties, ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  ink: "#040a07",
  panel: "#07140d",
  panelSoft: "#0b1d13",
  green: "#38e77d",
  greenSoft: "#86f3ad",
  cream: "#f3eee3",
  muted: "#89a093",
  line: "rgba(93, 239, 139, 0.24)",
  amber: "#e9b84f",
};

const fontSans = "Arial, Helvetica, sans-serif";
const fontSerif = "Georgia, 'Times New Roman', serif";

const enter = (frame: number, fps: number, delay = 0, duration = 28) =>
  spring({
    frame: frame - delay,
    fps,
    durationInFrames: duration,
    config: {damping: 18, stiffness: 120, mass: 0.8},
  });

const fadeRange = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

const Brand = ({compact = false}: {compact?: boolean}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: compact ? 16 : 22,
      color: palette.green,
      fontFamily: fontSans,
      fontWeight: 900,
      fontSize: compact ? 42 : 58,
      letterSpacing: compact ? -3 : -5,
    }}
  >
    <span
      style={{
        width: compact ? 15 : 20,
        height: compact ? 15 : 20,
        background: palette.green,
        transform: "rotate(45deg)",
        boxShadow: `0 0 24px ${palette.green}`,
      }}
    />
    NEXO
  </div>
);

const Background = () => {
  const frame = useCurrentFrame();
  const glowX = interpolate(frame, [0, 450], [-120, 870]);

  return (
    <AbsoluteFill style={{backgroundColor: palette.ink, overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 34%, rgba(25,105,57,.28), transparent 38%), linear-gradient(180deg, #030806 0%, #07140d 55%, #030806 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          backgroundImage:
            "linear-gradient(rgba(70,180,108,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(70,180,108,.10) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent, black 22%, black 82%, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: glowX,
          top: 210,
          width: 330,
          height: 330,
          borderRadius: "50%",
          background: "rgba(44,231,116,.08)",
          filter: "blur(75px)",
        }}
      />
    </AbsoluteFill>
  );
};

const Scene = ({children, style}: {children: ReactNode; style?: CSSProperties}) => (
  <AbsoluteFill
    style={{
      padding: "112px 86px 96px",
      fontFamily: fontSans,
      color: palette.cream,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

const Kicker = ({children}: {children: ReactNode}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      color: palette.green,
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: 4,
    }}
  >
    <span style={{width: 38, height: 3, background: palette.green}} />
    {children}
  </div>
);

type DocType = "NF-e" | "NFC-e" | "NFS-e";

const FileIcon = ({type, size = 88}: {type: DocType; size?: number}) => (
  <div
    style={{
      width: size,
      height: size * 1.16,
      border: `3px solid ${palette.green}`,
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: palette.greenSoft,
      fontSize: size * 0.25,
      fontWeight: 900,
      boxShadow: "inset 0 0 20px rgba(56,231,125,.08)",
      position: "relative",
    }}
  >
    <span
      style={{
        position: "absolute",
        right: -3,
        top: -3,
        width: size * 0.28,
        height: size * 0.28,
        background: palette.panel,
        borderLeft: `3px solid ${palette.green}`,
        borderBottom: `3px solid ${palette.green}`,
      }}
    />
    {type}
  </div>
);

const FloatingDocument = ({
  frame,
  delay,
  type,
  left,
  top,
  rotate,
}: {
  frame: number;
  delay: number;
  type: DocType;
  left: number;
  top: number;
  rotate: number;
}) => {
  const {fps} = useVideoConfig();
  const progress = enter(frame, fps, delay, 30);
  const drift = Math.sin((frame + delay) / 18) * 9;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 90 + drift}px) rotate(${rotate}deg) scale(${0.82 + progress * 0.18})`,
        width: 250,
        padding: "28px 24px",
        borderRadius: 26,
        border: `1px solid ${palette.line}`,
        background: "linear-gradient(145deg, rgba(16,45,28,.94), rgba(4,13,8,.96))",
        boxShadow: "0 28px 70px rgba(0,0,0,.45), inset 0 1px rgba(255,255,255,.05)",
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 20}}>
        <FileIcon type={type} size={64} />
        <div>
          <strong style={{display: "block", fontSize: 30}}>{type}</strong>
          <span style={{fontSize: 20, color: palette.muted}}>Documento fiscal</span>
        </div>
      </div>
      <div style={{height: 8, borderRadius: 8, background: "rgba(255,255,255,.08)", marginTop: 22}}>
        <div style={{height: "100%", width: "68%", borderRadius: 8, background: palette.green}} />
      </div>
    </div>
  );
};

const HookScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logo = enter(frame, fps, 0, 24);
  const title = enter(frame, fps, 10, 34);
  const out = interpolate(frame, [86, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene style={{opacity: out}}>
      <div style={{opacity: logo, transform: `translateY(${(1 - logo) * -30}px)`}}>
        <Brand compact />
      </div>
      <div style={{marginTop: 128, opacity: title, transform: `translateY(${(1 - title) * 54}px)`}}>
        <Kicker>ROTINA FISCAL</Kicker>
        <h1
          style={{
            margin: "32px 0 0",
            fontSize: 112,
            lineHeight: 0.96,
            letterSpacing: -7,
            maxWidth: 900,
          }}
        >
          Documentos fiscais
          <br />
          <em style={{fontFamily: fontSerif, fontWeight: 400, color: palette.greenSoft}}>chegando</em>
          <br />
          de todo lado?
        </h1>
      </div>
      <FloatingDocument frame={frame} delay={22} type="NF-e" left={72} top={1045} rotate={-6} />
      <FloatingDocument frame={frame} delay={34} type="NFC-e" left={414} top={1185} rotate={3} />
      <FloatingDocument frame={frame} delay={46} type="NFS-e" left={744} top={1010} rotate={7} />
      <div
        style={{
          position: "absolute",
          left: 86,
          bottom: 86,
          color: palette.muted,
          fontSize: 22,
          letterSpacing: 1,
        }}
      >
        NF-e • NFC-e • NFS-e
      </div>
    </Scene>
  );
};

const CaptureDocument = ({
  frame,
  delay,
  type,
  originX,
  destinationX,
}: {
  frame: number;
  delay: number;
  type: DocType;
  originX: number;
  destinationX: number;
}) => {
  const progress = interpolate(frame, [delay, delay + 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const y = interpolate(progress, [0, 0.55, 1], [560, 880, 1165]);
  const x = interpolate(progress, [0, 1], [originX, destinationX]);
  const scale = interpolate(progress, [0, 0.7, 1], [1, 0.82, 0.68]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
        opacity: fadeRange(frame, delay - 6, delay + 7),
        filter: `drop-shadow(0 0 ${10 + progress * 26}px rgba(56,231,125,.38))`,
      }}
    >
      <FileIcon type={type} size={104} />
    </div>
  );
};

const CaptureScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0, 28);
  const hub = enter(frame, fps, 18, 34);
  const out = interpolate(frame, [132, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 0.88 + Math.sin(frame / 5) * 0.06;

  return (
    <Scene style={{opacity: out}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Brand compact />
        <span style={{fontSize: 22, color: palette.muted}}>CAPTURA DE DOCUMENTOS</span>
      </div>
      <div style={{marginTop: 92, opacity: title, transform: `translateY(${(1 - title) * 36}px)`}}>
        <Kicker>ENTRADA CENTRALIZADA</Kicker>
        <h2 style={{fontSize: 84, lineHeight: 1.02, letterSpacing: -5, margin: "26px 0 0"}}>
          O NEXO captura.
          <br />
          <span style={{color: palette.greenSoft}}>Sua equipe acompanha.</span>
        </h2>
      </div>

      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        style={{position: "absolute", left: 0, top: 560, opacity: 0.72}}
      >
        <path d="M170 0 C170 420 330 420 390 780" fill="none" stroke={palette.green} strokeWidth="3" opacity=".38" />
        <path d="M540 0 C540 420 540 520 540 780" fill="none" stroke={palette.green} strokeWidth="3" opacity=".38" />
        <path d="M910 0 C910 420 750 420 690 780" fill="none" stroke={palette.green} strokeWidth="3" opacity=".38" />
      </svg>

      <CaptureDocument frame={frame} delay={15} type="NF-e" originX={115} destinationX={326} />
      <CaptureDocument frame={frame} delay={38} type="NFC-e" originX={486} destinationX={486} />
      <CaptureDocument frame={frame} delay={61} type="NFS-e" originX={855} destinationX={646} />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 115,
          height: 470,
          borderRadius: 40,
          border: `1px solid ${palette.line}`,
          background: "linear-gradient(160deg, rgba(12,36,22,.98), rgba(4,14,8,.98))",
          boxShadow: "0 34px 100px rgba(0,0,0,.48), inset 0 1px rgba(255,255,255,.06)",
          opacity: hub,
          transform: `translateY(${(1 - hub) * 60}px)`,
          padding: "38px 42px",
        }}
      >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <small style={{fontSize: 20, color: palette.green, letterSpacing: 3}}>NEXO FISCAL</small>
            <strong style={{display: "block", fontSize: 38, marginTop: 8}}>Documentos recebidos</strong>
          </div>
          <div
            style={{
              width: 72,
              height: 72,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background: "rgba(56,231,125,.12)",
              border: `2px solid ${palette.green}`,
              transform: `scale(${pulse})`,
              color: palette.green,
              fontSize: 34,
            }}
          >
            ✓
          </div>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 44}}>
          {["NF-e", "NFC-e", "NFS-e"].map((label, index) => {
            const checked = frame >= 62 + index * 23;
            return (
              <div
                key={label}
                style={{
                  borderRadius: 22,
                  padding: "28px 18px",
                  background: checked ? "rgba(56,231,125,.10)" : "rgba(255,255,255,.035)",
                  border: `1px solid ${checked ? "rgba(56,231,125,.42)" : "rgba(255,255,255,.08)"}`,
                  textAlign: "center",
                }}
              >
                <strong style={{fontSize: 30}}>{label}</strong>
                <span style={{display: "block", marginTop: 12, color: checked ? palette.green : palette.muted, fontSize: 20}}>
                  {checked ? "Capturado ✓" : "Aguardando"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

const TableRow = ({
  frame,
  delay,
  company,
  document,
}: {
  frame: number;
  delay: number;
  company: string;
  document: DocType;
}) => {
  const {fps} = useVideoConfig();
  const progress = enter(frame, fps, delay, 24);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.15fr .8fr .75fr",
        alignItems: "center",
        minHeight: 148,
        padding: "0 32px",
        borderTop: "1px solid rgba(255,255,255,.07)",
        opacity: progress,
        transform: `translateX(${(1 - progress) * 55}px)`,
      }}
    >
      <div>
        <strong style={{fontSize: 30}}>{company}</strong>
        <span style={{display: "block", marginTop: 8, fontSize: 20, color: palette.muted}}>Agosto / 2026</span>
      </div>
      <strong style={{fontSize: 27}}>{document}</strong>
      <span
        style={{
          justifySelf: "end",
          padding: "12px 18px",
          borderRadius: 999,
          background: "rgba(56,231,125,.12)",
          color: palette.green,
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        Organizado ✓
      </span>
    </div>
  );
};

const OrganizeScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const title = enter(frame, fps, 0, 28);
  const panel = enter(frame, fps, 18, 34);
  const out = interpolate(frame, [111, 125], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene style={{opacity: out}}>
      <Brand compact />
      <div style={{marginTop: 90, opacity: title, transform: `translateY(${(1 - title) * 34}px)`}}>
        <Kicker>ORGANIZAÇÃO</Kicker>
        <h2 style={{fontSize: 78, lineHeight: 1.04, letterSpacing: -4, margin: "26px 0 0"}}>
          Cada documento no
          <br />
          <span style={{fontFamily: fontSerif, fontStyle: "italic", fontWeight: 400, color: palette.greenSoft}}>
            contexto certo.
          </span>
        </h2>
        <p style={{fontSize: 31, color: palette.muted, marginTop: 28}}>Empresa, competência e tipo fiscal reunidos.</p>
      </div>

      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 730,
          borderRadius: 38,
          overflow: "hidden",
          border: `1px solid ${palette.line}`,
          background: "linear-gradient(160deg, rgba(13,38,23,.98), rgba(4,14,8,.98))",
          boxShadow: "0 40px 110px rgba(0,0,0,.48)",
          opacity: panel,
          transform: `translateY(${(1 - panel) * 70}px)`,
        }}
      >
        <div style={{padding: "34px 34px 28px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <small style={{fontSize: 18, color: palette.green, letterSpacing: 3}}>VISÃO FISCAL DA CARTEIRA</small>
            <strong style={{display: "block", fontSize: 36, marginTop: 9}}>Documentos organizados</strong>
          </div>
          <span style={{fontSize: 22, color: palette.green}}>Ambiente atualizado</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr .8fr .75fr",
            padding: "21px 32px",
            background: "rgba(255,255,255,.035)",
            color: palette.muted,
            fontSize: 18,
            letterSpacing: 2,
          }}
        >
          <span>EMPRESA</span>
          <span>DOCUMENTO</span>
          <span style={{textAlign: "right"}}>STATUS</span>
        </div>
        <TableRow frame={frame} delay={25} company="Empresa 01" document="NF-e" />
        <TableRow frame={frame} delay={48} company="Empresa 02" document="NFC-e" />
        <TableRow frame={frame} delay={71} company="Empresa 03" document="NFS-e" />
      </div>

      <div style={{position: "absolute", left: 78, right: 78, bottom: 100, display: "flex", gap: 18}}>
        {["Captura", "Organização", "Conferência"].map((step, index) => {
          const active = frame >= 26 + index * 22;
          return (
            <div key={step} style={{flex: 1}}>
              <div style={{height: 5, background: active ? palette.green : "rgba(255,255,255,.08)", borderRadius: 8}} />
              <span style={{display: "block", marginTop: 13, color: active ? palette.cream : palette.muted, fontSize: 20}}>{step}</span>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

const ModuleChip = ({frame, delay, label}: {frame: number; delay: number; label: string}) => {
  const {fps} = useVideoConfig();
  const progress = enter(frame, fps, delay, 26);
  return (
    <div
      style={{
        minHeight: 126,
        borderRadius: 24,
        padding: "26px",
        border: `1px solid ${palette.line}`,
        background: "rgba(9,30,17,.76)",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 36}px)`,
        display: "flex",
        alignItems: "center",
        gap: 18,
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "rgba(56,231,125,.13)",
          color: palette.green,
          fontWeight: 900,
          fontSize: 23,
        }}
      >
        ✓
      </span>
      <strong style={{fontSize: 24}}>{label}</strong>
    </div>
  );
};

const FinalScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const brand = enter(frame, fps, 0, 26);
  const title = enter(frame, fps, 10, 34);
  const cta = enter(frame, fps, 67, 32);
  const halo = 0.85 + Math.sin(frame / 8) * 0.08;

  return (
    <Scene style={{alignItems: "center", textAlign: "center"}}>
      <div style={{opacity: brand, transform: `scale(${0.86 + brand * 0.14})`}}>
        <Brand />
      </div>
      <div style={{marginTop: 142, opacity: title, transform: `translateY(${(1 - title) * 48}px)`}}>
        <Kicker>DA CAPTURA À PRÓXIMA AÇÃO</Kicker>
        <h2 style={{fontSize: 94, lineHeight: 0.98, letterSpacing: -6, margin: "38px 0 0"}}>
          Documentos fiscais
          <br />
          <span style={{fontFamily: fontSerif, fontStyle: "italic", fontWeight: 400, color: palette.greenSoft}}>
            organizados.
          </span>
        </h2>
        <p style={{fontSize: 38, margin: "36px 0 0", color: palette.muted}}>Operação fiscal em foco.</p>
      </div>

      <div style={{width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 112}}>
        <ModuleChip frame={frame} delay={28} label="Documentos fiscais" />
        <ModuleChip frame={frame} delay={36} label="Pendências" />
        <ModuleChip frame={frame} delay={44} label="Emissão fiscal" />
        <ModuleChip frame={frame} delay={52} label="Declarações" />
      </div>

      <div
        style={{
          marginTop: 118,
          opacity: cta,
          transform: `translateY(${(1 - cta) * 30}px) scale(${halo})`,
          padding: "26px 42px",
          borderRadius: 999,
          background: palette.green,
          color: palette.ink,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: 1,
          boxShadow: "0 0 50px rgba(56,231,125,.28)",
        }}
      >
        CONHEÇA O NEXO
      </div>
      <span style={{position: "absolute", bottom: 78, fontSize: 18, color: palette.muted}}>
        Representação demonstrativa dos módulos do NEXO.
      </span>
    </Scene>
  );
};

export const NexoDocumentosVideo = () => {
  return (
    <AbsoluteFill style={{background: palette.ink}}>
      <Background />
      <Sequence from={0} durationInFrames={105} premountFor={30}>
        <HookScene />
      </Sequence>
      <Sequence from={90} durationInFrames={150} premountFor={30}>
        <CaptureScene />
      </Sequence>
      <Sequence from={225} durationInFrames={125} premountFor={30}>
        <OrganizeScene />
      </Sequence>
      <Sequence from={330} durationInFrames={120} premountFor={30}>
        <FinalScene />
      </Sequence>
    </AbsoluteFill>
  );
};
