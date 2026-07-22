# Información necesaria para la UI del marketplace de eventos de Nexo v0.2

Fecha de investigación: 21 de julio de 2026  
Alcance: prototipo v0.2; tipos de evento, categorías de proveedor, cotización detallada, pagos simulados, reseñas simples y portafolio.  
Método: consulta de documentación y superficies oficiales de WeddingWire, The Knot, Peerspace, Eventbrite y Stripe. No se usaron blogs secundarios.

## Resumen ejecutivo

La UI de Nexo no debe pedir todos los datos en un solo formulario. Necesita separar cuatro objetos:

1. **Evento del cliente:** ocasión, fecha, ubicación, invitados y necesidades generales.
2. **Servicio publicado:** categoría, modalidad de cobro, precio desde, capacidad, cobertura e incluidos.
3. **Solicitud y cotización:** cantidades concretas, conceptos, precios, total, vigencia y condiciones.
4. **Contrato y pagos:** un contrato y calendario independientes por proveedor.

WeddingWire y The Knot organizan la búsqueda por categorías de proveedores y muestran precio inicial, puntuación, cantidad de reseñas, ubicación, fotografías y una acción para solicitar precios. Peerspace agrega una lección clave: el precio debe explicar qué está incluido, los mínimos y los extras antes de reservar. Estas son evidencias externas. La estructura exacta propuesta para Nexo es una inferencia de producto para el prototipo.

## 1. Evidencia externa que condiciona la UI

### 1.1 Descubrimiento y comparación

