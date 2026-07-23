# Registro de decisiones: plataforma de catering para Perú

**Fecha de consolidación:** 15 de julio de 2026  
**Estado:** dirección de mercado decidida; alcance del producto en definición  
**Objetivo de este documento:** conservar la trazabilidad desde la búsqueda de mercado hasta la elección de catering y la justificación del primer MVP.

## 1. Disciplina de evidencia

Este registro distingue cuatro niveles:

- **Evidencia:** dato de una entidad oficial peruana o función/precio publicado directamente por un proveedor.
- **Afirmación de proveedor:** capacidad comercial declarada por el fabricante; no es evidencia neutral de resultados.
- **Inferencia:** conclusión razonada a partir de la evidencia disponible.
- **Hipótesis:** afirmación que todavía necesita validación mediante uso, venta o información de clientes reales.

Una función no mencionada públicamente se considera **no verificada**, no necesariamente inexistente.

## 2. Punto de partida

La búsqueda comenzó con una pregunta amplia: identificar sectores peruanos con actividad creciente y problemas operativos que pudieran sostener un producto de automatización pagado mensualmente.

La primera investigación se concentró demasiado en reservas. Esa conclusión favorecía salones de belleza, pero fue reemplazada cuando el alcance se corrigió para considerar cualquier problema operativo. El informe estrecho se conserva como antecedente en [Peru booking-automation market](../research/peru-booking-automation-market.md), pero ya no determina la selección actual.

## 3. Investigación amplia de mercados

El análisis amplio estudió talleres automotrices, logística, construcción, clínicas, turismo, catering, distribución, belleza y restaurantes. La primera clasificación basada en crecimiento, valor del problema y facilidad aparente del MVP colocó a talleres automotrices en primer lugar.

Esa clasificación era una **hipótesis de oportunidad**, no una decisión final, porque todavía no examinaba con suficiente profundidad la saturación del software vertical. El detalle está en [Peru broad automation market](../research/peru-broad-automation-market.md).

## 4. Mercados finalistas investigados

Se profundizó en cinco sectores:

1. Catering para eventos.
2. Salones o locales de eventos.
3. Contratistas especializados de construcción.
4. Talleres automotrices.
5. Barberías.

Para cada sector se compararon productos, precios públicos, localización peruana, reservas, CRM, WhatsApp, cotizaciones, versiones, contratos, pagos, inventario, compras, operación, facturación, SUNAT, reportes, API e inteligencia artificial. La matriz completa está en [Peru five-sector software matrix](../research/peru-five-sector-software-matrix.md).

## 5. Resultado competitivo

Los puntajes siguientes son inferencias de la matriz, no estadísticas oficiales:

| Posición | Sector                     | Resultado | Razón principal                                                                        |
| -------: | -------------------------- | --------: | -------------------------------------------------------------------------------------- |
|        1 | Catering                   |   27.7/35 | Mejor equilibrio entre espacio local, comprador accesible y MVP diferenciable          |
|        2 | Salones de eventos         |   26.3/35 | Ticket atractivo y brecha de localización peruana, pero suites globales maduras        |
|        3 | Construcción especializada |   24.9/35 | Problema valioso, aunque requiere escoger un solo oficio y controlar mucha complejidad |
|        4 | Talleres automotrices      |   23.4/35 | Mercado activo, pero software peruano económico ya cubre gran parte del flujo          |
|        5 | Barberías                  |   23.3/35 | Fácil de prototipar, pero las funciones obvias ya son commodity                        |

### Por qué no barberías

AgendaPro, Fresha, AgendaYa, SQUIRE y Barberly ya ofrecen combinaciones de reservas, recordatorios, depósitos, caja, comisiones, inventario, marketing, fidelización, marketplace y hasta agentes de IA. AgendaYa publica una oferta peruana de aproximadamente S/69 mensuales. Una agenda genérica tendría diferenciación débil.

### Por qué no talleres automotrices

TallerPro, Mi Taller CRM, Appli-Car y AutoControl ya cubren clientes, vehículos, cotizaciones, órdenes de trabajo, inventario, caja, historial, recordatorios y, en productos locales, SUNAT y pagos peruanos. TallerPro publica planes desde S/149 más IGV y Mi Taller desde S/129.99. Construir otro ERP exigiría migración y competir con productos locales establecidos.

### Por qué no construcción como primer mercado

S10, Procore, Autodesk Construction Cloud y Jobber cubren presupuestos, proyectos, documentos, costos, campo y colaboración. Existe espacio entre microcontratistas, pero cada oficio tiene procesos distintos. Un MVP horizontal sería demasiado amplio; uno viable necesitaría seleccionar electricidad, climatización, metalmecánica u otra especialidad.

### Por qué salones de eventos queda en segundo lugar

Bisec, Event Temple, Perfect Venue, Planning Pod y Tripleseat ya cubren disponibilidad, propuestas, contratos, depósitos, recursos y ejecución. La localización peruana abre una posibilidad, pero el producto tendría que competir con suites maduras. El sector comparte con catering el motor comercial, por lo que queda como expansión adyacente posterior.

