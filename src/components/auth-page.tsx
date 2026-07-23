"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/site-header";
import {
  authenticate,
  createAccount,
  demoAccounts,
  destinationFor,
  emailExists,
  saveSession,
  type AccountRole,
  type LocalAccount,
} from "@/lib/auth-storage";

export function AuthPage({ view }: { view: "login" | "choice" | AccountRole }) {
  return (
    <div className="auth-shell">
      <SiteHeader
        className="auth-header"
        navigation={<Link href="/">Conoce Nexo</Link>}
        actions={
          view === "login" ? (
            <Link className="secondary auth-header-action" href="/registro">
              Crear cuenta
            </Link>
          ) : (
            <Link className="secondary auth-header-action" href="/login">
              Iniciar sesión
            </Link>
          )
        }
      />
      <main className="auth-main">
        {view === "login" && <LoginForm />}
        {view === "choice" && <AccountChoice />}
        {view === "client" && <ClientRegistration />}
        {view === "company" && <CompanyRegistration />}
      </main>
      <footer className="auth-footer">
        <span>Prototipo local de Nexo</span>
        <span>Las cuentas y sesiones se guardan únicamente en este navegador.</span>
      </footer>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const account = authenticate(String(data.get("email")), String(data.get("password")));
    if (!account) {
      setError(
        "El correo o la contraseña no coinciden. Revisa los datos o usa una cuenta de prueba.",
      );
      return;
    }
    saveSession(account);
    router.push(destinationFor(account));
  }

  function enterDemo(account: LocalAccount) {
    saveSession(account);
    router.push(destinationFor(account));
  }

  return (
    <div className="auth-layout">
      <section className="auth-intro">
        <span>Acceso a Nexo</span>
        <h1>Continúa organizando con claridad.</h1>
        <p>Tu cuenta determina qué información y herramientas puedes ver.</p>
        <ul>
          <li>Clientes: eventos, cotizaciones y contratos.</li>
          <li>Empresas: servicios, solicitudes y pagos simulados.</li>
        </ul>
      </section>
      <section className="auth-panel" aria-labelledby="login-title">
        <div className="auth-panel-heading">
          <h2 id="login-title">Iniciar sesión</h2>
          <p>Usa tus datos locales o entra con una cuenta de prueba.</p>
        </div>
        <form className="auth-form" onSubmit={submit} noValidate>
          <label>
            Correo electrónico
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Contraseña
            <span className="password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </span>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="primary auth-submit" type="submit">
            Iniciar sesión
          </button>
        </form>
        <div className="demo-access">
          <span>Cuentas de prueba</span>
          <button onClick={() => enterDemo(demoAccounts[0])}>
            <strong>Andrea Salazar</strong>
            <small>Cliente</small>
          </button>
          <button onClick={() => enterDemo(demoAccounts[1])}>
            <strong>Jardines de Surco</strong>
            <small>Empresa</small>
          </button>
          <button onClick={() => enterDemo(demoAccounts[2])}>
            <strong>Mesa Viva</strong>
            <small>Empresa</small>
          </button>
        </div>
        <p className="auth-switch">
          ¿Todavía no tienes cuenta? <Link href="/registro">Crear una cuenta</Link>
        </p>
      </section>
    </div>
  );
}

function AccountChoice() {
  return (
    <section className="choice-section">
      <div className="choice-heading">
        <span>Crear una cuenta</span>
        <h1>¿Cómo usarás Nexo?</h1>
        <p>
          Elige el recorrido que corresponde a lo que quieres hacer. No podrás cambiar el rol desde
          el panel.
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
  );
}

function ClientRegistration() {
  return (
    <RegistrationFrame
      role="client"
      title="Crea tu cuenta de cliente"
      description="Empieza con tus datos de acceso. Configurarás el evento cuando solicites una cotización."
    />
  );
}

function CompanyRegistration() {
  return (
    <RegistrationFrame
      role="company"
      title="Crea tu cuenta de empresa"
      description="Crea el acceso del responsable y el perfil inicial de la empresa."
    />
  );
}