- WeddingWire mantiene categorías separadas para locales, fotografía, catering, videografía, alquileres, transporte, DJ, bandas, música y decoración/iluminación. Esto respalda que Nexo clasifique **servicios**, aunque una empresa participe en varias categorías ([categorías oficiales de WeddingWire](https://vendorsupport.weddingwire.com/hc/en-us/articles/115003690523-Service-Categories-on-WeddingWire)).
- En sus resultados, WeddingWire muestra fotografías, nombre, ubicación, puntuación, número de reseñas, precio inicial, atributos del servicio y “Request pricing”. Por tanto, “precio desde” no reemplaza la cotización ([directorio oficial](https://www.weddingwire.com/wedding-vendors), [fotógrafos](https://www.weddingwire.com/wedding-photographers)).
- The Knot separa patrocinadores locales de sus categorías y presenta proveedores mejor valorados. Esto respalda bloques distintos para patrocinados y resultados orgánicos ([marketplace oficial de The Knot](https://www.theknot.com/marketplace/favors-martha)).
- WeddingWire ofrece búsqueda con reseñas, precios y disponibilidad, y conserva un portafolio visual separado de la ficha textual ([página oficial](https://www.weddingwire.com/)).

### 1.2 Precio transparente y unidades de cobro

- Peerspace usa tarifa base por hora, mínimo de horas y variaciones por actividad, asistentes, fecha y hora. También exige mostrar el desglose completo antes de confirmar ([precios del espacio](https://support.peerspace.com/en/articles/10119425-how-should-i-price-my-space), [cargos permitidos](https://support.peerspace.com/en/articles/10119132-what-can-hosts-charge-for)).
- Sus complementos pueden cobrarse por artículo, persona, hora o importe fijo, con cantidad máxima, impuesto y propina opcionales ([complementos oficiales](https://support.peerspace.com/en/articles/10119387-how-do-i-create-an-add-on)).
- Peerspace diferencia amenidades incluidas de extras. No permite presentar como extra una prestación básica ya anunciada como incluida. Esto respalda que Nexo muestre explícitamente **incluye**, **no incluye** y **extras** ([cargos permitidos](https://support.peerspace.com/en/articles/10119132-what-can-hosts-charge-for)).

### 1.3 Campos propios por categoría

- En locales, Peerspace registra tipo y tamaño del espacio, capacidad sentada/de pie, configuraciones, áreas utilizables, personal, A/V, mobiliario, accesibilidad, estacionamiento, reglas, montaje/desmontaje, restricciones y servicios adicionales ([guía oficial de listing para eventos](https://support.peerspace.com/en/articles/10119374-how-do-i-make-a-stronger-event-listing)).
- En catering, WeddingWire diferencia precio por persona para servicio emplatado, buffet, estaciones y bocaditos; incluidos como montaje, limpieza, servidores, degustación, vajilla, mantelería, cubiertos y cristalería; necesidades alimentarias, bar y servicios ([ficha oficial de proveedor](https://www.weddingwire.com/biz/cutting-edge-catering-events-shorewood/2ee4a51efeffdbf1.html)).
- En fotografía, WeddingWire expone horas adicionales, segundo fotógrafo, varias ubicaciones, viaje, sesión previa, video, imágenes de alta resolución, archivos digitales, materiales y estilo ([directorio](https://www.weddingwire.com/wedding-photographers), [ficha oficial](https://www.weddingwire.com/biz/affordable-wedding-photography/45c868bace0a0c5c.html)).
- En DJ y sonido, WeddingWire registra consulta, maestro de ceremonias, micrófonos, sistema de sonido, géneros, lista de canciones prohibidas, karaoke, proyección, fotocabina e iluminación ([ficha oficial](https://www.weddingwire.com/biz/nw-event-sound/c70ab13693dfef3d.html)).
- En alquileres aparecen entrega, instalación, limpieza, retiro, decoración e inventarios por artículos como mesas, sillas, textiles, carpas, iluminación y A/V ([directorio oficial](https://www.weddingwire.com/wedding-event-rentals), [guía de costos e inventario](https://www.weddingwire.com/cost/wedding-rentals)).
- En transporte, los resultados distinguen múltiples ubicaciones y tipos de vehículo como sedán, auto clásico, vehículo exótico, shuttle, limusina, van y autobús ([directorio oficial](https://www.weddingwire.com/wedding-limos)).

### 1.4 Tipos de evento

- Eventbrite modela por separado formato, categoría y subcategoría; su documentación usa conferencia, seminario y concierto como ejemplos de formato ([documentación oficial de eventos](https://www.eventbrite.com/platform/docs/events)).
- Peerspace enumera celebraciones y usos sociales/profesionales como cumpleaños, baby shower, boda, cena, networking, lanzamiento de producto, cóctel y evento benéfico ([categorías oficiales](https://support.peerspace.com/hc/en-us/articles/201549236-Which-of-the-listing-categories-should-I-list-my-space-under), [listings adicionales](https://support.peerspace.com/en/articles/10119349-how-do-i-add-a-listing-to-offer-my-space-for-other-activities)).

**Inferencia para Nexo:** “tipo de evento” describe la ocasión del cliente; “categoría de proveedor” describe lo que vende la empresa. Son filtros distintos y no deben compartir una sola taxonomía.

## 2. Tipos de evento recomendados para v0.2

La lista debe ser suficientemente amplia para probar distintos proveedores, pero corta para un prototipo.

| Grupo UI | Tipo inicial | Variantes visibles como chips opcionales |
|---|---|---|
| Bodas | Matrimonio | civil, religioso, recepción, íntimo |
| Celebraciones | Cumpleaños | infantil, adulto, temático |
| Celebraciones | Quinceañero | fiesta, ceremonia y fiesta |
| Celebraciones | Aniversario | pareja, familiar, empresarial |
| Familia | Baby shower | tradicional, revelación de género |
| Familia/religioso | Bautizo | ceremonia, recepción |
| Académico | Graduación | promoción, fiesta, ceremonia |
| Corporativo | Evento corporativo | conferencia, seminario, networking, lanzamiento, celebración empresarial |
| Genérico | Otro evento | nombre libre y breve descripción |

### Campos del evento del cliente

Obligatorios para alimentar comparación y cotización:

- tipo y variante de evento;
- nombre del evento;
- fecha; si no está definida, rango de fechas;
- hora de inicio y duración estimada;
- cantidad estimada de invitados;
- distrito/ciudad y dirección si ya existe;
- presupuesto total opcional;
- servicios que busca;
- notas generales y necesidades de accesibilidad.

No conviene pedir temática, menú o tipo de vehículo en este nivel: pertenecen a solicitudes específicas por categoría.

## 3. Categorías iniciales de proveedor

Las ocho categorías acordadas deben ser servicios independientes. Una empresa puede publicar uno o varios.

| Categoría | Subcategorías/filtros iniciales para la UI |
|---|---|
| Locales o salones | salón, jardín, hotel, restaurante, terraza, casa de campo, auditorio, espacio corporativo |
| Catering | buffet, emplatado, estaciones, bocaditos, bebidas/bar, brunch, menú infantil |
| Fotografía y video | fotografía, video, foto + video, dron, fotocabina |
| Decoración | flores, ambientación, iluminación decorativa, fondos/estructuras, decoración temática |
| Música, DJ y sonido | DJ, banda, solista/ensamble, sonido, iluminación, karaoke |
| Mobiliario y equipos | mesas/sillas, textiles, menaje, carpas, escenario, A/V, generadores |
| Entretenimiento | animador, show infantil, baile, magia, hora loca, performance |
| Transporte | novios/VIP, traslado de invitados, shuttle, van, bus, auto clásico/lujo |

## 4. Modelo común de publicación y precio desde

Cada servicio publicado necesita:

- nombre comercial del servicio;
- categoría y subcategoría;
- tipos de evento atendidos;
- descripción breve y completa;
- zonas de cobertura;
- fotos y videos del portafolio;
- modalidad: paquete o unidad;
- unidad de cobro: persona, hora, jornada, artículo, viaje, kilómetro, presentación o tarifa fija;
- precio unitario o precio del paquete;
- cantidad mínima contratable;
- cantidad/capacidad máxima, cuando corresponda;
- elementos incluidos;
- elementos no incluidos;
- extras disponibles;
- condiciones/restricciones;
- estado activo/inactivo.

### Regla recomendada del precio desde

- **Paquete:** menor precio de un paquete activo y realmente contratable.
- **Unidad:** precio unitario × cantidad mínima.
- La tarjeta puede mostrar también la unidad para evitar confusión: “Desde S/ 1,500 por paquete” o “S/ 50 por persona · mínimo 30 (desde S/ 1,500)”.
- El precio desde es orientativo; la cotización final es contractual.

## 5. Campos comunes de toda cotización

### Identificación y contexto

- código y versión de cotización;
- proveedor y servicio/categoría;
- cliente y evento asociados;
- fecha, horario, ubicación e invitados usados para cotizar;
- fecha de emisión y fecha/hora de vencimiento;
- estado: borrador, enviada, vista, aceptada, rechazada o vencida.

### Líneas económicas

Cada línea requiere:

- grupo/sección;
- concepto;
- descripción de alcance;
- cantidad;
- unidad;
- precio unitario;
- subtotal calculado;
- indicador incluido/opcional;
- observación.

Resumen:

- subtotal de servicios;
- extras;
- descuentos identificados;
- impuestos si corresponden;
- transporte/entrega/instalación si corresponden;
- total final;
- moneda PEN;
- incluidos, no incluidos y condiciones especiales.

### Condiciones contractuales visibles antes de aceptar

- adelanto requerido en porcentaje e importe;
- calendario completo de pagos;
- vigencia;
- condiciones de cambio de fecha, alcance y cantidad;
- política de cancelación y devolución;
- tiempo/condición de entrega cuando exista entregable;
- aceptación explícita del cliente.

**Recomendación UI:** presentar primero el total y las fechas clave, pero mantener el desglose completo desplegado; no esconder conceptos dentro de “otros”.

## 6. Campos específicos de cotización por categoría

Los siguientes campos son una **propuesta para Nexo derivada de las evidencias anteriores**. No son una copia literal de un formulario externo.

### 6.1 Locales o salones

**Solicitud del cliente**

- fecha, horario total y horas de montaje/desmontaje;
- invitados sentados y de pie;
- tipo de distribución: banquete, cóctel, teatro u otra;
- ceremonia y/o recepción;
- catering/bar externo requerido;
- estacionamiento y accesibilidad;
- A/V, escenario, cocina o áreas adicionales necesarias.

**Cotización**

- espacio/área alquilada y uso autorizado;
- modalidad: hora, jornada o paquete;
- horas incluidas, tarifa y mínimo;
- capacidad por configuración;
- mobiliario incluido con cantidades;
- A/V, iluminación, climatización, baños, cocina y Wi-Fi incluidos;
- personal del local, seguridad, limpieza y coordinador;
- montaje/desmontaje y hora extra;
- estacionamiento;
- depósito de garantía, si existe, separado del precio;
- restricciones: ruido, alcohol, proveedores externos, mascotas, decoración, seguros/permisos;
- áreas y servicios no incluidos.

### 6.2 Catering

**Solicitud del cliente**

- adultos, niños y personal/proveedores a alimentar;
- estilo: buffet, emplatado, estaciones, cóctel/bocaditos, brunch;
- número de tiempos;
- bebidas y bar;
- restricciones y alergias alimentarias;
- cocina disponible en local;
- menaje, mobiliario y personal requeridos.

**Cotización**

- menú/alternativa y platos incluidos;
- número de porciones × precio por persona;
- mínimo de comensales;
- menú infantil/proveedores con cantidad y tarifa;
- bebidas: unidades, consumo o paquete;
- bar, bartender y duración;
- mozos, chef y personal por cantidad/horas;
- degustación;
- vajilla, cristalería, cubiertos, mantelería y mesas/sillas;
- montaje, servicio, limpieza y recojo;
- transporte y recargos por ubicación;
- dieta/alergias atendidas;
- sobrantes y desperdicios: tratamiento acordado;
- incluidos y no incluidos.

### 6.3 Fotografía y video

**Solicitud del cliente**

- cobertura requerida: preparación, ceremonia, recepción u otras sesiones;
- horas y ubicaciones;
- fotografía, video o ambos;
- estilo preferido;
- entregables deseados y fecha necesaria;
- viaje/dron si corresponde.

**Cotización**

- paquete o horas de cobertura;
- número de fotógrafos y camarógrafos;
- hora adicional;
- múltiples ubicaciones y viaje;
- sesión previa/posterior;
- cantidad mínima/estimada de fotos editadas;
- resolución y formato de entrega;
- video: duración de resumen y película completa;
- dron, audio, iluminación y equipos;
- galería digital, USB, impresiones y álbum: cantidades/especificaciones;
- plazo de entrega;
- rondas de edición;
- derechos de uso/privacidad y conservación de archivos;
- gastos de viaje y alimentación;
- entregables no incluidos.

### 6.4 Decoración

**Solicitud del cliente**

- temática/estilo, colores y referencias;
- áreas: ceremonia, mesa principal, ingreso, mesas, pista, fotografías;
- invitados/mesas;
- flores naturales, artificiales o mixtas;
- restricciones del local y horarios de montaje.

**Cotización**

- diseño/conceptualización;
- flores y arreglos por tipo/cantidad;
- centros de mesa por cantidad;
- fondo, arco, estructura, letrero y mesa principal;
- textiles, accesorios y utilería;
- iluminación decorativa;
- transporte;
- personal y horas de montaje/desmontaje;
- alquiler versus venta de cada pieza;
- depósito de garantía/daños para piezas alquiladas;
- sustitución de flores/materiales;
- retiro y limpieza;
- representación visual/referencia adjunta;
- incluidos y no incluidos.

### 6.5 Música, DJ y sonido

**Solicitud del cliente**

- DJ, banda, solista o solo equipos/operación;
- segmentos: ceremonia, cóctel, recepción;
- duración y aforo;
- interior/exterior;
- géneros, canciones imprescindibles y prohibidas;
- maestro de ceremonias, karaoke, proyección o iluminación.

**Cotización**

- artista/DJ y número de integrantes;
- horas de actuación/servicio y descansos;
- ensayo/prueba de sonido;
- MC y consulta previa;
- sistema PA, consola, parlantes, subwoofer y monitores;
- micrófonos y cantidades;
- luces, proyector, pantalla, fotocabina y efectos;
- técnico/operador;
- montaje, desmontaje y transporte;
- hora adicional;
- necesidades eléctricas, espacio/escenario y camerino;
- repertorio o aprendizaje de canciones;
- plan de contingencia y reemplazo;
- incluidos y no incluidos.

### 6.6 Mobiliario y equipos

**Solicitud del cliente**

- artículo, estilo/modelo, cantidad y días/horas;
- fecha y ventanas de entrega/recojo;
- ubicación, piso/acceso y montaje;
- uso interior/exterior.

**Cotización**

- SKU/artículo y descripción;
- cantidad × precio por unidad o paquete;
- período de alquiler;
- mesas, sillas, textiles, menaje, carpas, escenario, A/V, generador u otros;
- colores, medidas y materiales;
- transporte, carga/descarga;
- instalación/desinstalación;
- personal técnico;
- consumibles/combustible;
- depósito de garantía;
- daños, faltantes y reposición;
- sustituciones por falta de inventario;
- limpieza y recojo;
- incluidos y no incluidos.

### 6.7 Entretenimiento

**Solicitud del cliente**

- tipo de show/actividad;
- público y rango de edad;
- cantidad de asistentes;
- duración y número de presentaciones;
- interior/exterior;
- interacción con invitados;
- restricciones culturales, de seguridad o de contenido.

**Cotización**

- artista/elenco y número de integrantes;
- descripción y duración del show;
- número de sets y pausas;
- animador/personajes/vestuario;
- utilería y materiales incluidos;
- equipos de audio, iluminación o escenario;
- montaje, ensayo y desmontaje;
- transporte y viáticos;
- requerimientos técnicos, espacio y camerino;
- personal de apoyo/seguridad;
- personalización y límites de contenido;
- plan de reemplazo/contingencia;
- incluidos y no incluidos.

### 6.8 Transporte

**Solicitud del cliente**

- finalidad: pareja/VIP o invitados;
- número de pasajeros;
- fecha y horario;
- puntos de origen, paradas y destino;
- viaje de ida, vuelta o disponibilidad por horas;
- equipaje y accesibilidad;
- tipo de vehículo preferido.

**Cotización**

- vehículo/clase/modelo;
- capacidad y cantidad de vehículos;
- conductor(es);
- recorrido, paradas y kilometraje incluido;
- modalidad: viaje, hora, distancia o paquete;
- horas de disponibilidad y espera;
- hora/km adicional;
- combustible, peajes y estacionamiento;
- decoración, bebidas u otros extras;
- accesibilidad y espacio de equipaje;
- coordinación y datos de contacto operativo;
- política por retraso y tiempo de gracia;
- vehículo de reemplazo/contingencia;
- incluidos y no incluidos.

## 7. Calendario de pagos y adelantos

### Evidencia externa

- Stripe Connect permite que una plataforma cobre al cliente, retenga una comisión y pague a cuentas conectadas. Para una operación con un proveedor usa, entre otros, destination charges; para distribuir un cobro entre varios proveedores ofrece separate charges and transfers ([guía de pagos de marketplace](https://docs.stripe.com/connect/marketplace/tasks/accept-payment), [destination charges](https://docs.stripe.com/connect/destination-charges), [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)).
- Stripe Invoicing reconoce pagos parciales, saldo restante y estados parcialmente pagado/pagado ([pagos parciales](https://docs.stripe.com/invoicing/partial-payments)).
- Sus planes de pago con depósito, importes/porcentajes, etiquetas y vencimientos están en acceso privado y actualmente no admiten application fees de Connect. No deben presentarse como integración disponible para Nexo ([payment plans](https://docs.stripe.com/invoicing/payment-plans)).
- Stripe no lista actualmente a Perú entre los países donde una empresa local abre una cuenta Stripe estándar. Por eso la v0.2 no debe afirmar que Stripe será su pasarela ([disponibilidad global](https://stripe.com/global)).

### Recomendación para el prototipo Nexo

Cada contrato de proveedor tendrá:

- total contractual actualizado;
- comisión total simulada de Nexo;
- adelanto en porcentaje e importe;
- cuotas con etiqueta, porcentaje/importe y fecha;
- validación de que adelanto + cuotas = total;
- monto pagado, saldo pendiente y próxima fecha;
- estados: pendiente, pagado, vencido, reembolsado y cancelado.

Cada pago mostrará al cliente:

- contrato/proveedor;
- concepto de cuota;
- vencimiento;
- importe;
- estado y fecha de pago;
- saldo posterior;
- comprobante simulado.

La empresa verá además:

- importe bruto de la cuota;
- comisión proporcional de Nexo;
- costo de procesamiento simulado, separado;
- neto para la empresa;
- estado del desembolso.

La comisión se calcula sobre el total actualizado y se recauda proporcionalmente: una cuota equivalente al 30 % del contrato recauda 30 % de la comisión. La última cuota absorbe diferencias de redondeo.

Si el cliente paga varios proveedores en una sola pantalla, la UI puede ofrecer una experiencia agrupada, pero debe conservar desglose, saldo y contrato independientes por empresa.

## 8. Reseñas simples y portafolio

### Evidencia externa

- WeddingWire muestra puntuación de 1 a 5, cantidad de reseñas, título/texto, autor y fecha; también ofrece dimensiones más complejas y respuestas empresariales ([ejemplo oficial de reseñas](https://www.weddingwire.com/reviews/reverend-roxanne-hunt-www-weddingsbyroxannehunt-com-los-angeles/5d81d1b887d93f0b.html)).
- Sus perfiles y directorios muestran galerías de fotografías de la empresa separadas de reseñas y fotos de usuarios ([directorio de fotógrafos](https://www.weddingwire.com/wedding-photographers), [ejemplo con fotos de usuarios](https://www.weddingwire.com/reviews/kellyman-photography-trenton/311ac9cde1ad7409.html)).

### Alcance exacto recomendado para v0.2

**Crear reseña**

- selección del proveedor;
- puntuación general de 1 a 5 estrellas;
- comentario escrito;
- botón publicar.

**Mostrar reseña**

- promedio general;
- cantidad de reseñas;
- estrellas, comentario, nombre/avatar simulado y fecha;
- lista ordenada por más recientes.

Para esta versión quedan fuera: verificación por contrato completado, respuesta empresarial, edición/moderación avanzada, historial de moderación, dimensiones por servicio y reseñas audiovisuales.

**Portafolio empresarial (no reseña)**

- foto o video/enlace;
- miniatura;
- título;
- descripción breve;
- categoría/servicio relacionado;
- tipo de evento relacionado;
- orden de presentación;
- estado publicado.

Los videos estilo TikTok pertenecen al portafolio promocional y deben identificarse como contenido de la empresa, nunca como reseña.

## 9. Información necesaria por pantalla

| Pantalla | Información mínima |
|---|---|
| Inicio | tipos de evento, patrocinados etiquetados, empresas mejor valoradas, categorías |
| Resultados | categoría, filtros del evento, empresa, portada, ubicación/cobertura, rating + conteo, precio desde, unidad/mínimo, patrocinado, comparar |
| Comparación | misma categoría; precio desde, modalidad, capacidad/cobertura, atributos estandarizados, rating, incluidos principales, CTA cotizar |
| Perfil de empresa | información empresarial, categorías/servicios, portafolio, rating/reseñas, precios desde, cobertura, CTA |
| Servicio | modalidad/unidad, mínimo/máximo, incluidos/no incluidos, paquetes, extras y restricciones |
| Solicitud de cotización | datos del evento + campos propios de la categoría |
| Cotización | versión, desglose completo, total, condiciones, adelanto/calendario y aceptar/rechazar |
| Mi evento | contratos separados por proveedor, estado de cotizaciones y resumen de pagos |
| Pagos | cronología por contrato, próxima cuota, pagado/saldo, estados y comprobantes simulados |
| Panel empresa | servicios/paquetes, solicitudes, editor de cotización, calendario, bruto/comisión/neto, portafolio y reseñas |

## 10. Orden recomendado de implementación UI

1. Modelo y selector de tipos de evento.
2. Catálogo de ocho categorías y tarjetas con precio desde.
3. Perfil/servicio y comparación dentro de una categoría.
4. Solicitud dinámica por categoría.
5. Editor y vista de cotización detallada.
6. Evento del cliente con contratos independientes.
7. Calendario y pagos simulados.
8. Portafolio, reseñas simples, patrocinados y mejor valorados.

## 11. Decisiones que esta investigación no resuelve

- porcentajes y límites de comisión;
- pasarela real disponible y apropiada para una plataforma constituida en Perú;
- tratamiento fiscal de precios e impuestos;
- texto legal de contratos, cancelaciones y devoluciones;
- fórmula futura de “mejor valoradas”;
- catálogo definitivo de campos tras validación con proveedores peruanos.

Para v0.2 estos elementos deben aparecer como datos simulados o reglas de prototipo, sin afirmar operación financiera real.