## 6. Decisión de mercado

**Decisión:** orientar el producto a empresas peruanas de catering para eventos.

El mercado inicial incluye:

- eventos corporativos;
- bodas;
- cumpleaños;
- quinceañeros;
- celebraciones y reuniones privadas;
- otros eventos con una cotización personalizada.

**Fuera del mercado inicial:** concesionarios de comedores y alimentación institucional recurrente para empresas, colegios, hospitales o minas. Esos negocios dependen de contratos continuos, raciones, nutrición, abastecimiento y logística diferentes.

## 7. Evidencia de que el mercado existe

El INEI reconoce la actividad como **suministro de comidas por encargo (catering)** dentro de sus informes de servicios. Su comportamiento mensual es volátil: registró periodos de expansión y también una contracción interanual en diciembre de 2025. Esto demuestra actividad económica real, pero no crecimiento uniforme para todas las empresas.

También existen empresas peruanas activas como Malva Eventos & Catering, Evaristo Catering, Tzabar, Isamara, Mayito Gourmet y Garva. Sus páginas muestran servicios corporativos y sociales, coffee breaks, buffet, bodas, concesiones y solicitudes de cotización.

La evidencia pública no determina cuántas empresas aceptarían pagar por el producto, cuánto trabajo manual tienen ni qué porcentaje vende principalmente por WhatsApp. Esos puntos siguen siendo hipótesis comerciales.

## 8. Software de catering investigado

| Producto            | Lo que resuelve principalmente                                    | Limitación relevante para la oportunidad peruana                             |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Caterease           | CRM, propuestas, menús, recetas, costos, producción y eventos     | No se confirmó SUNAT, pagos peruanos ni experiencia centrada en WhatsApp     |
| Curate              | Propuestas, contratos, inventario, compras, producción y márgenes | Precio personalizado; no se confirmó localización peruana                    |
| Total Party Planner | Operación integral, recetas, producción, personal y reportes      | WhatsApp, SUNAT y pagos locales no verificados                               |
| Cateree             | Captura de pedidos y solicitudes de catering por web              | Back office profundo y localización peruana no verificados                   |
| Bravazo             | POS, pedidos, inventario, producción y SUNAT en Perú              | Flujo profundo de propuestas versionadas y contratos no verificado           |
| Alegra              | Cotización, contabilidad, inventario, pagos y SUNAT               | No administra recetas, producción ni operación especializada de eventos      |
| Kommo               | CRM conversacional, WhatsApp, seguimiento y automatización        | No comprende menús, recetas, producción, inventario ni logística de catering |

## 9. Brecha identificada y corrección importante

No es correcto afirmar que las cotizaciones estén poco cubiertas globalmente. Caterease, Curate y otras suites ya incluyen propuestas, versiones, pagos y operación.

La conclusión respaldada por la investigación es más específica:

> No se encontró una herramienta que confirmara públicamente toda la combinación de WhatsApp, brief especializado de catering, propuesta versionada, aprobación, pagos peruanos, SUNAT y traspaso sencillo a la operación en un producto localizado y simple para una pyme peruana.

Esto representa un **espacio competitivo aparente**, no una prueba de que ningún proveedor lo ofrezca ni de que los clientes pagarán por resolverlo.

## 10. Visión completa del producto

La visión acordada no es limitarse permanentemente a cotizaciones. Es construir una plataforma robusta que gestione el negocio de catering desde la primera consulta hasta el cierre financiero del evento.

La visión completa incluye:

1. Captación y CRM.
2. Brief del evento.
3. Paquetes, menús y servicios adicionales.
4. Cotizaciones y control de versiones.
5. Aprobación, contrato y adelanto.
6. Conversión de la venta en evento operativo.
7. Menús, recetas, ingredientes y restricciones.
8. Costos y margen por evento.
9. Compras y proveedores.
10. Inventario, menaje y equipamiento.
11. Producción y listas de preparación/empaque.
12. Personal, transporte y logística.
13. Cambios de alcance.
14. Saldos, facturación, SUNAT y reportes.

## 11. Por qué el primer MVP comienza en el flujo comercial

**Decisión propuesta, pendiente de ratificación final:** comenzar con el tramo desde la consulta hasta el adelanto y dejar la administración completa como evolución del producto.

Razones:

- Es el tramo donde aparece la combinación de localización peruana menos confirmada por una sola herramienta.
- Puede coexistir con Alegra, Bravazo u otro sistema, reduciendo la barrera de migración.
- Permite medir resultados claros: tiempo para cotizar, propuestas enviadas, aceptaciones y adelantos.
- Evita construir simultáneamente recetas, inventario, compras, producción, personal, contabilidad y fiscalidad.
- Reduce el riesgo de competir frontalmente contra suites maduras antes de demostrar demanda.