function RegistrationFrame({
  role,
  title,
  description,
}: {
  role: AccountRole;
  title: string;
  description: string;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).trim().toLowerCase();
    const password = String(data.get("password"));
    const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword"];
    if (role === "company") {
      requiredFields.push(
        "phone",
        "companyName",
        "category",
        "location",
        "coverage",
        "commercialPhone",
        "description",
      );
    }
    if (requiredFields.some((field) => !String(data.get(field) ?? "").trim())) {
      return setError("Completa todos los campos obligatorios para crear la cuenta.");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Escribe un correo válido. Ejemplo: nombre@empresa.com");
    }
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    if (password !== String(data.get("confirmPassword")))
      return setError("Las contraseñas no coinciden.");
    if (emailExists(email)) return setError("Ya existe una cuenta local con ese correo.");
    if (data.get("terms") !== "on")
      return setError("Debes aceptar los términos y la política de privacidad.");
    const companyName = String(data.get("companyName"));
    const companyId =
      companyName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `empresa-${Date.now()}`;
    const account: LocalAccount = {
      id: `${role}-${Date.now()}`,
      role,
      firstName: String(data.get("firstName")),
      lastName: String(data.get("lastName")),
      email,
      password,
      phone: String(data.get("phone") ?? ""),
      company:
        role === "company"
          ? {
              id: companyId,
              name: companyName,
              category: String(data.get("category")) as "salones" | "catering" | "foto",
              location: String(data.get("location")),
              coverage: String(data.get("coverage")),
              description: String(data.get("description")),
              commercialPhone: String(data.get("commercialPhone")),
            }
          : undefined,
    };
    createAccount(account);
    saveSession(account);
    router.push(destinationFor(account));
  }

  return (
    <section className="registration-section">
      <div className="registration-heading">
        <Link href="/registro">← Cambiar tipo de cuenta</Link>
        <span>{role === "client" ? "Cuenta de cliente" : "Cuenta de empresa"}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <form className="registration-form" onSubmit={submit} noValidate>
        <fieldset>
          <legend>{role === "company" ? "Tu acceso" : "Datos de acceso"}</legend>
          <div className="auth-form-grid">
            <label>
              Nombre
              <input name="firstName" autoComplete="given-name" required />
            </label>
            <label>
              Apellidos
              <input name="lastName" autoComplete="family-name" required />
            </label>
            <label className="full">
              Correo electrónico
              <input name="email" type="email" autoComplete="email" required />
            </label>
            {role === "company" && (
              <label className="full">
                Teléfono del responsable
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
            )}
            <label>
              Contraseña
              <span className="password-field">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </span>
              <small>Mínimo 8 caracteres.</small>
            </label>
            <label>
              Confirmar contraseña
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                minLength={8}
                autoComplete="new-password"
                required
              />
            </label>
          </div>
        </fieldset>
        {role === "company" && (
          <fieldset>
            <legend>Tu empresa</legend>
            <div className="auth-form-grid">
              <label className="full">
                Nombre comercial
                <input name="companyName" required />
              </label>
              <label>
                Categoría principal
                <select name="category" defaultValue="" required>
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  <option value="salones">Locales o salones</option>
                  <option value="catering">Catering</option>
                  <option value="foto">Fotografía y video</option>
                </select>
              </label>
              <label>
                Ciudad o ubicación principal
                <input name="location" defaultValue="Lima" required />
              </label>
              <label>
                Cobertura
                <input name="coverage" placeholder="Ej. Lima Metropolitana" required />
              </label>
              <label>
                Teléfono o WhatsApp comercial
                <input name="commercialPhone" type="tel" required />
              </label>
              <label className="full">
                Descripción breve
                <textarea name="description" maxLength={240} required />
              </label>
            </div>
            <p className="fieldset-note">
              Agregarás servicios, precios y portafolio después desde el panel.
            </p>
          </fieldset>
        )}
        <label className="auth-check terms-check">
          <input name="terms" type="checkbox" />
          Acepto los términos y la política de privacidad del prototipo.
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="registration-actions">
          <Link className="secondary" href="/">
            Volver al inicio
          </Link>
          <button className="primary" type="submit">
            {role === "client" ? "Crear cuenta de cliente" : "Crear cuenta de empresa"}
          </button>
        </div>
      </form>
    </section>
  );
}
