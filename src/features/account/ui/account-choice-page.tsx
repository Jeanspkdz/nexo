import Link from "next/link";
import { AuthShell } from "./auth-shell";

export function AccountChoicePage() {
  return (
    <AuthShell action="login">
      <section className="choice-section">
        <div className="choice-heading">
          <span>Crear una cuenta</span>
          <h1>¿Cómo usarás Nexo?</h1>
          <p>
            Elige el recorrido que corresponde a lo que quieres hacer. No podrás cambiar el rol
            desde el panel.
          </p>
        </div>
        <div className="account-choices">
          <Link href="/registro/cliente">
            <span className="choice-mark">C</span>
            <div>
              <h2>Organizar mis eventos</h2>
              <p>Explora empresas, solicita cotizaciones y administra contratos separados.</p>
            </div>
            <strong>Crear cuenta de cliente →</strong>
          </Link>
          <Link href="/registro/empresa">
            <span className="choice-mark company">E</span>
            <div>
              <h2>Ofrecer servicios</h2>
              <p>Publica servicios, responde solicitudes y prepara cotizaciones detalladas.</p>
            </div>
            <strong>Crear cuenta de empresa →</strong>
          </Link>
        </div>
      </section>
    </AuthShell>
  );
}
