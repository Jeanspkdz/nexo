# Nexo — marketplace de servicios para eventos

Prototipo local del recorrido completo entre una Cuenta de Usuario y una Cuenta de Empresa:

1. El usuario crea y selecciona un Evento del cliente.
2. Explora servicios de empresas proveedoras.
3. Envía una Solicitud de cotización.
4. La empresa prepara una Cotización detallada.
5. El usuario acepta la propuesta.
6. Nexo genera el Contrato de proveedor y su calendario de pagos.

## Ejecutar

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`. No se necesitan variables de entorno ni base de datos.

## Arquitectura

La aplicación usa Next.js App Router y una arquitectura por features:

```text
src/
├── app/             Rutas y adaptadores de Next.js
├── features/        Módulos verticales del producto
│   ├── account/
│   ├── customer/
│   ├── marketplace/
│   ├── provider/
│   ├── transactions/
│   └── legacy/
└── shared/          Layouts y módulos UI reutilizables
```

Las rutas importan únicamente la interface pública (`index.ts`) de cada feature. Las reglas del ciclo de cotización viven en `features/transactions`; la persistencia de navegador es un adaptador intercambiable y no forma parte de la UI.

Consulta [la documentación de arquitectura](docs/architecture.md) para conocer las responsabilidades y reglas de dependencias.

## Estilos

Tailwind CSS 4 está configurado con los tokens visuales de Nexo. Los estilos existentes permanecen temporalmente importados durante la migración para garantizar paridad visual; se retiran pantalla por pantalla únicamente después de comprobar que Tailwind reproduce el diseño actual.

## Verificar

```bash
pnpm fmt:check
pnpm typecheck
pnpm build
```

Los datos del prototipo se guardan en el navegador. El botón **Reiniciar datos de prueba** borra el recorrido transaccional actual.
