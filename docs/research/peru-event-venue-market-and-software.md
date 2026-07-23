# Mercado y software para salones de eventos en Peru

**Fecha de corte:** 15 de julio de 2026  
**Objeto:** salones de recepciones y locales fisicos que alquilan y administran espacios para bodas, quinceaneros, cumpleanos, eventos corporativos, conferencias y celebraciones.

## Resumen ejecutivo

El mercado peruano de salones de eventos **existe y es formalmente reconocible**, pero no encontre una serie nacional oficial que aisle sus ventas, cantidad de empresas o crecimiento anual. INEI clasifica la organizacion de convenciones y ferias en CIIU 8230, mientras que las licencias municipales usan giros como salon de eventos, salon de recepciones, restaurante o actividades combinadas. Esa fragmentacion impide afirmar honestamente que “salones de eventos crecio X% en 2025 o 2026”. La conclusion correcta es: **mercado real, fragmentado y solo respaldado por proxies; crecimiento no demostrado. Confianza media-baja sobre crecimiento, alta sobre existencia y actividad.**

La oportunidad de software es mas estrecha de lo que parecia. [Bisec](https://mibisec.com/) ya ofrece en espanol clientes, cotizaciones, reservas por salon, anticipos, gastos, compras, proveedores, contratos, reportes y multisede, con plan gratuito y Premium desde US$35.99/mes. Event Temple, Perfect Venue, Planning Pod, Tripleseat y EventPro tambien cubren gran parte del ciclo comercial y operativo. Por tanto, **no conviene construir otra suite generica de administracion de salones**.

El espacio mas defendible que no encontre reunido en una sola oferta es:

> convertir un evento confirmado en necesidades operativas y cubrirlas mediante una red privada de mozos, bartenders y proveedores locales, con disponibilidad, aceptacion, reemplazos, costos y trazabilidad; integrado gradualmente con mensajeria, pagos peruanos y SUNAT.

Este espacio es una **inferencia competitiva**, no demanda validada. Tambien aumenta mucho la complejidad y el riesgo legal/operativo frente al MVP de catering. Mi veredicto es **no hacer un pivot total todavia**: probar el wedge de coordinacion privada como extension de un flujo de eventos, sin construir primero todo el ERP ni un marketplace publico.

## 1. Definicion y limites

### Incluido

- propietarios u operadores de espacios fisicos alquilados por fecha y franja horaria;
- salones independientes, centros de recepciones y venues con uno o varios ambientes;
- bodas, quinceaneros, cumpleanos, graduaciones, reuniones corporativas y conferencias;
- venta de paquetes que pueden incluir catering, mobiliario, decoracion, sonido y personal.

### No es el mismo mercado

- **event planners:** coordinan eventos en locales propios o ajenos;
- **caterings:** producen y entregan alimentos, con o sin local;
- **hoteles/restaurantes:** pueden vender eventos, pero su economia principal incluye alojamiento o restauracion;
- **ticketing:** vende entradas para espectaculos, no alquiler privado del espacio;
- **centros institucionales:** universidades, municipalidades o clubes pueden alquilar ambientes, pero compran y operan de otra manera.

Un negocio puede ocupar varias categorias. Esto explica por que las estadisticas no aislan limpiamente “salones de eventos”.

## 2. Evidencia del mercado peruano

### 2.1 Lo que esta probado

| Evidencia                                                                                                                                                                                                                    | Que demuestra                                                | Que no demuestra                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| INEI reconoce la clase [CIIU 8230, organizacion de convenciones y ferias](https://proyectos.inei.gob.pe/iinei/srienaho/Descarga/DocumentosMetodologicos/2011-105/Agenda/Clasificador_Industrial_Inter_Uniforme.pdf)          | Existe una actividad economica relacionada                   | No aisla alquiler de salones sociales                              |
| Huancayo otorgo en 2025 ITSE de riesgo muy alto a Royal Riviera, salon de recepciones de 807.43 m2 y aforo 389 ([resolucion](https://www.gob.pe/institucion/munihuancayo/normas-legales/7686350-3214-2025-mph-gsc))          | Operadores formales existen fuera de Lima                    | No permite contar el mercado nacional                              |
| Independencia-Huaraz emitio en marzo de 2026 una resolucion para un giro de salon de eventos de 407 m2 ([resolucion](https://www.gob.pe/institucion/muniindependencia-huaraz/normas-legales/7939852-000053-2026-gdes-sgdet)) | Actividad y licenciamiento continuan en 2026                 | No prueba crecimiento                                              |
| La Municipalidad de Lima publica licencias 2020-2025 con RUC, riesgo, area y distrito ([dataset](https://www.datosabiertos.gob.pe/dataset/licencias-de-funcionamiento-otorgadas-2020-2024/resource/d14f3965-ff22-4c66-906d)) | Hay fuentes locales potenciales para contar establecimientos | El dataset descrito no ofrece una serie nacional homogena por giro |
| En Tacna se clausuro temporalmente en 2025 un giro “salon de eventos” ([resolucion](https://www.gob.pe/institucion/municiudadnueva/normas-legales/7004912-029-sgdeclycs-gdes-mdcn-t))                                        | El giro esta sujeto a fiscalizacion real                     | Las clausuras no son indicador de demanda                          |

### 2.2 Crecimiento 2025-2026

**No verificable directamente.** No encontre una serie de INEI, SUNAT o un registro nacional que mida exclusivamente ingresos, aperturas o ventas de salones de eventos durante 2025 y 2026.

Existen proxies, pero no deben convertirse en una tasa del sector:

- INEI reporto que alojamiento y restaurantes crecio 4.28% en diciembre de 2025 y menciona buffets, banquetes, conferencias y convenciones dentro de actividades relacionadas; esto mezcla restaurantes, catering y alojamiento, no salones independientes ([Produccion Nacional, diciembre 2025](https://www1.inei.gob.pe/media/MenuRecursivo/boletines/02-informe-tecnico-produccion-nacional-diciembre-2025.pdf)).
- Las resoluciones municipales de 2025 y 2026 prueban operacion formal reciente, pero no una tendencia nacional.
- Bodas, cumpleanos, quinceaneros y eventos corporativos crean demanda recurrente; no encontre datos oficiales 2024-2026 suficientes para cuantificar cuantos se realizan en venues comerciales.

**Clasificacion:** mercado real, fragmentado, estacional y no medido directamente.  
**Confianza en que esta creciendo:** media-baja.  
**Confianza en que existe una base de compradores alcanzable:** media-alta.

### 2.3 Digitalizacion relevante

- En Erestel 2025, 68.6% de los peruanos uso plataformas de mensajeria instantanea y, entre esos usuarios, 98.6% uso WhatsApp ([OSIPTEL, junio 2026](https://www.osiptel.gob.pe/portal-del-usuario/noticias/erestel-2025-cu%C3%A1les-son-las-herramientas-y-servicios-digitales-que-m%C3%A1s-usan-los-peruanos/)). Esto respalda WhatsApp como canal natural; **no respalda Telegram como canal principal**.
- El BCRP reporta para 2025 un promedio mensual de 728 millones de transferencias intrabancarias Yape y 8 millones Plin, ademas de transferencias interbancarias ([Reporte de Pagos, marzo 2026](https://www.bcrp.gob.pe/docs/Publicaciones/reporte-del-sistema-nacional-de-pagos/2026/marzo/rspf-marzo-2026.pdf)). Esto respalda registrar o integrar pagos locales, pero no implica que exista una API abierta de conciliacion para cualquier comercio.

## 3. Modelo operativo del salon

Flujo tipico inferido de las funciones que venden los proveedores y de los requisitos del negocio:

1. consulta por redes, mensajeria, telefono o referido;
2. captura de fecha, invitados, tipo de evento y presupuesto;
3. comprobacion de disponibilidad y, a menudo, visita al local;
4. propuesta de espacio, paquetes y adicionales;
5. cambios, contrato, separacion/adelanto y calendario de saldos;
6. evento confirmado;
7. plan de montaje, mobiliario, catering, personal y proveedores;
8. ejecucion, cierre, saldo y seguimiento.

### Ingresos y estacionalidad

- alquiler del espacio;
- paquetes por invitado o por evento;
- margen o comision en catering, decoracion, sonido, mobiliario y personal;
- horas adicionales, limpieza, seguridad y otros cargos.

La estacionalidad por fines de semana, temporadas de bodas, graduaciones y fiestas es una **inferencia razonable**, no una serie peruana verificada en este estudio.

### Dolores probables

- fechas bloqueadas o dobles reservas;
- cotizaciones y contratos en archivos separados;
- cambios de alcance sin trazabilidad;
- anticipos y saldos conciliados manualmente;
- conversion de lo vendido en tareas y recursos;
- disponibilidad y cancelacion de personal eventual;
- coordinacion de multiples proveedores;
- costos reales y margen conocidos demasiado tarde;
- licencias, aforo, ruido y seguridad.

Los dolores son hipotesis respaldadas por las categorias funcionales del software existente; su frecuencia e impacto en Peru no estan medidos.

## 4. Restricciones legales y operativas

- El operador requiere licencia municipal y evaluacion de riesgo. Para establecimientos de riesgo alto o muy alto, la PCM indica ITSE previa y renovacion del certificado cada dos anos ([tramite oficial](https://www.gob.pe/22386-solicitar-licencia-de-funcionamiento-para-cesionarios-de-edificaciones-con-nivel-de-riesgo-alto-o-muy-alto?child=25769)).
- Para espectaculos de mas de 3,000 personas existe ECSE y evaluacion municipal de instalaciones temporales y control de multitudes ([PCM](https://www.gob.pe/22631-solicitar-la-evaluacion-de-condiciones-de-seguridad-en-espectaculos-ecse-de-mas-de-3000-personas?child=24023)).
- Algunas ordenanzas exigen aislamiento acustico para salones de eventos; una ordenanza de 2026 lo explicita para ese giro ([El Peruano](https://cdn.www.gob.pe/uploads/document/file/9976525/8136995-ordenanza-n-027-2025-mpp%282%29.pdf)).
- Un marketplace laboral agrega identidad, seguridad, pagos, cancelaciones, responsabilidad y posible clasificacion laboral. Este informe no concluye el modelo juridico: debe revisarse antes de intermediar pagos o imponer condiciones de trabajo.

## 5. Categorias de software

| Categoria            | Funcion                                             |
| -------------------- | --------------------------------------------------- |
| Venue CRM/ventas     | leads, pipeline, tours, seguimiento                 |
| Disponibilidad       | salones, franjas, holds, reservas y conflictos      |
| Propuestas/contratos | paquetes, versiones, firma y vencimientos           |
| Cobros               | adelanto, calendario de pagos, saldo y conciliacion |
| BEO/orden de evento  | especificacion operativa de lo vendido              |
| Floorplan/seating    | planos, mesas, capacidad y asientos                 |
| Recursos             | mobiliario, equipos y espacios                      |
| Personal/tareas      | turnos, responsables, checklists                    |
| Proveedores          | contactos, compras, costos y documentos             |
| Catering             | menus, paquetes, BEO y necesidades alimentarias     |
| Fiscal               | facturacion, contabilidad y SUNAT                   |
| Conversacional       | WhatsApp, Telegram, bots y automatizacion           |
| Plataforma           | multi-local, permisos, reportes, API e IA           |

## 6. Matriz de software

**Leyenda:** ✓ verificado; △ parcial, add-on o integracion; — explicitamente fuera del producto; ? no verificado publicamente. “?” no significa que no exista. Las capacidades son afirmaciones del proveedor.

### 6.1 Producto, localizacion y precio

| Producto                                                                                             | Objetivo                  | ES  |     Peru     | Nube/movil | Precio publico al 15-07-2026                   | Trial/demo |
| ---------------------------------------------------------------------------------------------------- | ------------------------- | :-: | :----------: | :--------: | ---------------------------------------------- | ---------- |
| [Bisec](https://mibisec.com/)                                                                        | Salones/eventos SMB       |  ✓  | △ acceso web |    ✓/△     | Gratis limitado; Premium desde US$35.99/mes    | registro   |
| [Event Temple](https://www.eventtemple.com/)                                                         | Hoteles y venues          |  ?  |   △ global   |    ✓/△     | cotizacion anual                               | demo/trial |
| [Perfect Venue](https://www.perfectvenue.com/pricing)                                                | Venues SMB                |  ?  |    △ web     |    ✓/△     | gratis; desde US$59/mes anual o US$139 mensual | 14 dias    |
| [Planning Pod](https://planningpod.com/platform)                                                     | Venue/event suite         |  ?  |    △ web     |    ✓/✓     | tipicamente US$199-319/mes por local           | demo       |
| [Tripleseat](https://tripleseat.com/products/venues/)                                                | Hospitality/venues        |  ?  |   △ global   |    ✓/✓     | cotizacion                                     | demo       |
| [EventPro](https://www.eventpro-planner.com/)                                                        | Venue y eventos complejos |  ?  |    △ web     |    ✓/△     | cotizacion                                     | demo       |
| [Skedda](https://www.skedda.com/pricing)                                                             | Reserva de espacios       |  ?  |    △ web     |    ✓/✓     | Plus aprox. US$249/mes por espacio             | trial/demo |
| [Momentus Priava](https://infohub.gomomentus.com/hubfs/Sale%20Sheets/Momentus-PRIAVA-Sell-Sheet.pdf) | Recintos grandes          |  ?  |   △ global   |    ✓/△     | cotizacion                                     | demo       |
| [Odoo](https://www.odoo.com/pricing)                                                                 | ERP configurable          |  ✓  |  ✓ partners  |    ✓/✓     | una app gratis; suite por usuario              | trial      |
| [Alegra Peru](https://www.alegra.com/peru/contabilidad/precios/)                                     | Fiscal/contable           |  ✓  |      ✓       |    ✓/✓     | por plan; 15 dias gratis                       | trial      |
| [Kommo](https://www.kommo.com/es/precios/comparar-planes/)                                           | CRM conversacional        |  ✓  |    △ web     |    ✓/✓     | US$15/25/45 usuario/mes; minimo 6 meses        | 14 dias    |

### 6.2 Venta, espacio y contratacion

| Producto      | CRM | Formulario | Disponibilidad | Tours | Propuesta/versiones | Follow-up | Contrato/firma | Deposito/pagos |
| ------------- | :-: | :--------: | :------------: | :---: | :-----------------: | :-------: | :------------: | :------------: |
| Bisec         |  ✓  |     △      |       ✓        |   △   |          ✓          |     △     |      ✓/?       |       ✓        |
| Event Temple  |  ✓  |     ✓      |       ✓        |   ✓   |          ✓          |     ✓     |       ✓        |       ✓        |
| Perfect Venue |  ✓  |     ✓      |       ✓        |   △   |          ✓          |     ✓     |       ✓        |       ✓        |
| Planning Pod  |  ✓  |     ✓      |       ✓        |   ✓   |          ✓          |     ✓     |       ✓        |       ✓        |
| Tripleseat    |  ✓  |     ✓      |       ✓        |   ✓   |          ✓          |     ✓     |       ✓        |       ✓        |
| EventPro      |  ✓  |     △      |       ✓        |   △   |          ✓          |     ✓     |       ✓        |       ✓        |
| Skedda        |  △  |     ✓      |       ✓        |   —   |          —          |     △     |       —        |       ✓        |
| Priava        |  ✓  |     △      |       ✓        |   △   |          ✓          |     △     |       ✓        |       ✓        |
| Odoo          |  ✓  |     ✓      |       ✓        |   ✓   |          ✓          |     ✓     |       ✓        |       ✓        |
| Alegra        |  △  |     △      |       ?        |   —   |          ✓          |     △     |       △        |       ✓        |
| Kommo         |  ✓  |     ✓      |       △        |   ✓   |          △          |     ✓     |       △        |       △        |

### 6.3 Operacion, proveedores y plataforma

| Producto      | BEO/evento | Recursos | Floorplan | Personal/tareas | Proveedores | Catering/menu | Reportes | Multi-venue | API/IA |
| ------------- | :--------: | :------: | :-------: | :-------------: | :---------: | :-----------: | :------: | :---------: | :----: |
| Bisec         |     ✓      |    ✓     |     ?     |        ✓        |      ✓      |       ✓       |    ✓     |      ✓      |   ?    |
| Event Temple  |     ✓      |    ✓     |     △     |        ✓        |      △      |       ✓       |    ✓     |      ✓      |  ✓/△   |
| Perfect Venue |     ✓      |    ✓     |     ?     |        ✓        |      △      |       △       |    ✓     |      ✓      |  ✓/✓   |
| Planning Pod  |     ✓      |    ✓     |     ✓     |        ✓        |      ✓      |       ✓       |    ✓     |      ✓      |  ✓/✓   |
| Tripleseat    |     ✓      |    ✓     |     △     |        ✓        |      ✓      |       ✓       |    ✓     |      ✓      |  ✓/✓   |
| EventPro      |     ✓      |    ✓     |     ✓     |        ✓        |      ✓      |       ✓       |    ✓     |      ✓      |  △/?   |
| Skedda        |     △      |    ✓     |     △     |        △        |      —      |       —       |    ✓     |      ✓      |  ✓/△   |
| Priava        |     ✓      |    ✓     |     △     |        ✓        |      ✓      |       ✓       |    ✓     |      ✓      |  △/?   |
| Odoo          |     △      |    ✓     |     △     |        ✓        |      ✓      |       △       |    ✓     |      ✓      |  ✓/✓   |
| Alegra        |     —      |    —     |     —     |        —        |      ✓      |       —       |    ✓     |      △      |  ✓/△   |
| Kommo         |     △      |    △     |     —     |        ✓        |      —      |       —       |    ✓     |      ✓      |  ✓/✓   |

### 6.4 Peru, mensajeria y pagos locales

| Producto      |         SUNAT          |       Yape/Plin        |   WhatsApp    | Telegram | Moneda/localizacion peruana |
| ------------- | :--------------------: | :--------------------: | :-----------: | :------: | :-------------------------: |
| Bisec         |           ?            |           ?            |       ?       |    ?     |       △ espanol, USD        |
| Event Temple  |           —            |           ?            | △ integracion |    ?     |              ?              |
| Perfect Venue |           —            |      — Stripe/ACH      |       ?       |    ?     |              ?              |
| Planning Pod  |           —            |           ?            |       ?       |    ?     |              ?              |
| Tripleseat    |           —            |           ?            |       △       |    ?     |              ?              |
| EventPro      |           ?            |           ?            |       ?       |    ?     |              ?              |
| Skedda        |           —            |           —            |       △       |    ?     |              ?              |
| Priava        |           ?            |           ?            |       ?       |    ?     |              ?              |
| Odoo          | △ localizacion/partner |      △ integrable      |       △       |    △     |       ✓ configurable        |
| Alegra        |           ✓            | △ registro/integracion |       ?       |    ?     |              ✓              |
| Kommo         |           —            |      △ integrable      |       ✓       |    ✓     |          △ espanol          |

## 7. Lectura por producto

- **Bisec:** amenaza mas directa. Simple, en espanol y economico; cubre casi todo el flujo propuesto. Barrera de migracion moderada por clientes, reservas, pagos y contratos. Ajuste pyme peruana: alto salvo fiscalidad, pagos y canales no confirmados.
- **Event Temple:** fuerte CRM y operacion hotelera/venue. Onboarding y precio por cotizacion sugieren venta mas consultiva. Ajuste pyme: medio-bajo.
- **Perfect Venue:** moderno, precio visible, portal, contratos y pagos. Dependencia de infraestructura de pagos extranjera reduce ajuste local. Ajuste: medio.
- **Planning Pod:** profundidad operativa, floorplans, proveedores y mas de 40 herramientas; costo y complejidad altos. Ajuste: bajo para microempresa, medio para venues grandes.
- **Tripleseat:** maduro y ampliamente usado en hospitality; mas de 20,000 venues es una afirmacion del proveedor, no evidencia de ROI. Precio/localizacion no publicos. Ajuste: medio-bajo.
- **EventPro/Priava:** suites profundas para operaciones complejas; implantacion y ausencia de precio publico elevan la barrera. Ajuste: bajo para SMB.
- **Skedda:** excelente para reservar espacios, pero no reemplaza un CRM/BEO de bodas. Ajuste: bajo como suite integral.
- **Odoo:** puede ensamblar casi todo, pero requiere implementacion y no trae el modelo de salon listo. Ajuste: medio con partner.
- **Alegra:** resuelve SUNAT y back office peruano, no disponibilidad ni ejecucion del evento. Complemento, no sustituto completo.
- **Kommo:** ya conecta WhatsApp y Telegram con pipeline y bots; no entiende recursos, BEO o costos del evento. Complemento y sustituto parcial.

## 8. Que esta comoditizado y que no

### Comoditizado

- CRM y pipeline;
- calendario de espacios y prevencion de conflictos;
- propuestas, contratos, e-firma, anticipos y saldos;
- paquetes, BEO, tareas y reportes;
- proveedores como directorio/registro;
- multi-local y automatizaciones;
- mensajeria conversacional horizontal mediante Kommo.

### Whitespace observado, no validado

- SUNAT + venue management en un producto vertical ligero;
- conciliacion Yape/Plin vinculada al contrato y saldo;
- mensajeria peruana profundamente ligada al estado del evento;
- derivar automaticamente necesidades de personal/servicios desde el paquete aprobado;
- consultar disponibilidad y asignar una **red privada** de trabajadores/proveedores;
- reemplazos de ultima hora, asistencia, calificacion y costo real;
- posteriormente, marketplace abierto con identidad y reputacion.

“Gestionar proveedores” ya existe. La diferencia potencial es **abastecer disponibilidad real bajo demanda**, no guardar una ficha del proveedor.

## 9. Prueba del concepto emergente

| Parte del concepto                      | Ya cubierta                      | Espacio restante                       |
| --------------------------------------- | -------------------------------- | -------------------------------------- |
| Consulta → disponibilidad               | Si, ampliamente                  | Canal/localizacion                     |
| Paquete → cotizacion/versiones          | Si                               | No es wedge por si solo                |
| Contrato → adelanto → confirmado        | Si                               | Yape/Plin/SUNAT                        |
| Confirmado → BEO/tareas/recursos        | Si                               | Derivacion mas automatica              |
| Registrar proveedores                   | Si                               | Commodity                              |
| Consultar disponibilidad a red privada  | No confirmado como flujo central | Wedge potencial                        |
| Matching/reemplazo de mozos y servicios | No encontrado en estas suites    | Diferenciacion mas fuerte              |
| Marketplace publico                     | No encontrado en la suite venue  | Gran complejidad y riesgo de dos lados |

## 10. Tres estrategias

| Estrategia                  | Ventaja                                    | Riesgo                                    | Veredicto               |
| --------------------------- | ------------------------------------------ | ----------------------------------------- | ----------------------- |
| Suite completa de salon     | Mayor vision y ticket                      | Copia Bisec/Planning Pod; anos de alcance | No iniciar aqui         |
| Capa de integracion peruana | Rapida, convive con software               | Facil de copiar; APIs y adopcion          | Wedge secundaria        |
| Red privada operativa       | Dolor posterior a la venta; diferenciacion | Disponibilidad, confianza y legal         | Mejor wedge para probar |

## 11. Ranking de MVP wedges

1. **Red privada de personal y proveedores por evento**: solicitud, disponibilidad, aceptacion, asignacion y reemplazo.
2. **Handoff cotizacion/BEO → necesidades operativas**: genera roles, recursos y tareas desde el paquete vendido.
3. **Conciliacion de adelantos y saldos peruanos**: evidencia, aprobacion y calendario; automatizar luego mediante pasarela.
4. **Capa WhatsApp-first sobre Bisec/Odoo/Alegra**: util, pero Kommo ya ocupa parte del espacio.
5. **Compliance operativo**: aforo, ITSE, documentos y checklists; valioso pero venta mas dificil.

## 12. MVP recomendado

### ICP

Salon independiente de Lima con uno a tres espacios, 6-20 eventos al mes, paquetes que incluyen personal o servicios externos, y una red informal recurrente de mozos, bartenders, decoradores, sonido y catering.

### Problema

Despues de vender el evento, el administrador reconstruye manualmente que personal y proveedores necesita, pregunta disponibilidad uno por uno, persigue confirmaciones y resuelve cancelaciones sin una fuente unica de verdad.

### Solucion

Un modulo operativo que toma el evento confirmado, genera necesidades por rol/servicio, consulta una red privada invitada por el salon, registra aceptacion y costo, asigna responsables y activa reemplazos. Puede empezar independiente y exportar un resumen, sin reemplazar Bisec ni facturar.

### Core

- evento y necesidades operativas;
- directorio privado de trabajadores/proveedores;
- invitacion por enlace/mensaje;
- aceptar/rechazar con disponibilidad;
- asignacion, costo y estado;
- lista de pendientes y alertas;
- reemplazo manual asistido;
- resumen operativo del evento;
- historial basico de asistencia/cumplimiento.

### Evitar

- ERP completo, cotizaciones y contratos avanzados;
- marketplace publico;
- custodia de pagos o nomina;
- geolocalizacion estilo InDriver;
- scoring automatico, biometria o background checks;
- SUNAT propio;
- IA que selecciona o fija pagos;
- soporte simultaneo para todos los tipos de negocio.

### Precio hipotetico Peru

- piloto configurado: S/149-249 por 30 dias;
- base: S/199-299/mes;
- por evento o trabajador confirmado solo despues de comprobar que el modelo no desincentiva uso.

No existe evidencia de WTP en las fuentes. El precio se infiere de Bisec (desde US$35.99), Kommo y software SMB peruano; debe probarse.

### Validacion rapida sin fase larga de entrevistas

1. Construir un demo con un evento, seis roles y una red privada ficticia.
2. Contactar 20 salones con paquetes integrales publicados y mostrar el demo sobre un evento real proximo.
3. Ofrecer configurar su red y operar dos eventos por S/149-249.
4. Cobrar antes de personalizar.
5. Continuar solo si tres salones pagan o uno repite durante un segundo mes.
6. Medir mensajes evitados, tiempo para cubrir roles, cancelaciones, reemplazos y costo real contra presupuesto.

## 13. Veredicto del pivot

**No recomiendo abandonar catering y hacer inmediatamente una suite completa para salones de eventos. Confianza: media-alta.**

Razones:

1. No hay evidencia oficial suficiente para afirmar que los salones estan creciendo en 2025-2026.
2. Bisec ya ofrece en espanol y barato casi todo el flujo administrativo imaginado.
3. Las suites internacionales confirman que la gestion generica esta madura.
4. El concepto de buscar mozos y servicios abre una diferenciacion real, pero tambien un negocio operacional y potencialmente de dos lados.
5. Catering conserva una brecha de localizacion mas clara en el flujo especializado; venues puede tener mayor ticket y continuidad operativa, pero no esta demostrado.

La decision mas prudente es **pivot parcial, no total**: prototipar el modulo de red privada con salones que venden paquetes integrales. Si pagan, el producto puede crecer hacia venue operations; si no, el mismo modulo puede servir a caterings y organizadores sin haber construido otro ERP.

## 14. Datos que deben verificarse antes de construir mas

- numero de salones formales por Lima/distrito y aperturas/cierres 2024-2026;
- eventos mensuales, ticket y margen por tipo de salon;
- porcentaje que vende personal/proveedores junto al espacio;
- software actualmente usado y penetracion real de Bisec;
- cantidad de mensajes/horas para cubrir cada evento;
- frecuencia y costo de ausencias/reemplazos;
- disposicion a pagar por coordinacion versus por suite completa;
- modelo contractual y laboral permitido para la intermediacion;
- APIs y terminos de WhatsApp, pasarelas, Alegra/Bisec/Odoo.

## Fuentes principales

- [INEI, CIIU Revision 4](https://proyectos.inei.gob.pe/iinei/srienaho/Descarga/DocumentosMetodologicos/2011-105/Agenda/Clasificador_Industrial_Inter_Uniforme.pdf)
- [INEI, Produccion Nacional diciembre 2025](https://www1.inei.gob.pe/media/MenuRecursivo/boletines/02-informe-tecnico-produccion-nacional-diciembre-2025.pdf)
- [PCM, licencias de riesgo alto/muy alto](https://www.gob.pe/22386-solicitar-licencia-de-funcionamiento-para-cesionarios-de-edificaciones-con-nivel-de-riesgo-alto-o-muy-alto?child=25769)
- [PCM, ECSE](https://www.gob.pe/22631-solicitar-la-evaluacion-de-condiciones-de-seguridad-en-espectaculos-ecse-de-mas-de-3000-personas?child=24023)
- [OSIPTEL, Erestel 2025](https://www.osiptel.gob.pe/portal-del-usuario/noticias/erestel-2025-cu%C3%A1les-son-las-herramientas-y-servicios-digitales-que-m%C3%A1s-usan-los-peruanos/)
- [BCRP, Reporte del Sistema Nacional de Pagos, marzo 2026](https://www.bcrp.gob.pe/docs/Publicaciones/reporte-del-sistema-nacional-de-pagos/2026/marzo/rspf-marzo-2026.pdf)
- sitios oficiales de proveedores enlazados en las tablas.
