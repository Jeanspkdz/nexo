"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearSession,
  destinationFor,
  readSession,
  type LocalAccount,
} from "@/features/account/infrastructure/browser-account-store";
import { SiteHeader } from "@/shared/ui";
import { providers } from "./legacy-demo-data";
import type { Category, Screen } from "./legacy-ui-model";
import { DashboardTopbar } from "./dashboard-topbar";
import { ClientDashboardFrame } from "./client-dashboard-frame";
import { Home } from "./marketplace-home";
import { Results } from "./provider-results";
import { Profile } from "./provider-profile";
import { Service } from "./provider-service";
import { Compare } from "./provider-comparison";
import { EventRequest } from "./event-request";
import { Quotes } from "./quotation-list";
import { MyEvent } from "./my-event";
import { NewCompanyPanel } from "./new-company-panel";
import { CompanyPanel } from "./company-panel";

type Role = "client" | "company";

export function DemoApp() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const role: Role = segments[0] === "panel" ? "company" : "client";
  const [session, setSession] = useState<LocalAccount | null>(null);
  const companyId =
    role === "company" ? (session?.company?.id ?? segments[1] ?? "jardines") : "jardines";
  const category = (
    ["resultados", "comparar"].includes(segments[0]) ? segments[1] : "salones"
  ) as Category;
  const selectedId =
    segments[0] === "empresas" || segments[0] === "servicios"
      ? (segments[1] ?? "jardines")
      : "jardines";
  const screen: Screen =
    pathname === "/explorar"
      ? "home"
      : segments[0] === "resultados"
        ? "results"
        : segments[0] === "comparar"
          ? "compare"
          : segments[0] === "empresas"
            ? "profile"
            : segments[0] === "servicios" && segments[2] === "solicitar"
              ? "event"
              : segments[0] === "servicios"
                ? "service"
                : segments[0] === "cotizaciones"
                  ? "quotes"
                  : segments[0] === "mi-evento"
                    ? "myevent"
                    : segments[0] === "panel"
                      ? "company"
                      : "home";
  const [compare, setCompare] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [eventSaved, setEventSaved] = useState(false);

  useEffect(() => {
    const activeSession = readSession();
    if (!activeSession) {
      router.replace("/login");
      return;
    }
    setSession(activeSession);
    if (
      (role === "client" && activeSession.role !== "client") ||
      (role === "company" && activeSession.role !== "company")
    ) {
      router.replace(destinationFor(activeSession));
    }
  }, [role, router]);
  useEffect(() => {
    const saved = localStorage.getItem("nexo-v02-state");
    if (saved) {
      try {
        const value = JSON.parse(saved);
        setEventSaved(Boolean(value.eventSaved));
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("nexo-v02-state", JSON.stringify({ eventSaved }));
  }, [eventSaved]);
  const selected = providers.find((p) => p.id === selectedId) ?? providers[0];
  const matchedCompany = providers.find((p) => p.id === companyId);
  const company = matchedCompany ?? providers[0];
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("servicios");
    if (requested) setCompare(requested.split(",").filter(Boolean));
  }, [pathname]);
  useEffect(() => {
    if (role !== "company" || !segments[2]) return;
    const sectionIndex: Record<string, number> = {
      servicios: 1,
      solicitudes: 2,
      editor: 3,
      cotizaciones: 4,
      contratos: 5,
      portafolio: 6,
    };
    const index = sectionIndex[segments[2]];
    if (index !== undefined) {
      window.setTimeout(() => document.getElementById(`company-${index}`)?.scrollIntoView(), 0);
    }
  }, [pathname, role, segments]);
  const go = (next: Screen) => {
    const routes: Record<Screen, string> = {
      home: "/explorar",
      results: `/resultados/${category}`,
      profile: `/empresas/${selectedId}`,
      service: `/servicios/${selectedId}`,
      compare: `/comparar/${category}${compare.length ? `?servicios=${compare.join(",")}` : ""}`,
      event: `/servicios/${selectedId}/solicitar`,
      quotes: "/cotizaciones",
      myevent: "/mi-evento",
      company: `/panel/${companyId}`,
    };
    router.push(routes[next]);
  };
  const openCategory = (id: Category) => {
    setCompare([]);
    router.push(`/resultados/${id}`);
  };
  const openProvider = (id: string, target: "profile" | "service" = "profile") => {
    router.push(target === "profile" ? `/empresas/${id}` : `/servicios/${id}`);
  };
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };
  const toggleCompare = (id: string) =>
    setCompare((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );

  return (
    <div className="market-app">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      {role === "client" && ["myevent", "home", "quotes"].includes(screen) ? (
        <DashboardTopbar
          session={session}
          onLogout={() => {
            clearSession();
            setSession(null);
            router.push("/");
          }}
        />
      ) : (
        <SiteHeader
          className="market-header"
          navigation={
            <>
              {role === "client" ? (
                <>
                  <button className={screen === "home" ? "current" : ""} onClick={() => go("home")}>
                    Explorar
                  </button>
                  <button
                    className={screen === "myevent" ? "current" : ""}
                    onClick={() => go("myevent")}
                  >
                    Mi evento
                  </button>
                  <button
                    className={screen === "quotes" ? "current" : ""}
                    onClick={() => go("quotes")}
                  >
                    Cotizaciones
                  </button>
                </>
              ) : (
                <>
                  <button className="current" onClick={() => router.push(`/panel/${companyId}`)}>
                    Panel de empresa
                  </button>
                  <button onClick={() => router.push(`/panel/${companyId}/portafolio`)}>
                    Portafolio
                  </button>
                </>
              )}
            </>
          }
          actions={
            <div className="identity">
              <span className="avatar">
                {role === "client"
                  ? `${session?.firstName?.[0] ?? "A"}${session?.lastName?.[0] ?? "S"}`
                  : (session?.company?.name ?? company.company).slice(0, 2).toUpperCase()}
              </span>
              <span>
                <strong>
                  {role === "client"
                    ? session
                      ? `${session.firstName} ${session.lastName}`
                      : "Cuenta cliente"
                    : (session?.company?.name ?? company.company)}
                </strong>
                <small>
                  {role === "client" ? "Cliente · cuenta local" : "Empresa · cuenta local"}
                </small>
              </span>
              <button
                className="session-exit"
                onClick={() => {
                  clearSession();
                  setSession(null);
                  router.push("/");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          }
        />
      )}
      <main id="main">
        {role === "company" && !matchedCompany && session?.company ? (
          <NewCompanyPanel account={session} />
        ) : role === "company" ? (
          <CompanyPanel company={company} notify={notify} navigate={(path) => router.push(path)} />
        ) : (
          <>
            {screen === "home" && (
              <ClientDashboardFrame active="none">
                <Home openCategory={openCategory} openProvider={openProvider} />
              </ClientDashboardFrame>
            )}
            {screen === "results" && (
              <Results
                category={category}
                compare={compare}
                toggleCompare={toggleCompare}
                openProvider={openProvider}
                go={go}
              />
            )}
            {screen === "profile" && (
              <Profile provider={selected} openProvider={openProvider} go={go} />
            )}
            {screen === "service" && <Service provider={selected} go={go} />}
            {screen === "compare" && (
              <Compare
                ids={
                  compare.length
                    ? compare
                    : providers.filter((p) => p.category === category).map((p) => p.id)
                }
                go={go}
                openProvider={openProvider}
              />
            )}
            {screen === "event" && (
              <EventRequest
                provider={selected}
                eventSaved={eventSaved}
                setEventSaved={setEventSaved}
                userId={session?.id ?? "client-andrea"}
                go={go}
                notify={notify}
              />
            )}
            {screen === "quotes" && (
              <ClientDashboardFrame active="quotes">
                <Quotes
                  go={go}
                  code={segments[1]}
                  navigate={(code) => router.push(`/cotizaciones/${code}`)}
                />
              </ClientDashboardFrame>
            )}
            {screen === "myevent" && <MyEvent notify={notify} />}
          </>
        )}
      </main>
      <footer className="demo-footer">
        <span>
          <strong>Prototipo Nexo v0.2</strong> · Datos, contratos, pagos y comisiones simulados.
        </span>
        <button
          onClick={() => {
            localStorage.removeItem("nexo-v02-state");
            localStorage.removeItem("nexo-customer-events");
            localStorage.removeItem("nexo-selected-customer-event");
            localStorage.removeItem("nexo-quotation-requests");
            localStorage.removeItem("nexo-detailed-quotations");
            localStorage.removeItem("nexo-provider-contracts");
            setEventSaved(false);
            notify("Datos locales de la demo reiniciados");
          }}
        >
          Reiniciar demo
        </button>
      </footer>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