Esto no reduce la visión robusta. Define la primera etapa de entrega.

## 12. Definición propuesta del MVP

### Problema

Las empresas pequeñas y medianas de catering para eventos reciben consultas incompletas, reconstruyen información desde conversaciones, generan múltiples versiones de una propuesta y persiguen manualmente aprobaciones y adelantos. La frecuencia y el costo de este problema en Perú todavía son hipótesis.

### Solución

Una aplicación en español que convierta una consulta en un brief estructurado, permita generar y versionar una cotización, registre la aprobación y el adelanto, y entregue el evento confirmado al proceso operativo o contable existente.

### Funciones iniciales

- captura de fecha, lugar, invitados, tipo de evento, menú, restricciones, presupuesto y servicios;
- pipeline de consultas;
- catálogo de paquetes y adicionales;
- cotización editable desde plantillas;
- versiones, vencimiento e historial de cambios;
- aprobación humana antes del envío;
- enlace de aceptación y evidencia;
- registro de adelanto por Yape, Plin o transferencia, sin custodiar dinero;
- recordatorios de decisión y saldo;
- PDF/CSV y resumen para facturación;
- métricas comerciales básicas.

### Fuera del primer MVP

- recetas e inventario universal;
- compras y proveedores;
- producción y packing;
- asignación de mozos y transporte;
- facturación SUNAT propia;
- pasarela de pagos propia;
- IA que determine precios;
- agentes de voz;
- marketplace;
- operación simultánea para salones de eventos.

## 13. Evolución propuesta

| Etapa | Alcance                                                            |
| ----: | ------------------------------------------------------------------ |
|     1 | Consulta, brief, cotización, versiones, aprobación y adelanto      |
|     2 | Planificación del evento, tareas y calendario operativo            |
|     3 | Menús, recetas, costeo y margen                                    |
|     4 | Compras, proveedores, inventario y equipamiento                    |
|     5 | Producción, packing, personal, transporte y ejecución              |
|     6 | Facturación, SUNAT, reportes financieros e integraciones profundas |

## 14. Cliente inicial propuesto

Empresa de catering para eventos en Lima que:

- atiende eventos sociales y/o corporativos;
- tiene entre 3 y 15 empleados;
- vende principalmente mediante conversaciones y propuestas personalizadas;
- utiliza WhatsApp, Word, Canva, PDF o Excel en su flujo comercial;
- ya resuelve su facturación con Alegra, Nubefact, Bravazo u otro proveedor;
- puede pagar por reducir trabajo manual y controlar mejor las propuestas.

Los rangos de volumen, ticket y disposición a pagar todavía no están confirmados.

## 15. Hipótesis comercial

- Piloto de 30 días: S/149–199 con configuración manual.
- Plan inicial: alrededor de S/249 mensuales.
- Plan de equipo: alrededor de S/399 mensuales.

Los precios son hipótesis de prueba. La investigación de competidores demuestra alternativas y posibles brechas, pero no demuestra disposición a pagar.

## 16. Decisiones confirmadas

- El mercado elegido es catering para eventos en Perú.
- El producto abarcará eventos corporativos y sociales.
- La alimentación institucional recurrente queda fuera del mercado inicial.
- La visión es una plataforma administrativa robusta, no una herramienta de reservas.
- Salones de eventos queda como mercado adyacente futuro.
- No se construirá un ERP genérico sin diferenciación peruana.

## 17. Decisiones pendientes

- Ratificar que la primera entrega será el flujo comercial y no toda la administración simultáneamente.
- Definir si WhatsApp será integración oficial en la primera entrega o un canal asistido inicialmente.
- Definir el modelo de paquetes, personalización y control de precios.
- Definir cómo se registra la aprobación, el contrato y el adelanto.
- Elegir la integración fiscal/contable inicial.
- Definir el límite entre evento vendido y evento operativo.
- Diseñar la expansión desde el MVP hacia recetas, inventario, producción y logística.

## 18. Fuentes internas

- [Investigación amplia de automatización en Perú](../research/peru-broad-automation-market.md)
- [Investigación de catering, talleres y construcción](../research/peru-catering-automotive-construction-tools.md)
- [Matriz inicial de software de tres sectores](../research/peru-three-sector-software-matrix.md)
- [Matriz competitiva de cinco sectores](../research/peru-five-sector-software-matrix.md)
- [Investigación inicial centrada en reservas](../research/peru-booking-automation-market.md)

## 19. Resumen de la decisión

Se eligió catering porque, entre los cinco sectores comparados en profundidad, ofreció el mejor equilibrio entre un comprador accesible, un problema comercial estructurado, competencia internacional poco localizada y una ruta de entrada que puede convivir con los sistemas contables existentes. La oportunidad no consiste en inventar cotizaciones ni copiar un ERP global. Consiste en ofrecer una experiencia peruana integrada y simple, comenzar por un tramo medible y evolucionar hacia la administración completa del catering.
