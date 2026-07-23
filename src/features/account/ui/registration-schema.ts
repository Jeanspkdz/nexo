import { z } from "zod";
import type { AccountRole } from "@/features/account/infrastructure/browser-account-store";

const required = (message: string) => z.string().trim().min(1, message);

export function registrationSchema(role: AccountRole) {
  return z
    .object({
      firstName: required("Escribe tu nombre."),
      lastName: required("Escribe tus apellidos."),
      email: z
        .string()
        .trim()
        .pipe(z.email("Escribe un correo válido. Ejemplo: nombre@empresa.com")),
      phone: z.string(),
      password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
      confirmPassword: z.string(),
      companyName: z.string(),
      category: z.string(),
      location: z.string(),
      coverage: z.string(),
      commercialPhone: z.string(),
      description: z.string(),
      terms: z.boolean().refine(Boolean, {
        message: "Debes aceptar los términos y la política de privacidad.",
      }),
    })
    .superRefine((values, context) => {
      if (values.password !== values.confirmPassword) {
        context.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "Las contraseñas no coinciden.",
        });
      }
      if (role !== "company") return;
      const requiredCompanyFields = [
        ["phone", values.phone],
        ["companyName", values.companyName],
        ["category", values.category],
        ["location", values.location],
        ["coverage", values.coverage],
        ["commercialPhone", values.commercialPhone],
        ["description", values.description],
      ] as const;
      for (const [path, value] of requiredCompanyFields) {
        if (!value.trim()) {
          context.addIssue({
            code: "custom",
            path: [path],
            message: "Completa todos los campos obligatorios para crear la cuenta.",
          });
        }
      }
    });
}

export type RegistrationValues = z.input<ReturnType<typeof registrationSchema>>;
