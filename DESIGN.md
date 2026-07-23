---
name: Nexo
description: Servicios y cotizaciones para organizar eventos con claridad.
colors:
  nexo-plum: "#532B52"
  nexo-plum-deep: "#241C25"
  action-coral: "#E45F4F"
  action-coral-deep: "#C94B40"
  neutral-white: "#FAFAFA"
  plum-surface: "#F2EFF2"
  plum-line: "#DED9DE"
  muted-ink: "#706570"
  success: "#28735A"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 5.6vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 3.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 650
    lineHeight: 1.15
rounded:
  control: "9px"
  surface: "12px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "clamp(72px, 8vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.action-coral}"
    textColor: "{colors.neutral-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.nexo-plum}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  search-field:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.nexo-plum-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
    height: "54px"
  status-positive:
    backgroundColor: "#E5F3EC"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 11px"
---

# Design System: Nexo

## Overview

**Creative North Star: "La celebración bien conectada"**

Nexo combina la emoción visual de un evento real con la tranquilidad de un proceso económico bien explicado. La fotografía abre la conversación; la jerarquía, los controles familiares y los desgloses concretos convierten esa inspiración en una decisión segura.

La experiencia es elegante, serena y cercana. La composición admite asimetría y superposición cuando explican una relación —como el buscador sobre la fotografía—, pero nunca añade decoración que compita con la tarea. En producto, la identidad se vuelve más contenida y la claridad gana siempre.

Nexo no parece una plataforma dedicada únicamente a matrimonios, un directorio saturado de anuncios, una aplicación bancaria fría, una colección de tarjetas genéricas sin jerarquía ni una interfaz infantil por tratarse de celebraciones.

**Key Characteristics:**

- Fotografía editorial de eventos diversos, sofisticados y alcanzables.
- Ciruela como identidad; coral escaso para acciones decisivas.
- Titulares serif expresivos y controles sans familiares.
- Información económica explícita, legible y contextual.
- Superficies planas con profundidad reservada para elementos realmente flotantes.

## Colors

La paleta transmite confianza sin recurrir al azul corporativo ni al verde como identidad principal.

### Primary

- **Ciruela Nexo:** identidad, titulares, superficies de cierre y selección activa. Debe sentirse sobria, no nocturna por defecto.
- **Ciruela Profunda:** texto principal y fondos de alto contraste.

### Secondary

- **Coral de Encuentro:** llamadas a la acción, foco y momentos de avance. Nunca se usa como relleno decorativo masivo.
- **Coral Profundo:** estado hover y active de acciones primarias.

### Neutral

- **Blanco Neutro:** fondo principal. No se tiñe hacia crema, arena o pergamino.
- **Superficie Ciruela:** separación tonal sutil de secciones y controles.
- **Línea Ciruela:** bordes de baja elevación y divisores.
- **Tinta Atenuada:** texto secundario que conserva contraste AA.
- **Verde de Confirmación:** únicamente éxito, disponibilidad y estados positivos.

**The Coral Rarity Rule.** El coral ocupa menos del 10% de una pantalla y señala una acción o transición importante.

**The Semantic Green Rule.** El verde nunca representa la marca; siempre comunica un estado positivo verificable.

## Typography

**Display Font:** Georgia (con Times New Roman y serif como fallback)

**Body Font:** Segoe UI (con system-ui y sans-serif como fallback)

**Character:** La serif aporta presencia editorial a la superficie pública. La sans mantiene navegación, formularios, precios y estados silenciosos y predecibles.

### Hierarchy

- **Display** (400, escala fluida hasta 5.6rem, línea 0.98): reservado para el mensaje principal de la landing.
- **Headline** (400, escala fluida hasta 3.5rem, línea 1.08): títulos de sección y cierres editoriales.
- **Title** (600, 1.18rem, línea 1.3): títulos de pasos, filas y componentes de producto.
- **Body** (400, 1rem, línea 1.55): explicación y lectura continua, limitada a 65–75 caracteres cuando sea prosa.
- **Label** (650, 0.85rem, línea 1.15): botones, navegación, campos y metadatos funcionales.

