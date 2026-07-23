"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { LocalAccount } from "@/features/account/infrastructure/browser-account-store";
import {
  readCustomerEvents,
  readSelectedCustomerEventId,
  saveCustomerEvent,
  selectCustomerEvent,
  type CustomerEvent,
} from "@/features/legacy/infrastructure/customer-events";
import {
  readQuotationRequests,
  saveQuotationRequest,
} from "@/features/legacy/infrastructure/quotation-requests";
import {
  acceptDetailedQuotation,
  readDetailedQuotations,
  saveDetailedQuotation,
} from "@/features/legacy/infrastructure/quotations";
import {
  readProviderContracts,
  saveProviderContract,
} from "@/features/legacy/infrastructure/provider-contracts";
import { catName, categories, demoEvent, money, providers, quotes } from "./legacy-demo-data";
import type { Category, Screen } from "./legacy-ui-model";

export function CategoryFields({ category }: { category: Category }) {
  if (category === "salones")
    return (
      <div className="form-grid">
        <label>
          Horario requerido
          <input defaultValue="17:00–01:00" />
        </label>
        <label>
          Montaje y desmontaje
          <input defaultValue="Montaje desde las 12:00; retiro hasta las 03:00" />
        </label>
        <label>
          Invitados
          <input type="number" defaultValue="90" />
        </label>
        <label>
          Distribución
          <select>
            <option>Mesas redondas y pista central</option>
            <option>Auditorio</option>
            <option>Cóctel</option>
          </select>
        </label>
        <label>
          Catering o bar externo
          <select>
            <option>Sí, ambos</option>
            <option>Solo catering</option>
            <option>No</option>
          </select>
        </label>
        <label>
          Estacionamiento
          <input defaultValue="20 vehículos" />
        </label>
        <label>
          Accesibilidad
          <input defaultValue="Ruta sin escalones y baño accesible" />
        </label>
        <label>
          Necesidades A/V
          <input defaultValue="Sonido, 2 micrófonos y pantalla" />
        </label>
      </div>
    );
  if (category === "catering")
    return (
      <div className="form-grid">
        <label>
          Adultos / niños
          <input defaultValue="75 adultos, 15 niños" />
        </label>
        <label>
          Modalidad
          <select>
            <option>Buffet</option>
            <option>Servicio a la mesa</option>
            <option>Cóctel</option>
          </select>
        </label>
        <label>
          Tiempos de comida
          <input defaultValue="Entrada, fondo y postre" />
        </label>
        <label>
          Bebidas o bar
          <input defaultValue="Bebidas sin alcohol y barra de cócteles" />
        </label>
        <label>
          Alergias o restricciones
          <input defaultValue="3 vegetarianos, 2 sin gluten" />
        </label>
        <label>
          Cocina disponible
          <input defaultValue="Cocina de apoyo con agua y energía" />
        </label>
        <label>
          Menaje
          <input defaultValue="Vajilla y cristalería completas" />
        </label>
        <label>
          Personal requerido
          <input defaultValue="Cocina, 4 mozos y 1 capitán" />
        </label>
      </div>
    );
  return (
    <div className="form-grid">
      <label>
        Cobertura requerida
        <input defaultValue="Preparación, recepción y celebración" />
      </label>
      <label>
        Horas
        <input type="number" defaultValue="8" />
      </label>
      <label>
        Ubicaciones
        <input defaultValue="Surco, una sola ubicación" />
      </label>
      <label>
        Servicio
        <select>
          <option>Foto y video</option>
          <option>Fotografía</option>
          <option>Video</option>
        </select>
      </label>
      <label>
        Estilo
        <input defaultValue="Documental natural" />
      </label>
      <label>
        Entregables
        <input defaultValue="Galería, película corta y 20 fotos prioritarias" />
      </label>
      <label>
        Fecha requerida
        <input defaultValue="Entrega dentro de 30 días" />
      </label>
      <label>
        Viaje y dron
        <input defaultValue="Sin viaje; cotizar dron sujeto a permiso" />
      </label>
    </div>
  );
}
