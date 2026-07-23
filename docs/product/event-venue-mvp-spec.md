# V1 local del flujo Usuario–Empresa

## Objetivo

Demostrar con una interfaz sencilla cómo una persona descubre una empresa de salón de eventos, solicita una cotización y recibe una propuesta económica. Esta rama es un prototipo local, no un sistema listo para producción.

## Cuentas demo

- **Usuario:** persona que solicita la cotización.
- **Empresa:** Salón de Jardines, empresa ficticia que responde la solicitud.
- El acceso se simula desde una pantalla de selección de rol. No existe registro, contraseña ni autenticación real.

## Recorrido

1. El Usuario entra con su cuenta demo.
2. Ve Salón de Jardines como la única empresa disponible y abre su ficha.
3. Envía su nombre, teléfono o correo, fecha, hora de inicio, hora de finalización, tipo de evento, cantidad aproximada de invitados, servicios solicitados y un comentario opcional.
4. La solicitud queda pendiente.
5. Mientras siga pendiente, el Usuario puede retirarla sin reiniciar la demo.
6. La Empresa entra con su cuenta demo y ve una bandeja de solicitudes y cotizaciones.
7. La Empresa abre la solicitud y responde con precio total, fecha de vigencia y comentario opcional. Los servicios incluidos son los que el Usuario seleccionó.
8. Como alternativa, la Empresa puede cerrar la solicitud sin cotizar e indicar un motivo.
9. El Usuario acepta o rechaza una cotización vigente. Una cotización vencida ya no puede aceptarse.
10. Una cotización aceptada queda marcada como oportunidad lista para continuar, sin convertirse en reserva ni evento confirmado.
11. Cualquiera puede reiniciar la demo para repetir el recorrido.

Solo puede existir una solicitud a la vez. El estado avanza de `pendiente` a `cotizada` y termina en `aceptada` o `rechazada`.

El horario solicitado es informativo para la Empresa. Esta versión no calcula duración, disponibilidad ni precio automáticamente.

Los servicios solicitados se eligen de una lista breve: solo salón, mesas y sillas, decoración, sonido y catering. Son información para preparar la propuesta, no un catálogo con precios automáticos.

Toda cotización muestra su fecha de vigencia y aclara que la propuesta no reserva el salón.

La bandeja de Empresa muestra un solo registro en esta versión, pero conserva la estructura de listado y acceso al detalle para una evolución posterior.

La bandeja usa el nombre “Solicitudes y cotizaciones” porque una solicitud pendiente todavía no es una cotización. Incluye contadores demostrativos para pendientes, cotizadas, aceptadas y cerradas.

El detalle muestra una línea de tiempo sencilla: solicitud enviada, cotización enviada y decisión final, rechazo empresarial o vencimiento. Las fechas se generan localmente para esta demostración.

Los formularios de Usuario y Empresa incluyen un botón para llenarlos con datos ficticios y acelerar las pruebas del borrador.

## Decisiones técnicas

- Los datos viven únicamente en `localStorage` del navegador.
- No existe base de datos, API externa ni sincronización entre dispositivos.
- No se usa Telegram.
- No se implementan pruebas automatizadas en esta rama.
- La verificación mínima usa TypeScript, el build de Next.js y un recorrido manual en navegador.

## Fuera de alcance

- Marketplace con varias empresas, búsqueda o filtros.
- Registro, contraseñas, sesiones reales y permisos de servidor.
- Varias solicitudes, varias cotizaciones o historial.
- Chat, negociación, contraofertas y edición posterior al envío.
- Reservas, contratos, pagos, documentos y notificaciones.
- Paquetes, descuentos, impuestos y desglose avanzado.
- Base de datos, Supabase, PostgreSQL, Telegram y cron jobs.
