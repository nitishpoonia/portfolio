// How the health claims assistant routes a member query. Pure SVG, black & white.
// Two layouts: wide (desktop) and tall (phones); CSS shows one.

const Box = ({ x, y, w, h, title, sub, solid }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={h / 2}
      fill={solid ? "#F2F2F2" : "rgba(255,255,255,0.06)"} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
    <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 5)} textAnchor="middle"
      fontSize="14" fontWeight="600" fill={solid ? "#0A0A0A" : "#F2F2F2"}>{title}</text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="11" fill={solid ? "#3C3C41" : "#9A9AA0"}>{sub}</text>
    )}
  </g>
);

const Arrow = ({ d }) => (
  <path d={d} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" markerEnd="url(#cf-arrow)" className="cf-flow" />
);

const Defs = () => (
  <defs>
    <marker id="cf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgba(255,255,255,0.6)" />
    </marker>
  </defs>
);

export default function ClaimsFlow() {
  return (
    <figure className="claims-flow" aria-label="Flow: a member query is checked against records and rules, then answered, sent for review, or escalated">
      <svg className="cf-wide" viewBox="0 0 760 200" role="img" aria-hidden="true">
        <Defs />
        <Box x={0} y={76} w={150} h={48} title="Member query" sub="“Was my claim paid?”" />
        <Arrow d="M150 100 H196" />
        <Box x={200} y={76} w={170} h={48} title="Records + rules" sub="FHIR data · exact checks in code" />
        <Arrow d="M370 100 H416" />
        <Box x={420} y={76} w={120} h={48} title="LLM" sub="understands · drafts" solid />
        <Arrow d="M540 100 C 580 100, 580 30, 616 30" />
        <Arrow d="M540 100 H616" />
        <Arrow d="M540 100 C 580 100, 580 170, 616 170" />
        <Box x={620} y={8} w={140} h={44} title="Answer" sub="routine, grounded" />
        <Box x={620} y={78} w={140} h={44} title="Human review" sub="unsure or missing data" />
        <Box x={620} y={148} w={140} h={44} title="Escalate" sub="urgent or high value" />
      </svg>
      <svg className="cf-tall" viewBox="0 0 320 440" role="img" aria-hidden="true">
        <Defs />
        <Box x={60} y={0} w={200} h={50} title="Member query" sub="“Was my claim paid?”" />
        <Arrow d="M160 50 V86" />
        <Box x={40} y={90} w={240} h={50} title="Records + rules" sub="FHIR data · exact checks in code" />
        <Arrow d="M160 140 V176" />
        <Box x={90} y={180} w={140} h={50} title="LLM" sub="understands · drafts" solid />
        <Arrow d="M160 230 V266" />
        <Box x={40} y={270} w={240} h={46} title="Answer" sub="routine, grounded" />
        <Box x={40} y={326} w={240} h={46} title="Human review" sub="unsure or missing data" />
        <Box x={40} y={382} w={240} h={46} title="Escalate" sub="urgent or high value" />
      </svg>
    </figure>
  );
}
