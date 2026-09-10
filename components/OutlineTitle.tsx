export default function OutlineTitle({ text, dark = false }: { text: string; dark?: boolean }) {
  const chars = Array.from(text);
  const head = chars.slice(0, -1).join("");
  const last = chars.slice(-1).join("");
  return (
    <>
      {head}
      <span className={dark ? "out-cream" : "out"}>{last}</span>
    </>
  );
}
