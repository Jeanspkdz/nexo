"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

type Category = "salones" | "catering" | "foto";
type Role = "client" | "company";
type Screen =
  | "home"
  | "results"
  | "profile"
  | "service"
  | "compare"
  | "event"
  | "quotes"
  | "myevent"
  | "company";

const categories = [
  {
    id: "salones",
    name: "Locales o salones",
    image: "/images/landing/category-spaces.png",
    note: "Espacios, capacidad y equipamiento",
    active: true,
  },
  {
    id: "catering",
    name: "Catering",
    image: "/images/landing/category-catering.png",
    note: "Menús, bebidas y personal",
    active: true,
  },
  {
    id: "foto",
    name: "Fotografía y video",
    image: "/images/landing/category-photography.png",
    note: "Cobertura y entregables",
    active: true,
  },
  {
    id: "decoracion",
    name: "Decoración",
    image: "/images/landing/category-decoration.png",
    note: "Ambientación y flores",
    active: false,
  },
  {
    id: "musica",
    name: "Música, DJ y sonido",
    image: "/images/landing/category-music.png",
    note: "Música y producción sonora",
    active: false,
  },
  {
    id: "mobiliario",
    name: "Mobiliario y equipos",
    image: null,
    note: "Mesas, sillas y equipos",
    active: false,
  },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
    image: null,
    note: "Experiencias para invitados",
    active: false,
  },
  {
    id: "transporte",
    name: "Transporte",
    image: null,
    note: "Traslados para tu evento",
    active: false,
  },
] as const;

const providers = [
  {
    id: "jardines",
    category: "salones" as Category,
    company: "Jardines de Surco",
    service: "Jardín y salón contemporáneo",
    location: "Santiago de Surco, Lima",
    coverage: "Lima Metropolitana",
    rating: 4.9,
    reviews: 86,
    price: 4800,
    unit: "paquete de 8 horas",
    minimum: "Mínimo 60 invitados",
    image: "/images/landing/category-spaces.png",
    sponsored: true,
    capacity: "60–180 personas",
    lead: "Un espacio flexible con jardín, salón interior y respaldo técnico.",
    package: "Paquete celebración",
    included: [
      "8 horas de espacio",
      "Mesas y sillas para 120",
      "Limpieza final",
      "Coordinador de sede",
    ],
    excluded: ["Catering y bar", "Decoración floral"],
    extras: ["Hora adicional S/ 380", "Pantalla y sonido S/ 650"],
    restrictions:
      "Música hasta las 2:00 a. m. El depósito de garantía de S/ 1,000 se devuelve tras la inspección.",
  },
  {
    id: "casa-barranco",
    category: "salones" as Category,
    company: "Casa Barranco",
    service: "Casona para celebraciones",
    location: "Barranco, Lima",
    coverage: "Lima Centro",
    rating: 4.8,
    reviews: 64,
    price: 5250,
    unit: "paquete de 7 horas",
    minimum: "Mínimo 50 invitados",
    image: "/images/landing/hero-event.png",
    sponsored: false,
    capacity: "50–140 personas",
    lead: "Casona restaurada con patio central y ambientes conectados.",
    package: "Casa completa",
    included: ["7 horas de espacio", "Mobiliario para 100", "Iluminación ambiental", "Seguridad"],
    excluded: ["Estacionamiento", "Equipos de cocina"],
    extras: ["Hora adicional S/ 420", "Montaje anticipado S/ 500"],
    restrictions:
      "No se permite pirotecnia. Proveedores externos deben acreditarse 72 horas antes.",
  },
  {
    id: "mesa-viva",
    category: "catering" as Category,
    company: "Mesa Viva",
    service: "Buffet peruano contemporáneo",
    location: "Miraflores, Lima",
    coverage: "Lima Metropolitana",
    rating: 4.9,
    reviews: 112,
    price: 98,
    unit: "por persona",
    minimum: "Mínimo 50 personas",
    image: "/images/landing/category-catering.png",
    sponsored: false,
    capacity: "50–350 personas",
    lead: "Cocina peruana de temporada con opciones vegetarianas y sin gluten.",
    package: "Buffet celebración",
    included: [
      "Entrada, fondo y postre",
      "Menaje completo",
      "1 mozo por cada 25 personas",
      "Montaje y limpieza",
    ],
    excluded: ["Bebidas alcohólicas", "Mobiliario"],
    extras: ["Bar desde S/ 38 por persona", "Estación de café S/ 12 por persona"],
    restrictions: "Confirmación final de asistentes y dietas 7 días antes.",
  },
  {
    id: "brasa-lima",
    category: "catering" as Category,
    company: "Brasa Lima Eventos",
    service: "Cena servida de tres tiempos",
    location: "San Borja, Lima",
    coverage: "Lima y Callao",
    rating: 4.7,
    reviews: 79,
    price: 115,
    unit: "por persona",
    minimum: "Mínimo 40 personas",
    image: "/images/landing/category-catering.png",
    sponsored: true,
    capacity: "40–250 personas",
    lead: "Servicio a la mesa, cocina móvil y carta adaptable al evento.",
    package: "Cena servida",
    included: [
      "Tres tiempos",
      "Personal de cocina y salón",
      "Vajilla y cristalería",
      "Transporte en Lima",
    ],
    excluded: ["Bar", "Torta"],
    extras: ["Cóctel de bienvenida S/ 18 por persona", "Menú infantil S/ 58"],
    restrictions: "Requiere acceso a agua y energía. Cocina móvil sujeta a visita técnica.",
  },
  {
    id: "luz-norte",
    category: "foto" as Category,
    company: "Luz Norte Studio",
    service: "Fotografía y película de evento",
    location: "Pueblo Libre, Lima",
    coverage: "Todo el Perú",
    rating: 4.9,
    reviews: 97,
    price: 3200,
    unit: "paquete de 8 horas",
    minimum: "Cobertura mínima 6 horas",
    image: "/images/landing/category-photography.png",
    sponsored: false,
    capacity: "1–3 profesionales",
    lead: "Documental natural con dirección discreta y entregables digitales.",
    package: "Historia completa",
    included: [
      "Fotógrafo y videógrafo",
      "8 horas de cobertura",
      "Galería de 500 fotos",
      "Película de 6–8 minutos",
    ],
    excluded: ["Álbum impreso", "Viajes fuera de Lima"],
    extras: ["Dron S/ 450", "Hora extra S/ 320", "Álbum S/ 680"],
    restrictions: "Entrega en 30 días. Dos rondas de edición de video. Uso personal incluido.",
  },
  {
    id: "enfoque",
    category: "foto" as Category,
    company: "Enfoque 24",
    service: "Cobertura fotográfica editorial",
    location: "San Isidro, Lima",
    coverage: "Lima y principales ciudades",
    rating: 4.8,
    reviews: 71,
    price: 2400,
    unit: "paquete de 6 horas",
    minimum: "Cobertura mínima 4 horas",
    image: "/images/landing/hero-event.png",
    sponsored: true,
    capacity: "1–2 profesionales",
    lead: "Retrato editorial y cobertura espontánea para eventos sociales y corporativos.",
    package: "Editorial 6",
    included: [
      "2 fotógrafos",
      "6 horas",
      "Galería de 350 fotos",
      "Entrega prioritaria de 20 fotos",
    ],
    excluded: ["Video", "Dron"],
    extras: ["Hora extra S/ 280", "Segundo local S/ 250"],
    restrictions: "Entrega completa en 21 días. Una ronda de ajustes de color.",
  },
];

