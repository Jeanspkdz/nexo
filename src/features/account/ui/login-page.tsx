"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  authenticate,
  demoAccounts,
  destinationFor,
  saveSession,
  type LocalAccount,
} from "@/features/account/infrastructure/browser-account-store";
import { AuthShell } from "./auth-shell";

export function LoginPage() {
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
    <AuthShell action="register">
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
    </AuthShell>
  );
}
