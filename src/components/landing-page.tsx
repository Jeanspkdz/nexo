import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const categories = [
  {
    name: "Espacios",
    image: "/images/landing/category-spaces.png",
    detail: "Salones, terrazas y espacios singulares",
  },
  {
    name: "Catering",
    image: "/images/landing/category-catering.png",
    detail: "Menús y experiencias gastronómicas",
  },
  {
    name: "Música",
    image: "/images/landing/category-music.png",
    detail: "Bandas, DJ y sonido profesional",
  },
  {
    name: "Fotografía",
    image: "/images/landing/category-photography.png",
    detail: "Fotografía y video para cada momento",
  },
  {
    name: "Decoración",
    image: "/images/landing/category-decoration.png",
    detail: "Ambientación, mobiliario e iluminación",
  },
];

export function LandingPage() {
  return (
    <div className="landing">
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <SiteHeader
        className="public-header"
        navigation={
          <div className="public-navigation">
            <a href="#explorar">Explorar</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#empresas">Para empresas</a>
          </div>
        }
        actions={
          <>
            <Link className="login-link" href="/login">
              Iniciar sesión
            </Link>
            <Link className="button button-coral button-small" href="/registro">
              Crear cuenta
            </Link>
          </>
        }
        mobileNavigation={
          <details className="mobile-menu">
            <summary aria-label="Abrir menú">
              <span></span>
              <span></span>
              <span></span>
            </summary>
            <nav aria-label="Navegación móvil">
              <a href="#explorar">Explorar</a>
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#empresas">Para empresas</a>
              <Link href="/login">Iniciar sesión</Link>
              <Link href="/registro">Crear cuenta</Link>
            </nav>
          </details>
        }
      />

      <main id="contenido">
        <section className="landing-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Los mejores proveedores para eventos memorables</h1>
            <p>
              Compara servicios, solicita cotizaciones claras y organiza cada compromiso desde un
              solo lugar.
            </p>
            <div className="hero-actions">
              <Link className="button button-coral" href="/registro/cliente">
                Organizar mi evento
              </Link>
              <a className="text-link" href="#empresas">
                Publicar mis servicios <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="company-prompt">
              <strong>¿Organizas eventos para una empresa?</strong>
              <br />
              También puedes coordinar a tu equipo y proveedores en Nexo.
            </p>
          </div>
          <div className="hero-media">
            <Image
              src="/images/landing/hero-event.png"
              alt="Personas conversando durante un evento nocturno en una terraza contemporánea"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 58vw"
            />
          </div>
          <form className="event-search" action="/explorar" method="get">
            <div className="search-tabs" aria-label="Tipo de búsqueda">
              <strong>Buscar servicios</strong>
              <span>Explora opciones para tu fecha</span>
            </div>
            <div className="search-fields">
              <label>
                <span>Ubicación</span>
                <select name="location" defaultValue="lima">
                  <option value="lima">Lima, Perú</option>
                  <option value="arequipa">Arequipa, Perú</option>
                  <option value="cusco">Cusco, Perú</option>
                </select>
              </label>
              <label>
                <span>Fecha del evento</span>
                <input name="date" type="date" />
              </label>
              <label>
                <span>Número de invitados</span>
                <input name="guests" type="number" min="1" max="2000" placeholder="Ej. 120" />
              </label>
              <button className="button button-coral" type="submit">
                Buscar proveedores
              </button>
            </div>
            <p className="search-note">
              <span aria-hidden="true">✓</span> Explorar y solicitar cotizaciones es gratis.
            </p>
          </form>
        </section>

        <section
          className="section categories-section"
          id="explorar"
          aria-labelledby="categories-title"
        >
          <div className="section-heading inline-heading">
            <div>
              <h2 id="categories-title">Empieza por lo que necesitas</h2>
              <p>Descubre empresas especializadas para cada parte de tu evento.</p>
            </div>
            <Link className="text-link" href="/explorar">
              Ver todos los servicios <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="category-rail">
            {categories.map((category) => (
              <Link className="category-tile" href="/explorar" key={category.name}>
                <Image src={category.image} alt="" fill sizes="(max-width: 680px) 78vw, 25vw" />
                <span>
                  <strong>{category.name}</strong>
                  <small>{category.detail}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="section process-section"
          id="como-funciona"
          aria-labelledby="process-title"
        >
          <div className="process-intro">
            <h2 id="process-title">Organizar con claridad cambia todo</h2>
            <p>
              Nexo convierte búsquedas, mensajes y documentos dispersos en un recorrido que puedes
              entender y controlar.
            </p>
          </div>
          <ol className="process-list">
            <li>
              <span>1</span>
              <div>
                <h3>Descubre y compara</h3>
                <p>
                  Filtra por categoría, fecha y ubicación. Revisa trabajos, capacidades y
                  condiciones.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Solicita cotizaciones claras</h3>
                <p>Recibe propuestas con servicios incluidos, vigencia, adelanto y precio total.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Contrata con control</h3>
                <p>
                  Combina especialistas sin perder de vista que cada empresa mantiene su propio
                  contrato y pago.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="section comparison-section" aria-labelledby="comparison-title">
          <div className="comparison-copy">
            <h2 id="comparison-title">No compares solo precios. Compara compromisos.</h2>
            <p>
              Entiende qué incluye cada propuesta, cuánto debes adelantar y qué condiciones acepta
              cada proveedor antes de decidir.
            </p>
            <Link className="text-link" href="/explorar">
              Probar el recorrido de cotización <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="quote-comparison" aria-label="Ejemplo de comparación de cotizaciones">
            <div className="quote-header">
              <div>
                <span>Cotizaciones recibidas</span>
                <strong>3 propuestas para tu evento</strong>
              </div>
              <span className="status-chip">Listas para comparar</span>
            </div>
            <div className="quote-row">
              <div>
                <strong>Salón Miraflores</strong>
                <small>Espacio y mobiliario</small>
              </div>
              <span>Disponible</span>
              <strong>S/ 4,800</strong>
            </div>
            <div className="quote-row">
              <div>
                <strong>Casa Barranco</strong>
                <small>Espacio, mobiliario y luces</small>
              </div>
              <span>Disponible</span>
              <strong>S/ 5,250</strong>
            </div>
            <div className="quote-row">
              <div>
                <strong>Terraza Central</strong>
                <small>Espacio y coordinación</small>
              </div>
              <span>Por confirmar</span>
              <strong>S/ 4,400</strong>
            </div>
            <div className="quote-footer">
              <span>Adelantos desde S/ 1,200</span>
              <span>Contratos independientes</span>
            </div>
          </div>
        </section>

        <section className="section provider-story" id="empresas" aria-labelledby="provider-title">
          <div className="provider-collage">
            <div className="collage-large">
              <Image
                src="/images/landing/category-catering.png"
                alt="Profesional de catering preparando un plato para un evento"
                fill
                sizes="(max-width: 760px) 100vw, 34vw"
              />
            </div>
            <div>
              <Image
                src="/images/landing/category-music.png"
                alt="Músicos actuando en un evento"
                fill
                sizes="(max-width: 760px) 50vw, 17vw"
              />
            </div>
            <div>
              <Image
                src="/images/landing/category-decoration.png"
                alt="Mesa preparada con una ambientación elegante"
                fill
                sizes="(max-width: 760px) 50vw, 17vw"
              />
            </div>
          </div>
          <div className="provider-copy">
            <h2 id="provider-title">Una vitrina clara para el trabajo que haces bien</h2>
            <p>
              Publica tus servicios, recibe solicitudes con la información necesaria y prepara
              propuestas profesionales sin conversaciones dispersas.
            </p>
            <ul>
              <li>Solicitudes relevantes para tu categoría</li>
              <li>Cotizaciones con precios y condiciones visibles</li>
              <li>Seguimiento de contratos y calendarios de pago</li>
            </ul>
            <Link className="button provider-cta" href="/registro/empresa">
              Registrar mi empresa
            </Link>
          </div>
        </section>

        <section className="trust-section" aria-labelledby="trust-title">
          <div>
            <h2 id="trust-title">Decisiones importantes, información transparente</h2>
            <p>
              Las promociones se identifican, los precios se explican y cada proveedor conserva sus
              propias condiciones.
            </p>
          </div>
          <div className="trust-points">
            <span>Proveedores identificados</span>
            <span>Cotizaciones desglosadas</span>
            <span>Pagos organizados por empresa</span>
          </div>
        </section>

        <section className="final-cta" id="registro" aria-labelledby="cta-title">
          <div className="connection-mark" aria-hidden="true">
            <span></span>
          </div>
          <h2 id="cta-title">Tu evento empieza con una buena conexión</h2>
          <p>Elige cómo quieres comenzar. Podrás cambiar de recorrido cuando lo necesites.</p>
          <div className="hero-actions centered-actions">
            <Link className="button button-coral" href="/registro/cliente">
              Comenzar como cliente
            </Link>
            <Link className="button button-light" href="/registro/empresa">
              Ofrecer mis servicios
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div>
          <Link className="landing-logo footer-logo" href="/">
            Nexo
          </Link>
          <p>Servicios y cotizaciones para organizar eventos con claridad.</p>
        </div>
        <nav aria-label="Enlaces del pie">
          <a href="#explorar">Categorías</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#empresas">Para empresas</a>
          <Link href="/explorar">Explorar</Link>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Nexo. Prototipo de producto.</p>
      </footer>
    </div>
  );
}
