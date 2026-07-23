"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  createAccount,
  destinationFor,
  emailExists,
  saveSession,
  type AccountRole,
  type LocalAccount,
} from "@/features/account/infrastructure/browser-account-store";
import { AuthShell } from "./auth-shell";

const registrationCopy = {
  client: {
    title: "Crea tu cuenta de cliente",
    description:
      "Empieza con tus datos de acceso. Configurarás el evento cuando solicites una cotización.",
  },
  company: {
    title: "Crea tu cuenta de empresa",
    description: "Crea el acceso del responsable y el perfil inicial de la empresa.",
  },
} satisfies Record<AccountRole, { title: string; description: string }>;

export function RegistrationPage({ role }: { role: AccountRole }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { title, description } = registrationCopy[role];

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
    <AuthShell action="login">
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
    </AuthShell>
  );
}
