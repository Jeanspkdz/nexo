"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { LocalAccount } from "@/features/account/infrastructure/browser-account-store";
import { providerServices as mockProviderServices } from "@/features/marketplace/infrastructure/mock-catalog";
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

import { CategoryFields } from "./category-fields";

export function EventRequest({
  provider,
  eventSaved,
  setEventSaved,
  userId,
  go,
  notify,
}: {
  provider: (typeof providers)[number];
  eventSaved: boolean;
  setEventSaved: (v: boolean) => void;
  userId: string;
  go: (s: Screen) => void;
  notify: (s: string) => void;
}) {
  const [step, setStep] = useState(eventSaved ? 2 : 1);
  const [savedEvents, setSavedEvents] = useState<CustomerEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  useEffect(() => {
    const events = readCustomerEvents(userId);
    setSavedEvents(events);
    setSelectedEventId(readSelectedCustomerEventId(userId) ?? events[0]?.id ?? "");
  }, [userId]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (step === 1) {
      const eventType = String(data.get("eventType"));
      const customerEvent: CustomerEvent = {
        id: `event-${userId}-${Date.now()}`,
        userId,
        name: String(data.get("eventName")),
        eventType:
          eventType === "Matrimonio"
            ? "wedding"
            : eventType === "Evento corporativo"
              ? "corporate"
              : "birthday",
        date: String(data.get("eventDate")),
        time: String(data.get("eventTime")),
        guestCount: Number(data.get("guestCount")),
        location: String(data.get("location")),
        budget: Number(data.get("budget")) || undefined,
        accessibility: String(data.get("accessibility")) || undefined,
        notes: String(data.get("notes")) || undefined,
      };
      saveCustomerEvent(customerEvent);
      selectCustomerEvent(userId, customerEvent.id);
      setSavedEvents((events) => [...events, customerEvent]);
      setSelectedEventId(customerEvent.id);
      setEventSaved(true);
      setStep(2);
    } else {
      const userEventId = selectedEventId || readSelectedCustomerEventId(userId);
      if (!userEventId) {
        notify("Primero guarda o selecciona un evento.");
        setStep(1);
        return;
      }
      const serviceIds = data.getAll("providerServiceIds").map(String);
      saveQuotationRequest({
        id: `request-${Date.now()}`,
        userEventId,
        providerId: provider.id,
        providerServiceIds: serviceIds.length ? serviceIds : [provider.serviceId],
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      notify(`Solicitud enviada a ${provider.company}. La empresa preparará la cotización.`);
      go("myevent");
    }
  };
  return (
    <div className="product-page narrow-page">
      <div className="breadcrumbs">
        <button onClick={() => go("service")}>{provider.service}</button>
        <span>/</span>
        <span>Solicitud de cotización</span>
      </div>
      <div className="request-heading">
        <div>
          <span className="step-label">Paso {step} de 2</span>
          <h1>
            {step === 1
              ? "Define tu evento"
              : `Información para ${catName(provider.category).toLowerCase()}`}
          </h1>
          <p>
            {step === 1
              ? "Estos datos se reutilizan en las solicitudes a otras empresas."
              : `Solo ${provider.company} verá esta solicitud demo.`}
          </p>
        </div>
        <div className="progress">
          <span className="active"></span>
          <span className={step === 2 ? "active" : ""}></span>
        </div>
      </div>
      <form className="request-form" onSubmit={submit}>
        {step === 1 ? (
          <>
            {savedEvents.length > 0 && (
              <label>
                Usar un evento guardado
                <select
                  value={selectedEventId}
                  onChange={(event) => setSelectedEventId(event.target.value)}
                >
                  {savedEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} · {event.date}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => {
                    selectCustomerEvent(userId, selectedEventId);
                    setEventSaved(true);
                    setStep(2);
                  }}
                >
                  Usar este evento
                </button>
              </label>
            )}
            <div className="form-grid">
              <label>
                Tipo de evento
                <select name="eventType" defaultValue={demoEvent.type}>
                  <option>Cumpleaños</option>
                  <option>Matrimonio</option>
                  <option>Evento corporativo</option>
                </select>
              </label>
              <label>
                Nombre del evento
                <input name="eventName" defaultValue={demoEvent.name} required />
              </label>
              <label>
                Fecha
                <input name="eventDate" type="date" defaultValue={demoEvent.date} required />
              </label>
              <label>
                Horario o duración
                <input name="eventTime" defaultValue={demoEvent.time} required />
              </label>
              <label>
                Número de invitados
                <input
                  name="guestCount"
                  type="number"
                  defaultValue={demoEvent.guests}
                  min="1"
                  required
                />
              </label>
              <label>
                Ubicación
                <input name="location" defaultValue={demoEvent.location} required />
              </label>
              <label>
                Presupuesto opcional
                <input name="budget" type="number" defaultValue={demoEvent.budget} />
              </label>
              <label>
                Necesidades de accesibilidad
                <input name="accessibility" defaultValue={demoEvent.accessibility} />
              </label>
              <label className="full">
                Notas generales
                <textarea name="notes" defaultValue={demoEvent.notes} />
              </label>
            </div>
            <button className="primary">Guardar y continuar</button>
          </>
        ) : (
          <>
            {mockProviderServices.filter((service) => service.providerId === provider.id).length >
              1 && (
              <fieldset className="plain-section">
                <legend>Servicios a cotizar</legend>
                {mockProviderServices
                  .filter((service) => service.providerId === provider.id)
                  .map((service) => (
                    <label key={service.id} className="check">
                      <input
                        name="providerServiceIds"
                        type="checkbox"
                        value={service.id}
                        defaultChecked={service.id === provider.serviceId}
                      />
                      {service.name}
                    </label>
                  ))}
              </fieldset>
            )}
            <CategoryFields category={provider.category} />
            <div className="form-actions">
              <button type="button" className="secondary" onClick={() => setStep(1)}>
                Volver al evento
              </button>
              <button className="primary">Enviar solicitud a {provider.company}</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
