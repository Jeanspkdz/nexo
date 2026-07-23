"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  createAccount,
  destinationFor,
  emailExists,
  saveSession,
  type AccountRole,
  type LocalAccount,
} from "@/features/account/infrastructure/browser-account-store";
import { cn } from "@/shared/lib/cn";
import {
  Button,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Input,
  buttonVariants,
} from "@/shared/ui";
import { AuthShell } from "./auth-shell";
import { registrationSchema, type RegistrationValues } from "./registration-schema";

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

const selectClassName =
  "min-h-12 w-full rounded-nexo-control border border-nexo-line bg-white px-[0.8rem] py-[0.7rem] text-nexo-plum-deep outline-none focus-visible:border-nexo-plum focus-visible:ring-3 focus-visible:ring-nexo-coral focus-visible:ring-offset-3 aria-invalid:border-[#9b423b]";

export function RegistrationPage({ role }: { role: AccountRole }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { title, description } = registrationCopy[role];
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema(role)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      category: "",
      location: role === "company" ? "Lima" : "",
      coverage: "",
      commercialPhone: "",
      description: "",
      terms: false,
    },
  });

  function submit(values: RegistrationValues) {
    const email = values.email.trim().toLowerCase();
    if (emailExists(email)) {
      setError("root", { message: "Ya existe una cuenta local con ese correo." });
      return;
    }
    const companyId =
      values.companyName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `empresa-${Date.now()}`;
    const account: LocalAccount = {
      id: `${role}-${Date.now()}`,
      role,
      firstName: values.firstName,
      lastName: values.lastName,
      email,
      password: values.password,
      phone: values.phone,
      company:
        role === "company"
          ? {
              id: companyId,
              name: values.companyName,
              category: values.category as "salones" | "catering" | "foto",
              location: values.location,
              coverage: values.coverage,
              description: values.description,
              commercialPhone: values.commercialPhone,
            }
          : undefined,
    };
    createAccount(account);
    saveSession(account);
    router.push(destinationFor(account));
  }

  const firstError =
    errors.root?.message ??
    Object.values(errors).find((error) => error && "message" in error && error.message)?.message;

  return (
    <AuthShell action="login">
      <section className="mx-auto w-full max-w-[900px]">
        <div className="mb-10 grid justify-items-start gap-y-2">
          <Link
            className="inline-flex min-h-11 items-center font-bold text-nexo-plum no-underline"
            href="/registro"
          >
            ← Cambiar tipo de cuenta
          </Link>
          <span className="text-[0.85rem] font-bold text-nexo-plum">
            {role === "client" ? "Cuenta de cliente" : "Cuenta de empresa"}
          </span>
          <h1 className="my-1 font-nexo-serif text-[3.2rem] leading-[1.03] font-normal tracking-[-0.035em] text-nexo-plum text-balance max-[760px]:text-[2.5rem]">
            {title}
          </h1>
          <p className="max-w-[60ch] text-nexo-muted">{description}</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(submit)} noValidate>
          <fieldset className="m-0 rounded-nexo-surface border border-nexo-line p-7 max-[760px]:p-5">
            <legend className="px-2 text-[1.2rem] font-bold">
              {role === "company" ? "Tu acceso" : "Datos de acceso"}
            </legend>
            <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
              <Field data-invalid={Boolean(errors.firstName)}>
                <FieldLabel htmlFor={`${role}-firstName`}>Nombre</FieldLabel>
                <Input
                  id={`${role}-firstName`}
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                  {...register("firstName")}
                />
              </Field>
              <Field data-invalid={Boolean(errors.lastName)}>
                <FieldLabel htmlFor={`${role}-lastName`}>Apellidos</FieldLabel>
                <Input
                  id={`${role}-lastName`}
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                  {...register("lastName")}
                />
              </Field>
              <Field
                className="col-span-full max-[760px]:col-span-1"
                data-invalid={Boolean(errors.email)}
              >
                <FieldLabel htmlFor={`${role}-email`}>Correo electrónico</FieldLabel>
                <Input
                  id={`${role}-email`}
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
              </Field>
              {role === "company" && (
                <Field
                  className="col-span-full max-[760px]:col-span-1"
                  data-invalid={Boolean(errors.phone)}
                >
                  <FieldLabel htmlFor="company-phone">Teléfono del responsable</FieldLabel>
                  <Input
                    id="company-phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                </Field>
              )}
              <Field data-invalid={Boolean(errors.password)}>
                <FieldLabel htmlFor={`${role}-password`}>Contraseña</FieldLabel>
                <span className="relative block">
                  <Input
                    id={`${role}-password`}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                <small className="font-normal text-nexo-muted">Mínimo 8 caracteres.</small>
              </Field>
              <Field data-invalid={Boolean(errors.confirmPassword)}>
                <FieldLabel htmlFor={`${role}-confirmPassword`}>Confirmar contraseña</FieldLabel>
                <Input
                  id={`${role}-confirmPassword`}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword")}
                />
              </Field>
            </div>
          </fieldset>

          {role === "company" && (
            <fieldset className="m-0 rounded-nexo-surface border border-nexo-line p-7 max-[760px]:p-5">
              <legend className="px-2 text-[1.2rem] font-bold">Tu empresa</legend>
              <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
                <Field
                  className="col-span-full max-[760px]:col-span-1"
                  data-invalid={Boolean(errors.companyName)}
                >
                  <FieldLabel htmlFor="company-name">Nombre comercial</FieldLabel>
                  <Input
                    id="company-name"
                    aria-invalid={Boolean(errors.companyName)}
                    {...register("companyName")}
                  />
                </Field>
                <Field data-invalid={Boolean(errors.category)}>
                  <FieldLabel htmlFor="company-category">Categoría principal</FieldLabel>
                  <select
                    id="company-category"
                    className={selectClassName}
                    aria-invalid={Boolean(errors.category)}
                    {...register("category")}
                  >
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    <option value="salones">Locales o salones</option>
                    <option value="catering">Catering</option>
                    <option value="foto">Fotografía y video</option>
                  </select>
                </Field>
                <Field data-invalid={Boolean(errors.location)}>
                  <FieldLabel htmlFor="company-location">Ciudad o ubicación principal</FieldLabel>
                  <Input
                    id="company-location"
                    aria-invalid={Boolean(errors.location)}
                    {...register("location")}
                  />
                </Field>
                <Field data-invalid={Boolean(errors.coverage)}>
                  <FieldLabel htmlFor="company-coverage">Cobertura</FieldLabel>
                  <Input
                    id="company-coverage"
                    placeholder="Ej. Lima Metropolitana"
                    aria-invalid={Boolean(errors.coverage)}
                    {...register("coverage")}
                  />
                </Field>
                <Field data-invalid={Boolean(errors.commercialPhone)}>
                  <FieldLabel htmlFor="company-commercial-phone">
                    Teléfono o WhatsApp comercial
                  </FieldLabel>
                  <Input
                    id="company-commercial-phone"
                    type="tel"
                    aria-invalid={Boolean(errors.commercialPhone)}
                    {...register("commercialPhone")}
                  />
                </Field>
                <Field
                  className="col-span-full max-[760px]:col-span-1"
                  data-invalid={Boolean(errors.description)}
                >
                  <FieldLabel htmlFor="company-description">Descripción breve</FieldLabel>
                  <textarea
                    id="company-description"
                    className={cn(selectClassName, "min-h-28 resize-y")}
                    maxLength={240}
                    aria-invalid={Boolean(errors.description)}
                    {...register("description")}
                  />
                </Field>
              </div>
              <p className="mt-4 mb-0 text-[0.85rem] font-normal text-nexo-muted">
                Agregarás servicios, precios y portafolio después desde el panel.
              </p>
            </fieldset>
          )}

          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <Field
                className="mt-2 flex min-h-11 grid-cols-[auto_1fr] items-center gap-[0.65rem] font-medium text-nexo-muted"
                data-invalid={Boolean(errors.terms)}
              >
                <Checkbox
                  id={`${role}-terms`}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  aria-invalid={Boolean(errors.terms)}
                />
                <FieldLabel className="font-medium text-nexo-muted" htmlFor={`${role}-terms`}>
                  Acepto los términos y la política de privacidad del prototipo.
                </FieldLabel>
              </Field>
            )}
          />
          {firstError && <FieldError>{String(firstError)}</FieldError>}
          <div className="flex justify-end gap-3 max-[760px]:flex-col">
            <Link
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "no-underline max-[760px]:w-full",
              )}
              href="/"
            >
              Volver al inicio
            </Link>
            <Button className="max-[760px]:w-full" type="submit" disabled={isSubmitting}>
              {role === "client" ? "Crear cuenta de cliente" : "Crear cuenta de empresa"}
            </Button>
          </div>
        </form>
      </section>
    </AuthShell>
  );
}
