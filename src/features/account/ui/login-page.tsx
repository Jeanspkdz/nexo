"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  authenticate,
  demoAccounts,
  destinationFor,
  saveSession,
  type LocalAccount,
} from "@/features/account/infrastructure/browser-account-store";
import { Button, Field, FieldError, FieldLabel, Input } from "@/shared/ui";
import { AuthShell } from "./auth-shell";
import { loginSchema, type LoginValues } from "./login-schema";

export function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function submit(values: LoginValues) {
    const account = authenticate(values.email, values.password);
    if (!account) {
      setError("root", {
        message:
          "El correo o la contraseña no coinciden. Revisa los datos o usa una cuenta de prueba.",
      });
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
      <div className="grid grid-cols-[minmax(18rem,0.85fr)_minmax(24rem,1.15fr)] items-start gap-[clamp(3rem,8vw,7rem)] max-[760px]:grid-cols-1">
        <section className="pt-8 max-[760px]:pt-0">
          <span className="text-[0.85rem] font-bold text-nexo-plum">Acceso a Nexo</span>
          <h1 className="my-3 mb-4 font-nexo-serif text-[3.2rem] leading-[1.03] font-normal tracking-[-0.035em] text-nexo-plum text-balance max-[760px]:text-[2.5rem]">
            Continúa organizando con claridad.
          </h1>
          <p className="max-w-[60ch] text-nexo-muted">
            Tu cuenta determina qué información y herramientas puedes ver.
          </p>
          <ul className="mt-8 list-none p-0">
            <li className="border-b border-nexo-line py-[0.8rem] before:mr-3 before:font-bold before:text-nexo-success before:content-['✓']">
              Clientes: eventos, cotizaciones y contratos.
            </li>
            <li className="border-b border-nexo-line py-[0.8rem] before:mr-3 before:font-bold before:text-nexo-success before:content-['✓']">
              Empresas: servicios, solicitudes y pagos simulados.
            </li>
          </ul>
        </section>
        <section
          className="rounded-nexo-surface border border-nexo-line p-8 max-[760px]:p-5"
          aria-labelledby="login-title"
        >
          <div>
            <h2 id="login-title" className="mb-1 text-[1.65rem]">
              Iniciar sesión
            </h2>
            <p className="text-nexo-muted">
              Usa tus datos locales o entra con una cuenta de prueba.
            </p>
          </div>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit(submit)} noValidate>
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="login-email">Correo electrónico</FieldLabel>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </Field>
            <Field data-invalid={Boolean(errors.password)}>
              <FieldLabel htmlFor="login-password">Contraseña</FieldLabel>
              <span className="relative block">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="pr-[5.5rem]"
                  aria-invalid={Boolean(errors.password)}
                  {...register("password")}
                />
                <button
                  className="absolute top-1 right-[0.35rem] min-h-10 border-0 bg-transparent px-[0.6rem] text-[0.8rem] font-bold text-nexo-plum"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </span>
            </Field>
            {(errors.root?.message || errors.email?.message || errors.password?.message) && (
              <FieldError>
                {errors.root?.message ?? errors.email?.message ?? errors.password?.message}
              </FieldError>
            )}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Iniciar sesión
            </Button>
          </form>
          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-nexo-line pt-6 max-[760px]:grid-cols-1">
            <span className="col-span-full text-[0.8rem] font-bold text-nexo-muted">
              Cuentas de prueba
            </span>
            {demoAccounts.map((account) => (
              <button
                className="grid min-h-16 rounded-nexo-control border border-nexo-line bg-white p-[0.65rem] text-left text-nexo-plum-deep hover:border-nexo-plum focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-nexo-coral"
                key={account.id}
                type="button"
                onClick={() => enterDemo(account)}
              >
                <strong>
                  {account.company?.name ?? `${account.firstName} ${account.lastName}`}
                </strong>
                <small className="text-nexo-muted">
                  {account.role === "client" ? "Cliente" : "Empresa"}
                </small>
              </button>
            ))}
          </div>
          <p className="mt-6 mb-0 text-center text-nexo-muted">
            ¿Todavía no tienes cuenta?{" "}
            <Link className="font-bold text-nexo-plum" href="/registro">
              Crear una cuenta
            </Link>
          </p>
        </section>
      </div>
    </AuthShell>
  );
}
