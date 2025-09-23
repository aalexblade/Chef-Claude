export default function Header({ title, subtitle, logoSrc }) {
  return (
    <header>
      <img src={logoSrc} alt="Chef Claude Logo" />
      <div>
        <h1>{title}</h1>
        {subtitle && (
          <h2 style={{ fontWeight: 400, fontSize: "1.1rem", marginTop: 4 }}>
            {subtitle}
          </h2>
        )}
      </div>
    </header>
  );
}
