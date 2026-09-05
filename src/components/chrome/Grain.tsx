export default function Grain({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`grain pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
