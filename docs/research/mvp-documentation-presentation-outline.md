# Estructura recomendada para el informe y la presentación de Nexo Eventos MVP

## Pregunta investigada

¿Qué partes debe contener una presentación o informe que documente este MVP?

## Respuesta ejecutiva

La documentación debe contar una historia verificable: **problema → usuario → solución → alcance → funcionamiento → evidencia → límites → validación futura**. En este repositorio es especialmente importante separar la **visión del MVP** de lo que ya está **implementado**, porque la especificación contempla el ciclo comercial, contratos, eventos, personal y facturación, mientras que el README define el incremento actual como la captura de una consulta desde Telegram y su aparición en el panel del administrador ([especificación del producto](../product/event-venue-mvp-spec.md#solution); [README](../../README.md#nexo-eventos-mvp)).

## Secciones que debe tener

### 1. Portada

Incluir nombre del producto (**Nexo Eventos MVP**), una frase breve de propósito, autor, curso o institución y fecha. La descripción oficial del incremento actual puede resumirse así: una persona entra mediante el enlace de Telegram del salón, aporta datos mínimos y la oportunidad aparece en el panel protegido del administrador ([README](../../README.md#nexo-eventos-mvp)).

### 2. Resumen ejecutivo

En un párrafo, explicar el problema, la solución, el usuario principal, qué se construyó y qué resultado se espera validar. El usuario operativo inicial es un administrador de una MYPE con un solo espacio de eventos; clientes y trabajadores interactúan por Telegram y el administrador usa un panel web ([especificación](../product/event-venue-mvp-spec.md#solution)).

### 3. Contexto y problema

Explicar cómo los salones administran consultas, cotizaciones, cambios, contratos, adelantos, disponibilidad y personal mediante conversaciones, notas y hojas separadas, lo que dificulta saber qué cliente necesita respuesta, qué versión fue aceptada, cuándo una fecha quedó reservada y si hay personal suficiente ([problema documentado](../product/event-venue-mvp-spec.md#problem-statement)).

Conviene incluir una diapositiva o tabla con:

- situación actual;
- dolor operativo;
- consecuencia comercial;
- usuario afectado.

### 4. Usuario objetivo y actores

Describir al cliente inicial y distinguir los actores para evitar ambigüedad:

- **Administrador del salón:** evalúa oportunidades, compromete el espacio y consigue el personal.
- **Cliente del evento:** negocia y contrata el evento.
- **Trabajador:** participa en la red privada y acepta asignaciones.

Estas responsabilidades están definidas en el glosario del dominio ([glosario: Event staffing](../../CONTEXT.md#event-staffing)). La primera versión está delimitada a un salón con un espacio y un administrador; múltiples usuarios y roles quedan como extensión futura ([glosario: Venue account](../../CONTEXT.md#event-staffing)).

### 5. Objetivo del MVP y propuesta de valor

Presentar el objetivo como una hipótesis a validar, no como un resultado demostrado: convertir consultas serias en un proceso comercial trazable y ayudar al administrador a no perder seguimientos, sin quitarle control sobre la aceptación del evento ([problema](../product/event-venue-mvp-spec.md#problem-statement); [solución](../product/event-venue-mvp-spec.md#solution)).

La oportunidad se crea cuando existen tres datos mínimos: fecha aproximada, tipo de evento y cantidad estimada de invitados ([historia de usuario 6](../product/event-venue-mvp-spec.md#user-stories)).

### 6. Alcance funcional

Separar esta parte en dos columnas:

#### Alcance del producto especificado

El documento de producto contempla oportunidades, seguimientos, catálogo y cotizaciones versionadas, contrato, adelanto, confirmación del evento, cobertura privada de personal y facturación por evento confirmado ([solución](../product/event-venue-mvp-spec.md#solution); [decisiones de implementación](../product/event-venue-mvp-spec.md#implementation-decisions)).

#### Incremento implementado y demostrable

El incremento actual permite:

- iniciar la consulta desde un enlace único de Telegram;
- capturar fecha aproximada, tipo de evento y cantidad de invitados;
- crear y listar oportunidades por salón;
- mostrar información pendiente;
- pausar o reanudar seguimiento;
- cerrar una oportunidad con motivo;
- detener recordatorios cuando el cliente responde o escribe `CANCELAR`;
- preparar como máximo dos recordatorios;
- persistir en PostgreSQL si existe `DATABASE_URL`, con memoria solo para desarrollo y pruebas.

Estas capacidades están respaldadas por el flujo de dominio, el panel, el webhook y la configuración de persistencia ([flujo de oportunidades](../../src/domain/opportunity-flow.ts); [gestión de oportunidades](../../src/domain/opportunity-management.ts); [panel](../../src/app/page.tsx); [webhook](../../src/app/api/telegram/webhook/route.ts); [configuración de ejecución](../../README.md#ejecutar-localmente)).

El módulo de cotización ya tiene lógica de dominio y pruebas para catálogo, cálculo, versiones, envío y aceptación, pero no aparece conectado al panel o al objeto de aplicación actual; por ello debe presentarse como **trabajo en desarrollo**, no como flujo integral terminado ([módulo de cotización](../../src/domain/quotation.ts); [composición actual](../../src/lib/application.ts)).

### 7. Fuera de alcance

Mostrar qué no pretende resolver esta versión. La especificación excluye, entre otros puntos, marketplace público de salones o trabajadores, proveedores empresariales, pagos al trabajador dentro de la plataforma, firma digital certificada, rastreo continuo, recomendación automática sin consentimiento y bloqueo de contratos por falta de cobertura ([fuera de alcance](../product/event-venue-mvp-spec.md#out-of-scope)).

Esta sección evita que el jurado evalúe el MVP como si fuera el producto final.

### 8. Flujo principal del usuario

Representar el recorrido con un diagrama simple:

1. El cliente abre el enlace único del salón en Telegram.
2. El bot identifica el salón y solicita los datos mínimos.
3. Se crea la oportunidad aislada para ese salón.
4. El administrador inicia sesión y revisa la oportunidad en el panel.
5. El administrador completa datos, pausa el seguimiento o cierra la oportunidad.
6. Si el cliente no responde, se envían hasta dos recordatorios; una respuesta u opt-out detiene el flujo.

El enlace por salón, la captura y la visualización están descritos por el README y la especificación; las reglas de respuesta y recordatorio están implementadas en el webhook, el caso de uso y el cron ([README](../../README.md#nexo-eventos-mvp); [historias de usuario](../product/event-venue-mvp-spec.md#user-stories); [webhook](../../src/app/api/telegram/webhook/route.ts); [cron](../../src/app/api/cron/follow-ups/route.ts)).

### 9. Arquitectura y tecnologías

Incluir un esquema de cuatro bloques: **Telegram → API/webhook → dominio y persistencia → panel web**. El repositorio utiliza Next.js, React, TypeScript, Zod, PostgreSQL y Vitest, y declara PNPM como gestor de paquetes ([dependencias y scripts](../../package.json)). La aplicación selecciona PostgreSQL cuando existe `DATABASE_URL` y, en caso contrario, usa almacenamiento en memoria ([composición](../../src/lib/application.ts); [README](../../README.md#ejecutar-localmente)).

También deben mencionarse las medidas observables: secreto del webhook de Telegram, secreto del cron y verificación de sesión administrativa antes de mostrar o modificar oportunidades ([webhook](../../src/app/api/telegram/webhook/route.ts); [cron](../../src/app/api/cron/follow-ups/route.ts); [panel](../../src/app/page.tsx)).

### 10. Modelo de dominio y reglas de negocio

No es necesario mostrar todo el glosario. Seleccionar los conceptos centrales: oportunidad, oportunidad perdida, seguimiento, conflicto de disponibilidad, evento confirmado, contrato y cobertura de personal. Usar exactamente los términos definidos por el proyecto para no confundir una consulta con un evento confirmado ([glosario](../../CONTEXT.md#event-staffing)).

Reglas clave que merecen una diapositiva:

- una consulta solo se convierte en oportunidad con los tres datos mínimos;
- una oportunidad no reserva la fecha;
- contrato aceptado más adelanto registrado confirma el evento;
- el seguimiento se limita a dos recordatorios;
- cobertura incompleta advierte, pero no bloquea el evento.

Las reglas se encuentran en las historias y decisiones de la especificación ([historias de usuario](../product/event-venue-mvp-spec.md#user-stories); [decisiones de implementación](../product/event-venue-mvp-spec.md#implementation-decisions)).

### 11. Evidencia de implementación y pruebas

Incluir capturas reales del bot y el panel, junto con una tabla de casos demostrados y su resultado. No basta con listar tecnologías. El repositorio define verificaciones mediante `pnpm test`, `pnpm typecheck` y `pnpm build` ([README](../../README.md#verificación); [scripts](../../package.json)). La especificación exige pruebas unitarias de reglas, pruebas de integración de persistencia, webhook y cobro, y flujos de extremo a extremo para los recorridos críticos ([decisiones de pruebas](../product/event-venue-mvp-spec.md#testing-decisions)).

La presentación debe indicar la fecha y el resultado real de cada ejecución; si no se ejecutaron para el informe, marcarlo como pendiente en lugar de asumir que pasan.

### 12. Validación de negocio y métricas

Distinguir **software funcionando** de **MVP validado**. El glosario establece que la validación pagada requiere que un negocio calificado comprometa dinero; una declaración de intención de pago sigue siendo descubrimiento, no validación ([glosario: Paid validation](../../CONTEXT.md#paid-validation)).

Proponer métricas que correspondan al problema:

- consultas completas creadas como oportunidades;
- tiempo hasta la primera atención del administrador;
- oportunidades que reciben respuesta después del seguimiento;
- oportunidades perdidas y motivo;
- conversión de oportunidad a contrato/evento;
- errores de asignación entre salones;
- negocios que aceptan un piloto pagado.

Las primeras cuatro métricas se derivan de los estados y datos que ya maneja el incremento ([modelo de oportunidad](../../src/domain/opportunity-flow.ts); [panel](../../src/app/page.tsx)); la conversión completa pertenece al alcance especificado, pero todavía no al flujo integrado actual ([especificación](../product/event-venue-mvp-spec.md#solution)).

### 13. Riesgos, limitaciones y pendientes

Documentar con honestidad:

- el modo en memoria pierde información al reiniciar y no debe desplegarse ([README](../../README.md#ejecutar-localmente));
- la integración exacta de cobro por uso requiere validación en el entorno de pruebas del procesador ([solución](../product/event-venue-mvp-spec.md#solution));
- el incremento actual no demuestra todavía el ciclo integral de cotización, contrato, adelanto, evento, personal y cobro ([composición actual](../../src/lib/application.ts); [alcance previsto](../product/event-venue-mvp-spec.md#solution));
- las métricas comerciales requieren pilotos reales y no pueden inferirse solo de pruebas técnicas ([glosario: Paid validation](../../CONTEXT.md#paid-validation)).

### 14. Próximos pasos y cierre

Cerrar con una ruta priorizada, por ejemplo: integrar cotizaciones al flujo real, completar contrato y adelanto, confirmar eventos, validar el cobro, probar con un salón y medir conversión y tiempo de atención. La especificación coloca estos elementos dentro de la solución prevista, mientras el README delimita el incremento actualmente entregado ([especificación](../product/event-venue-mvp-spec.md#solution); [README](../../README.md#nexo-eventos-mvp)).

La conclusión debe responder en una frase: **qué problema resuelve hoy, qué evidencia existe y qué debe validarse después**.

## Orden sugerido para una presentación breve

Para una exposición de 8–12 minutos, usar 10 diapositivas:

1. Portada y propuesta de valor.
2. Problema y contexto.
3. Usuario objetivo y actores.
4. Solución y objetivo del MVP.
5. Alcance actual frente a visión futura.
6. Flujo principal.
7. Arquitectura y reglas clave.
8. Demostración y pruebas.
9. Validación, métricas, riesgos y pendientes.
10. Próximos pasos y conclusión.

## Anexos recomendados para el informe escrito

- historias de usuario priorizadas;
- glosario abreviado;
- diagrama de arquitectura;
- modelo de datos o entidades principales;
- matriz requisito–evidencia–estado;
- instrucciones de instalación y variables de entorno sin secretos;
- resultados fechados de pruebas;
- capturas de pantalla;
- fuentes y decisiones de producto.

## Criterio de calidad

Cada sección debe señalar si describe una **hipótesis**, una **decisión de producto**, una **capacidad implementada** o una **evidencia de validación**. Esa clasificación evita el error más importante en la documentación de este repositorio: presentar la visión completa como si todo estuviera ya construido y validado.