**The Two-Voice Rule.** La serif habla de la promesa; la sans explica cómo cumplirla. Nunca uses la serif en controles, precios o estados.

**The Tightness Floor.** Ningún titular usa un espaciado menor que -0.04em.

## Elevation

El sistema es plano por defecto. La profundidad se expresa con contraste tonal y orden espacial; las sombras aparecen solamente cuando un elemento flota de verdad sobre otro, como el buscador del hero o el menú móvil.

### Shadow Vocabulary

- **Flotación funcional** (`0 8px 8px rgba(36, 28, 37, 0.16)`): buscadores, menús y paneles superpuestos.
- **Respuesta interactiva** (`0 4px 8px rgba(36, 28, 37, 0.10)`): elevación breve durante hover cuando el movimiento mejora la affordance.

**The Flat-by-Default Rule.** Una sección o tarjeta está plana en reposo. Si un borde y una sombra ancha aparecen juntos como decoración, la superficie está mal diseñada.

## Components

### Buttons

- **Shape:** rectángulo suavemente redondeado, nunca una cápsula (9px).
- **Primary:** coral con texto blanco, altura mínima de 48px y peso semibold.
- **Hover / Focus:** coral más profundo en hover; anillo coral de 3px con separación de 3px para teclado.
- **Secondary:** fondo transparente, borde ciruela completo de 1px y texto ciruela; se invierte a ciruela en hover.

### Chips

- **Style:** cápsulas reservadas para estados breves, con fondo tonal y texto del mismo significado semántico.
- **State:** siempre contienen texto; el color nunca es el único indicador.

### Cards / Containers

- **Corner Style:** moderado y constante (12px máximo en la landing).
- **Background:** blanco neutro o superficie ciruela.
- **Shadow Strategy:** plana en reposo; sombra solo si existe superposición real.
- **Border:** perímetro completo de 1px en Línea Ciruela.
- **Internal Padding:** de 16px a 24px según densidad.

### Inputs / Fields

- **Style:** etiqueta visible, fondo blanco, perímetro completo de 1px y radio de 9px.
- **Focus:** anillo coral de alto contraste y borde ciruela; nunca se elimina el outline sin reemplazo.
- **Error / Disabled:** mensaje textual conectado mediante `aria-describedby`; el estado no depende únicamente del color.

### Navigation

La navegación usa sans-serif, altura táctil mínima de 44px y enlaces directos. En móvil se condensa en un control de menú estándar y conserva las rutas de cliente y empresa.

### Category Tile

La fotografía ocupa la superficie. Un degradado oscuro únicamente mejora la legibilidad del nombre y la descripción; no funciona como adorno. Las categorías forman un carril horizontal en pantallas estrechas.

## Do's and Don'ts

### Do:

- **Do** priorizar la decisión antes que la decoración.
- **Do** usar fotografías editoriales de eventos diversos, proveedores trabajando y espacios reales.
- **Do** explicar precios desde, adelantos, cuotas, comisiones y saldos con contexto.
- **Do** mantener separados los contratos y pagos de cada empresa aunque el evento se presente como una experiencia unificada.
- **Do** identificar claramente el contenido patrocinado y separarlo de reseñas y ordenamiento orgánico.
- **Do** ofrecer contraste WCAG 2.2 AA, foco visible, etiquetas persistentes y movimiento reducido.

### Don't:

- **Don't** hacer que Nexo parezca una plataforma dedicada únicamente a matrimonios.
- **Don't** convertir la interfaz en un directorio saturado de anuncios.
- **Don't** adoptar la frialdad visual de una aplicación bancaria.
- **Don't** presentar una colección de tarjetas genéricas sin jerarquía.
- **Don't** usar una interfaz infantil por tratarse de celebraciones.
- **Don't** utilizar fondos crema, arena, pergamino o beige como sustituto automático de elegancia.
- **Don't** usar texto con degradado, glassmorphism decorativo, hero metrics, rayas laterales de color ni radios de 32px en tarjetas.
- **Don't** repetir cejas diminutas en mayúsculas o marcadores 01/02/03 fuera de una secuencia real.
- **Don't** usar verde como color de marca ni coral como relleno decorativo.
