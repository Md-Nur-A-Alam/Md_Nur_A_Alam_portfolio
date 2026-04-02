export default function SectionTag({ number, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <span style={{
        fontFamily: 'Bebas Neue', fontSize: 11,
        color: 'var(--accent)', letterSpacing: '0.4em'
      }}>
        {number} — {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: 80 }} />
    </div>
  );
}