const demoEvent = {
  name: "Cumpleaños de Valentina",
  type: "Cumpleaños",
  date: "2026-09-19",
  time: "17:00–01:00",
  guests: 90,
  location: "Santiago de Surco, Lima",
  budget: 18000,
  accessibility: "Acceso sin escalones y baño accesible",
  notes: "Celebración familiar. Se requiere espacio tranquilo para adultos mayores.",
};
const money = (value: number) => `S/ ${value.toLocaleString("es-PE")}`;
const catName = (id: Category) => categories.find((c) => c.id === id)?.name ?? id;

export function DemoApp() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const role: Role = segments[0] === "panel" ? "company" : "client";
  const companyId = role === "company" ? (segments[1] ?? "jardines") : "jardines";
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
  const company = providers.find((p) => p.id === companyId) ?? providers[0];
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
  const switchRole = (next: Role) => {
    router.push(next === "client" ? "/explorar" : `/panel/${companyId}`);
  };

  return (
    <div className="market-app">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <header className="market-header">
        <button
          className="wordmark"
          onClick={() => router.push("/")}
          aria-label="Ir al inicio de Nexo"
        >
          Nexo
        </button>
        <nav aria-label="Navegación principal">
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
              <button className={screen === "quotes" ? "current" : ""} onClick={() => go("quotes")}>
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
        </nav>
        <div className="identity">
          <span className="avatar">
            {role === "client" ? "AS" : company.company.slice(0, 2).toUpperCase()}
          </span>
          <span>
            <strong>{role === "client" ? "Andrea Salazar" : company.company}</strong>
            <small>{role === "client" ? "Cliente demo" : "Empresa demo"}</small>
          </span>
          <select
            aria-label="Cambiar cuenta demo"
            value={role === "client" ? "client" : companyId}
            onChange={(e) =>
              e.target.value === "client"
                ? switchRole("client")
                : router.push(`/panel/${e.target.value}`)
            }
          >
            <option value="client">Cuenta cliente</option>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.company}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main id="main">
        {role === "company" ? (
          <CompanyPanel company={company} notify={notify} navigate={(path) => router.push(path)} />
        ) : (
          <>
            {screen === "home" && <Home openCategory={openCategory} openProvider={openProvider} />}
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
                go={go}
                notify={notify}
              />
            )}
            {screen === "quotes" && (
              <Quotes
                go={go}
                code={segments[1]}
                navigate={(code) => router.push(`/cotizaciones/${code}`)}
              />
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

function Home({
  openCategory,
  openProvider,
}: {
  openCategory: (id: Category) => void;
  openProvider: (id: string) => void;
}) {
  const [eventType, setEventType] = useState("Cumpleaños");
  return (
    <>
      <section className="home-hero">
        <div>
          <p className="demo-note">Prototipo navegable · Lima</p>
          <h1>Todo tu evento, bien conectado.</h1>
          <p>
            Compara servicios, elige empresas distintas y conserva cada cotización, contrato y pago
            en su lugar.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            openCategory("salones");
          }}
          className="event-search"
        >
          <label>
            ¿Qué estás organizando?
            <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
              <option>Matrimonio</option>
              <option>Cumpleaños</option>
              <option>Quinceañero</option>
              <option>Aniversario</option>
              <option>Baby shower</option>
              <option>Bautizo</option>
              <option>Graduación</option>
              <option>Evento corporativo</option>
            </select>
          </label>
          <label>
            ¿Dónde?
            <input defaultValue="Lima" />
          </label>
          <button className="primary">Explorar servicios</button>
        </form>
      </section>
      <section className="page-section sponsored" aria-labelledby="sponsored-title">
        <div className="section-heading">
          <div>
            <span className="sponsor-label">Patrocinado</span>
            <h2 id="sponsored-title">Propuesta destacada para {eventType.toLowerCase()}</h2>
          </div>
          <p>Ubicación promocional pagada. No modifica las reseñas ni el orden orgánico.</p>
        </div>
        <ProviderRow provider={providers[0]} openProvider={openProvider} />
      </section>
      <section className="page-section" aria-labelledby="organic-title">
        <div className="section-heading">
          <div>
            <h2 id="organic-title">Empresas mejor valoradas para tu evento</h2>
            <p>Orden orgánico según las reseñas demo del tipo de evento seleccionado.</p>
          </div>
        </div>
        <div className="organic-list">
          {providers
            .filter((p) => !p.sponsored)
            .slice(0, 3)
            .map((p, i) => (
              <div key={p.id}>
                <span className="rank">{i + 1}</span>
                <ProviderRow provider={p} openProvider={openProvider} />
              </div>
            ))}
        </div>
      </section>
      <section className="page-section category-section" aria-labelledby="category-title">
        <div className="section-heading">
          <div>
            <h2 id="category-title">Servicios para construir tu evento</h2>
            <p>
              Tres categorías están disponibles en esta entrega. Las demás muestran el alcance
              futuro sin abrir recorridos incompletos.
            </p>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((c) => (
            <article key={c.id} className={`category-card ${!c.active ? "coming" : ""}`}>
              {c.image ? (
                <Image src={c.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
              ) : (
                <div className="visual-placeholder" aria-hidden="true">
                  <span>{c.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h3>{c.name}</h3>
                <p>{c.note}</p>
                {c.active ? (
                  <button onClick={() => openCategory(c.id as Category)}>
                    Ver opciones <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <span className="coming-label">Próximamente</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ProviderRow({
  provider,
  openProvider,
}: {
  provider: (typeof providers)[number];
  openProvider: (id: string) => void;
}) {
  return (
    <article className="provider-row">
      <div className="provider-thumb">
        <Image src={provider.image} alt="" fill sizes="180px" />
      </div>
      <div className="provider-main">
        <span>{catName(provider.category)}</span>
        <h3>{provider.company}</h3>
        <p>{provider.lead}</p>
      </div>
      <div className="provider-facts">
        <span>{provider.location}</span>
        <strong>
          ★ {provider.rating} <small>({provider.reviews} reseñas)</small>
        </strong>
        <span>
          Desde <strong>{money(provider.price)}</strong> · {provider.unit}
        </span>
      </div>
      <button className="secondary" onClick={() => openProvider(provider.id)}>
        Ver empresa
      </button>
    </article>
  );
}

function Results({
  category,
  compare,
  toggleCompare,
  openProvider,
  go,
}: {
  category: Category;
  compare: string[];
  toggleCompare: (id: string) => void;
  openProvider: (id: string, target?: "profile" | "service") => void;
  go: (s: Screen) => void;
}) {
  const list = providers.filter((p) => p.category === category);
  return (
    <div className="product-page">
      <div className="breadcrumbs">
        <button onClick={() => go("home")}>Inicio</button>
        <span>/</span>
        <span>{catName(category)}</span>
      </div>
      <div className="results-heading">
        <div>
          <h1>{catName(category)} para tu evento</h1>
          <p>Cumpleaños · 19 sep 2026 · 90 invitados · Lima</p>
        </div>
        <button className="secondary">
          Filtros <span className="filter-count">3</span>
        </button>
      </div>
      <div className="results-layout">
        <aside className="filters">
          <h2>Ajustar resultados</h2>
          <label>
            Distrito
            <select>
              <option>Todo Lima</option>
              <option>Miraflores</option>
              <option>Surco</option>
              <option>Barranco</option>
            </select>
          </label>
          <label>
            Presupuesto máximo
            <input type="number" defaultValue={category === "catering" ? 130 : 6000} />
          </label>
          <label className="check">
            <input type="checkbox" defaultChecked /> Mostrar disponibles
          </label>
          <p>El precio desde no reemplaza una cotización detallada.</p>
        </aside>
        <section className="result-list" aria-label="Resultados">
          {list.map((p, index) => (
            <article className="result-card" key={p.id}>
              <div className="result-image">
                <Image
                  src={p.image}
                  alt={`Portafolio promocional de ${p.company}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 720px) 100vw, 280px"
                />
                {p.sponsored && <span className="sponsor-label">Patrocinado</span>}
              </div>
              <div className="result-copy">
                <div>
                  <span className="category-name">{p.company}</span>
                  <h2>{p.service}</h2>
                </div>
                <p>
                  {p.location} · Cobertura: {p.coverage}
                </p>
                <strong className="rating">
                  ★ {p.rating} <small>{p.reviews} reseñas</small>
                </strong>
                <div className="price-block">
                  <span>Desde</span>
                  <strong>{money(p.price)}</strong>
                  <small>
                    {p.unit} · {p.minimum}
                  </small>
                </div>
                <div className="result-actions">
                  <label className="compare-check">
                    <input
                      type="checkbox"
                      checked={compare.includes(p.id)}
                      onChange={() => toggleCompare(p.id)}
                    />
                    Comparar
                  </label>
                  <button className="text-link" onClick={() => openProvider(p.id)}>
                    Ver perfil
                  </button>
                  <button className="primary" onClick={() => openProvider(p.id, "service")}>
                    Ver servicio
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      {compare.length > 0 && (
        <div className="compare-bar">
          <span>
            <strong>{compare.length}</strong> servicio{compare.length > 1 ? "s" : ""} de{" "}
            {catName(category)} seleccionado{compare.length > 1 ? "s" : ""}
          </span>
          <button className="primary" disabled={compare.length < 2} onClick={() => go("compare")}>
            Comparar {compare.length}
          </button>
        </div>
      )}
    </div>
  );
}

function Profile({
  provider,
  openProvider,
  go,
}: {
  provider: (typeof providers)[number];
  openProvider: (id: string, target?: "profile" | "service") => void;
  go: (s: Screen) => void;
}) {
  return (
    <div className="product-page detail-page">
      <div className="breadcrumbs">
        <button onClick={() => go("results")}>{catName(provider.category)}</button>
        <span>/</span>
        <span>{provider.company}</span>
      </div>
      <header className="profile-header">
        <div className="profile-mark">
          {provider.company
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p>Empresa demo · Responde en aproximadamente 4 horas</p>
          <h1>{provider.company}</h1>
          <span>
            ★ {provider.rating} ({provider.reviews} reseñas) · {provider.location}
          </span>
        </div>
        <button className="primary" onClick={() => openProvider(provider.id, "service")}>
          Ver servicio y precio
        </button>
      </header>
      <div className="profile-layout">
        <div>
          <section className="plain-section">
            <h2>Sobre la empresa</h2>
            <p>
              {provider.lead} Atiende {provider.coverage.toLowerCase()} y mantiene información
              detallada para que puedas evaluar el servicio antes de solicitar una propuesta.
            </p>
            <dl className="fact-grid">
              <div>
                <dt>Cobertura</dt>
                <dd>{provider.coverage}</dd>
              </div>
              <div>
                <dt>Categoría activa</dt>
                <dd>{catName(provider.category)}</dd>
              </div>
              <div>
                <dt>Capacidad</dt>
                <dd>{provider.capacity}</dd>
              </div>
            </dl>
          </section>
          <section className="portfolio">
            <div className="section-heading">
              <div>
                <span>Contenido publicado por la empresa</span>
                <h2>Portafolio promocional</h2>
              </div>
            </div>
            <div className="portfolio-grid">
              {[provider.image, "/images/landing/hero-event.png", provider.image].map((src, i) => (
                <figure key={i}>
                  <div>
                    <Image
                      src={src}
                      alt={`Trabajo promocional ${i + 1} de ${provider.company}`}
                      fill
                      sizes="33vw"
                    />
                  </div>
                  <figcaption>
                    {i === 0
                      ? "Celebración reciente"
                      : i === 1
                        ? "Preparación y detalles"
                        : "El equipo en acción"}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          <section className="reviews">
            <h2>Reseñas de clientes</h2>
            {[
              "Todo estuvo explicado desde el inicio y el equipo cumplió los tiempos.",
              "La propuesta fue clara y pudimos ajustar extras sin perder el control del total.",
            ].map((text, i) => (
              <article key={text}>
                <div className="review-avatar">{i ? "MC" : "JP"}</div>
                <div>
                  <strong>{i ? "María C." : "José P."} · ★ 5.0</strong>
                  <small>{i ? "Cumpleaños" : "Evento corporativo"} · Reseña demo</small>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
        <aside className="profile-aside">
          <span>Servicio disponible</span>
          <h2>{provider.service}</h2>
          <p>
            Desde <strong>{money(provider.price)}</strong> · {provider.unit}
          </p>
          <small>{provider.minimum}</small>
          <button className="primary" onClick={() => openProvider(provider.id, "service")}>
            Revisar condiciones
          </button>
        </aside>
      </div>
    </div>
  );
}

function Service({
  provider,
  go,
}: {
  provider: (typeof providers)[number];
  go: (s: Screen) => void;
}) {
  return (
    <div className="product-page detail-page">
      <div className="breadcrumbs">
        <button onClick={() => go("profile")}>{provider.company}</button>
        <span>/</span>
        <span>{provider.service}</span>
      </div>
      <header className="service-title">
        <div>
          <span>{catName(provider.category)}</span>
          <h1>{provider.service}</h1>
          <p>
            {provider.company} · ★ {provider.rating} ({provider.reviews} reseñas)
          </p>
        </div>
        <div className="service-price">
          <span>Precio desde</span>
          <strong>{money(provider.price)}</strong>
          <small>
            {provider.unit}
            <br />
            {provider.minimum}
          </small>
        </div>
      </header>
      <div className="service-layout">
        <div>
          <section className="package">
            <div>
              <span>Paquete recomendado</span>
              <h2>{provider.package}</h2>
              <p>{provider.capacity}</p>
            </div>
            <strong>{money(provider.price)}</strong>
          </section>
          <section className="terms-grid">
            <div>
              <h2>Incluye</h2>
              <ul className="check-list">
                {provider.included.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>No incluye</h2>
              <ul>
                {provider.excluded.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="plain-section">
            <h2>Extras disponibles</h2>
            <ul className="divided-list">
              {provider.extras.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section className="conditions">
            <h2>Condiciones y restricciones</h2>
            <p>{provider.restrictions}</p>
            <p>
              La disponibilidad y el precio final se confirman únicamente en la cotización enviada
              por la empresa.
            </p>
          </section>
        </div>
        <aside className="request-aside">
          <h2>Solicita una propuesta</h2>
          <p>
            Usaremos los datos de tu evento y te pediremos solo la información propia de{" "}
            {catName(provider.category).toLowerCase()}.
          </p>
          <button className="primary" onClick={() => go("event")}>
            Solicitar cotización
          </button>
          <button className="secondary" onClick={() => go("results")}>
            Volver a resultados
          </button>
        </aside>
      </div>
    </div>
  );
}

function Compare({
  ids,
  go,
  openProvider,
}: {
  ids: string[];
  go: (s: Screen) => void;
  openProvider: (id: string, target?: "profile" | "service") => void;
}) {
  const list = providers.filter((p) => ids.includes(p.id));
  return (
    <div className="product-page">
      <div className="breadcrumbs">
        <button onClick={() => go("results")}>Resultados</button>
        <span>/</span>
        <span>Comparación</span>
      </div>
      <div className="results-heading">
        <div>
          <h1>Compara {catName(list[0].category)}</h1>
          <p>
            Solo mostramos atributos equivalentes de esta categoría. El precio final depende de cada
            cotización.
          </p>
        </div>
      </div>
      <div className="comparison-table" role="table" aria-label="Comparación de servicios">
        <div className="comparison-labels" role="rowheader">
          <span>Empresa</span>
          <span>Precio desde</span>
          <span>Modalidad</span>
          <span>Capacidad / cobertura</span>
          <span>Valoración</span>
          <span>Incluidos principales</span>
          <span></span>
        </div>
        {list.map((p) => (
          <div className="comparison-column" key={p.id}>
            <strong>{p.company}</strong>
            <strong>{money(p.price)}</strong>
            <span>
              {p.unit}
              <small>{p.minimum}</small>
            </span>
            <span>
              {p.capacity}
              <small>{p.coverage}</small>
            </span>
            <span>
              ★ {p.rating} <small>{p.reviews} reseñas</small>
            </span>
            <ul>
              {p.included.slice(0, 3).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <button className="primary" onClick={() => openProvider(p.id, "service")}>
              Ver y cotizar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventRequest({
  provider,
  eventSaved,
  setEventSaved,
  go,
  notify,
}: {
  provider: (typeof providers)[number];
  eventSaved: boolean;
  setEventSaved: (v: boolean) => void;
  go: (s: Screen) => void;
  notify: (s: string) => void;
}) {
  const [step, setStep] = useState(eventSaved ? 2 : 1);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setEventSaved(true);
      setStep(2);
    } else {
      notify(`Solicitud enviada a ${provider.company}`);
      go("quotes");
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
            <div className="form-grid">
              <label>
                Tipo de evento
                <select defaultValue={demoEvent.type}>
                  <option>Cumpleaños</option>
                  <option>Matrimonio</option>
                  <option>Evento corporativo</option>
                </select>
              </label>
              <label>
                Nombre del evento
                <input defaultValue={demoEvent.name} required />
              </label>
              <label>
                Fecha
                <input type="date" defaultValue={demoEvent.date} required />
              </label>
              <label>
                Horario o duración
                <input defaultValue={demoEvent.time} required />
              </label>
              <label>
                Número de invitados
                <input type="number" defaultValue={demoEvent.guests} min="1" required />
              </label>
              <label>
                Ubicación
                <input defaultValue={demoEvent.location} required />
              </label>
              <label>
                Presupuesto opcional
                <input type="number" defaultValue={demoEvent.budget} />
              </label>
              <label>
                Necesidades de accesibilidad
                <input defaultValue={demoEvent.accessibility} />
              </label>
              <label className="full">
                Notas generales
                <textarea defaultValue={demoEvent.notes} />
              </label>
            </div>
            <button className="primary">Guardar y continuar</button>
          </>
        ) : (
          <>
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

function CategoryFields({ category }: { category: Category }) {
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

const quotes = [
  {
    code: "NX-SAL-1042",
    version: 2,
    provider: providers[0],
    status: "Lista para decidir",
    issued: "22 jul 2026",
    expires: "29 jul 2026",
    items: [
      ["Espacio y mobiliario", 1, "paquete", 4800],
      ["Sonido y pantalla", 1, "servicio", 650],
      ["Hora adicional", 1, "hora", 380],
    ],
    discount: -230,
    transport: 0,
    total: 5600,
    advance: 1680,
    schedule: [
      ["Adelanto", "Al aceptar", 1680],
      ["Segunda cuota", "19 ago 2026", 1960],
      ["Saldo", "12 sep 2026", 1960],
    ],
  },
  {
    code: "NX-CAT-2088",
    version: 1,
    provider: providers[2],
    status: "Aceptada",
    issued: "23 jul 2026",
    expires: "30 jul 2026",
    items: [
      ["Buffet celebración", 90, "persona", 98],
      ["Bar sin alcohol", 90, "persona", 14],
    ],
    discount: -540,
    transport: 180,
    total: 9720,
    advance: 2916,
    schedule: [
      ["Adelanto", "Pagado · 24 jul", 2916],
      ["Segunda cuota", "19 ago 2026", 3402],
      ["Saldo", "12 sep 2026", 3402],
    ],
  },
  {
    code: "NX-FOT-3154",
    version: 1,
    provider: providers[4],
    status: "Aceptada",
    issued: "24 jul 2026",
    expires: "31 jul 2026",
    items: [
      ["Historia completa", 1, "paquete", 3200],
      ["Dron", 1, "servicio", 450],
    ],
    discount: 0,
    transport: 0,
    total: 3650,
    advance: 1095,
    schedule: [
      ["Adelanto", "Pagado · 25 jul", 1095],
      ["Saldo", "12 sep 2026", 2555],
    ],
  },
];

function Quotes({
  go,
  code,
  navigate,
}: {
  go: (s: Screen) => void;
  code?: string;
  navigate: (code: string) => void;
}) {
  const index = Math.max(
    0,
    quotes.findIndex((quote) => quote.code === code),
  );
  const q = quotes[index];
  return (
    <div className="product-page quote-page">
      <div className="results-heading">
        <div>
          <h1>Cotizaciones de tu evento</h1>
          <p>{demoEvent.name} · Cada empresa envía y conserva su propia propuesta.</p>
        </div>
        <button className="secondary" onClick={() => go("myevent")}>
          Ver contratos aceptados
        </button>
      </div>
      <div className="quote-layout">
        <aside className="quote-list">
          {quotes.map((item, i) => (
            <button
              key={item.code}
              className={i === index ? "selected" : ""}
              onClick={() => navigate(item.code)}
            >
              <span>
                {item.provider.company}
                <small>
                  {item.code} · v{item.version}
                </small>
              </span>
              <strong>
                {money(item.total)}
                <small>{item.status}</small>
              </strong>
            </button>
          ))}
        </aside>
        <QuoteDocument quote={q} />
      </div>
    </div>
  );
}

function QuoteDocument({ quote: q }: { quote: (typeof quotes)[number] }) {
  return (
    <article className="quote-document">
      <header>
        <div>
          <span>Cotización detallada</span>
          <h2>
            {q.code} · versión {q.version}
          </h2>
          <p>
            {q.provider.company} · {q.provider.service}
          </p>
        </div>
        <span className="status-positive">{q.status}</span>
      </header>
      <dl className="quote-meta">
        <div>
          <dt>Cliente</dt>
          <dd>Andrea Salazar</dd>
        </div>
        <div>
          <dt>Evento</dt>
          <dd>{demoEvent.name}</dd>
        </div>
        <div>
          <dt>Emisión</dt>
          <dd>{q.issued}</dd>
        </div>
        <div>
          <dt>Vencimiento</dt>
          <dd>{q.expires}</dd>
        </div>
      </dl>
      <div className="line-items">
        <div className="line-head">
          <span>Concepto</span>
          <span>Cant.</span>
          <span>Unidad</span>
          <span>Precio unit.</span>
          <span>Subtotal</span>
        </div>
        {q.items.map(([name, qty, unit, price]) => (
          <div key={String(name)}>
            <strong>{name}</strong>
            <span>{qty}</span>
            <span>{unit}</span>
            <span>{money(Number(price))}</span>
            <strong>{money(Number(qty) * Number(price))}</strong>
          </div>
        ))}
      </div>
      <div className="quote-totals">
        <span>
          Descuento <strong>{money(q.discount)}</strong>
        </span>
        {q.transport > 0 && (
          <span>
            Transporte <strong>{money(q.transport)}</strong>
          </span>
        )}
        <span className="grand-total">
          Total final <strong>{money(q.total)}</strong>
        </span>
      </div>
      <div className="quote-notes">
        <div>
          <h3>Incluidos</h3>
          <p>{q.provider.included.join(" · ")}</p>
        </div>
        <div>
          <h3>No incluidos y condiciones</h3>
          <p>
            {q.provider.excluded.join(" · ")}. {q.provider.restrictions}
          </p>
        </div>
      </div>
      <section className="payment-plan">
        <div>
          <h3>Adelanto y calendario de pagos</h3>
          <p>
            Adelanto requerido: <strong>{money(q.advance)}</strong>
          </p>
        </div>
        {q.schedule.map(([name, date, amount]) => (
          <div key={String(name)}>
            <span>
              <strong>{name}</strong>
              <small>{date}</small>
            </span>
            <strong>{money(Number(amount))}</strong>
          </div>
        ))}
      </section>
      {q.status !== "Aceptada" && (
        <div className="document-actions">
          <button className="secondary">Rechazar propuesta</button>
          <button className="primary">Aceptar cotización demo</button>
        </div>
      )}
    </article>
  );
}

function MyEvent({ notify }: { notify: (s: string) => void }) {
  return (
    <div className="product-page">
      <header className="event-overview">
        <div>
          <span>Mi evento</span>
          <h1>{demoEvent.name}</h1>
          <p>
            {demoEvent.type} · 19 de septiembre de 2026 · {demoEvent.guests} invitados ·{" "}
            {demoEvent.location}
          </p>
        </div>
        <div>
          <span>Presupuesto de referencia</span>
          <strong>{money(demoEvent.budget)}</strong>
          <small>Contratado: {money(13370)}</small>
        </div>
      </header>
      <div className="event-summary">
        <div>
          <span>2 contratos independientes</span>
          <strong>{money(13370)}</strong>
          <small>Total contratado</small>
        </div>
        <div>
          <span>Pagado en adelantos</span>
          <strong>{money(4011)}</strong>
          <small>No incluye obligaciones futuras</small>
        </div>
        <div>
          <span>Próxima fecha</span>
          <strong>19 ago</strong>
          <small>Dos cuotas separadas</small>
        </div>
      </div>
      <div className="contract-list">
        {quotes
          .filter((q) => q.status === "Aceptada")
          .map((q) => {
            const paid = q.advance,
              balance = q.total - paid;
            return (
              <article key={q.code}>
                <header>
                  <div className="profile-mark small">
                    {q.provider.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span>Contrato de proveedor · {q.code}</span>
                    <h2>{q.provider.company}</h2>
                    <p>{q.provider.service}</p>
                  </div>
                  <span className="status-positive">Vigente · demo</span>
                </header>
                <div className="contract-numbers">
                  <div>
                    <span>Total</span>
                    <strong>{money(q.total)}</strong>
                  </div>
                  <div>
                    <span>Adelanto pagado</span>
                    <strong>{money(paid)}</strong>
                  </div>
                  <div>
                    <span>Saldo</span>
                    <strong>{money(balance)}</strong>
                  </div>
                  <div>
                    <span>Próxima cuota</span>
                    <strong>{money(Number(q.schedule[1]?.[2] ?? 0))}</strong>
                    <small>{q.schedule[1]?.[1]}</small>
                  </div>
                </div>
                <div className="simulation-breakdown">
                  <span>Simulación del próximo pago</span>
                  <div>
                    <span>
                      Pago del cliente <strong>{money(Number(q.schedule[1]?.[2] ?? 0))}</strong>
                    </span>
                    <span>
                      Comisión Nexo simulada{" "}
                      <strong>
                        - {money(Math.round(Number(q.schedule[1]?.[2] ?? 0) * 0.075))}
                      </strong>
                    </span>
                    <span>
                      Procesamiento simulado{" "}
                      <strong>
                        - {money(Math.round(Number(q.schedule[1]?.[2] ?? 0) * 0.029))}
                      </strong>
                    </span>
                    <span>
                      Neto estimado de empresa{" "}
                      <strong>{money(Math.round(Number(q.schedule[1]?.[2] ?? 0) * 0.896))}</strong>
                    </span>
                  </div>
                </div>
                <button
                  className="secondary"
                  onClick={() =>
                    notify(`Pago de ${q.provider.company} registrado solo como simulación`)
                  }
                >
                  Simular próxima cuota
                </button>
              </article>
            );
          })}
      </div>
      <p className="legal-demo">
        Nexo no procesa dinero en este prototipo. Cada obligación y calendario pertenece únicamente
        al contrato de la empresa indicada.
      </p>
    </div>
  );
}

function CompanyPanel({
  company,
  notify,
  navigate,
}: {
  company: (typeof providers)[number];
  notify: (s: string) => void;
  navigate: (path: string) => void;
}) {
  const ownQuote = quotes.find((q) => q.provider.id === company.id);
  const gross = ownQuote?.total ?? company.price,
    commission = Math.round(gross * 0.075),
    processing = Math.round(gross * 0.029),
    net = gross - commission - processing;
  return (
    <div className="company-shell">
      <aside className="company-nav">
        <div>
          <span>Área de empresa</span>
          <strong>{company.company}</strong>
        </div>
        {[
          ["Resumen", ""],
          ["Servicios y paquetes", "servicios"],
          ["Solicitudes", "solicitudes"],
          ["Editor de cotizaciones", "editor"],
          ["Cotizaciones enviadas", "cotizaciones"],
          ["Contratos y pagos", "contratos"],
          ["Portafolio y reseñas", "portafolio"],
        ].map(([label, path], i) => (
          <button
            key={label}
            className={i === 0 ? "current" : ""}
            onClick={() => navigate(`/panel/${company.id}${path ? `/${path}` : ""}`)}
          >
            {label}
          </button>
        ))}
        <p>
          Solo ves información de <strong>{company.company}</strong>.
        </p>
      </aside>
      <div className="company-content">
        <header id="company-0">
          <div>
            <span>Panel de empresa demo</span>
            <h1>Buenos días, {company.company}</h1>
            <p>
              Gestiona tus servicios y propuestas simuladas sin acceder a datos de otras empresas.
            </p>
          </div>
          <button className="secondary" onClick={() => notify("Datos demo actualizados")}>
            Actualizar datos
          </button>
        </header>
        <section className="company-metrics">
          <article>
            <span>Solicitudes por atender</span>
            <strong>2</strong>
            <small>Una vence hoy</small>
          </article>
          <article>
            <span>Bruto contratado</span>
            <strong>{money(gross)}</strong>
            <small>Contrato propio</small>
          </article>
          <article>
            <span>Comisión simulada</span>
            <strong>{money(commission)}</strong>
            <small>7.5% demo</small>
          </article>
          <article>
            <span>Neto estimado</span>
            <strong>{money(net)}</strong>
            <small>Después de comisión y procesamiento</small>
          </article>
        </section>
        <section className="company-section" id="company-1">
          <div className="section-heading">
            <div>
              <h2>Servicios y paquetes</h2>
              <p>Oferta visible para clientes de Nexo.</p>
            </div>
            <button className="secondary">Editar servicio</button>
          </div>
          <article className="service-admin">
            <div className="provider-thumb">
              <Image src={company.image} alt="" fill sizes="140px" />
            </div>
            <div>
              <span>{catName(company.category)}</span>
              <h3>{company.service}</h3>
              <p>
                {company.package} · Desde {money(company.price)} · {company.unit}
              </p>
            </div>
            <span className="status-positive">Publicado</span>
          </article>
        </section>
        <section className="company-section" id="company-2">
          <div className="section-heading">
            <div>
              <h2>Solicitudes recibidas</h2>
              <p>Datos generales y específicos para tu categoría.</p>
            </div>
          </div>
          <div className="company-table">
            <div>
              <span>Cliente y evento</span>
              <span>Fecha</span>
              <span>Servicio</span>
              <span>Estado</span>
              <span></span>
            </div>
            <div>
              <strong>
                Andrea Salazar<small>{demoEvent.name}</small>
              </strong>
              <span>19 sep 2026</span>
              <span>{company.service}</span>
              <span>Por cotizar</span>
              <button className="text-link" onClick={() => navigate(`/panel/${company.id}/editor`)}>
                Preparar
              </button>
            </div>
            <div>
              <strong>
                Carlos Méndez<small>Encuentro de equipo</small>
              </strong>
              <span>08 oct 2026</span>
              <span>{company.service}</span>
              <span>En revisión</span>
              <button className="text-link">Revisar</button>
            </div>
          </div>
        </section>
        <section className="company-section quote-editor" id="company-3">
          <div className="section-heading">
            <div>
              <h2>Editor de cotización</h2>
              <p>
                Borrador NX-{company.category.toUpperCase()}-4021 · basado en una solicitud
                recibida.
              </p>
            </div>
            <span className="status-neutral">Borrador</span>
          </div>
          <div className="editor-grid">
            <div className="line-editor">
              <div>
                <label>
                  Concepto
                  <input defaultValue={company.package} />
                </label>
                <label>
                  Cantidad
                  <input type="number" defaultValue={company.category === "catering" ? 90 : 1} />
                </label>
                <label>
                  Unidad
                  <input defaultValue={company.category === "catering" ? "persona" : "paquete"} />
                </label>
                <label>
                  Precio unitario
                  <input type="number" defaultValue={company.price} />
                </label>
              </div>
              <button className="text-link">+ Añadir línea</button>
            </div>
            <aside>
              <span>Total estimado</span>
              <strong>
                {money(company.category === "catering" ? company.price * 90 : company.price)}
              </strong>
              <label>
                Adelanto
                <input
                  type="number"
                  defaultValue={Math.round(
                    (company.category === "catering" ? company.price * 90 : company.price) * 0.3,
                  )}
                />
              </label>
              <label>
                Vencimiento
                <input type="date" defaultValue="2026-07-30" />
              </label>
              <button
                className="primary"
                onClick={() => notify("Cotización demo enviada a Andrea Salazar")}
              >
                Enviar cotización
              </button>
            </aside>
          </div>
        </section>
        <section className="company-section" id="company-4">
          <div className="section-heading">
            <div>
              <h2>Cotizaciones enviadas</h2>
              <p>Versiones y estados de tus propuestas.</p>
            </div>
          </div>
          <div className="company-table">
            <div>
              <span>Código</span>
              <span>Cliente</span>
              <span>Versión</span>
              <span>Total</span>
              <span>Estado</span>
            </div>
            <div>
              <strong>{ownQuote?.code ?? `NX-${company.category.toUpperCase()}-3901`}</strong>
              <span>Andrea Salazar</span>
              <span>v{ownQuote?.version ?? 1}</span>
              <span>{money(gross)}</span>
              <span>{ownQuote?.status ?? "Enviada"}</span>
            </div>
          </div>
        </section>
        <section className="company-section" id="company-5">
          <div className="section-heading">
            <div>
              <h2>Contrato y pagos simulados</h2>
              <p>Cada cifra corresponde únicamente a {company.company}.</p>
            </div>
          </div>
          <div className="finance-summary">
            <div>
              <span>Importe bruto</span>
              <strong>{money(gross)}</strong>
            </div>
            <div>
              <span>Comisión Nexo</span>
              <strong>- {money(commission)}</strong>
            </div>
            <div>
              <span>Procesamiento</span>
              <strong>- {money(processing)}</strong>
            </div>
            <div>
              <span>Neto de empresa</span>
              <strong>{money(net)}</strong>
            </div>
          </div>
        </section>
        <section className="company-section" id="company-6">
          <div className="section-heading">
            <div>
              <h2>Portafolio y reseñas</h2>
              <p>Tu contenido promocional se mantiene separado de la opinión de clientes.</p>
            </div>
          </div>
          <div className="admin-media">
            <div>
              <span>Portafolio promocional</span>
              <div className="portfolio-grid">
                {[company.image, "/images/landing/hero-event.png"].map((src, i) => (
                  <figure key={i}>
                    <div>
                      <Image src={src} alt="" fill sizes="250px" />
                    </div>
                    <figcaption>Contenido publicado por la empresa</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="reviews">
              <span>Reseñas de clientes</span>
              <article>
                <div className="review-avatar">AS</div>
                <div>
                  <strong>Andrea S. · ★ 5.0</strong>
                  <small>Reseña demo</small>
                  <p>Información clara y buena atención.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
