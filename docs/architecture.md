# Arquitectura de Nexo

## Flujo del producto

```text
Cuenta
  → Evento del cliente
  → Descubrimiento de proveedores
  → Solicitud de cotización
  → Cotización de la empresa
  → Aceptación del usuario
  → Contrato de proveedor
  → Calendario de pagos
```

La arquitectura sigue ese recorrido. Los directorios no representan capas técnicas globales; cada feature concentra la implementación de una capacidad del producto.

## Responsabilidades

### `src/app`

Contiene adaptadores del App Router de Next.js. Una ruta:

- recibe parámetros de URL;
- selecciona el módulo correspondiente;
- delega la presentación y el comportamiento a la interface pública de una feature.

Las rutas no contienen reglas de Cotización, Contrato de proveedor ni persistencia.

### `src/features/account`

Autenticación local, registro de cuentas, sesión activa y destino según el rol.

### `src/features/marketplace`

Modelo y catálogo de Empresas disponibles, categorías y servicios publicados.

### `src/features/customer`

Recorrido autenticado del usuario: Eventos del cliente, exploración, solicitudes, cotizaciones, contratos y pagos.

### `src/features/provider`

Panel autenticado de la empresa: resumen, servicios, solicitudes, preparación de cotizaciones y contratos.

### `src/features/transactions`

Módulo profundo del ciclo comercial. Su interface permite:

- crear y seleccionar un Evento del cliente;
- crear una Solicitud de cotización;
- emitir y consultar una Cotización;
- aceptar una Cotización;
- generar y consultar el Contrato de proveedor.

La implementación recibe persistencia, reloj y generación de identificadores como dependencias. El adaptador de producción utiliza `localStorage`; las verificaciones pueden usar persistencia en memoria.

### `src/shared`

Layouts y módulos UI realmente reutilizados por más de una feature. No contiene reglas del dominio.

## Dirección de dependencias

```text
app → features → shared
          ↓
     marketplace

transactions/application → transactions/domain
transactions/infrastructure → transactions/application
```

Reglas:

1. Una ruta importa desde el `index.ts` de una feature.
2. Una feature no importa archivos internos de otra feature.
3. `shared` no depende de features, salvo los layouts de sesión existentes que se migrarán junto con Account.
4. La UI no accede directamente a `localStorage`.
5. Las reglas económicas no viven en archivos `.tsx`.
6. No se crea una interface especulativa: cada seam debe tener al menos dos adaptadores o una variación real.

## Estrategia de estilos

Tailwind CSS 4 es el sistema de estilos objetivo. `src/app/globals.css` registra los tokens actuales:

- ciruela Nexo;
- coral de acción;
- superficies y líneas;
- radios de controles y superficies;
- familias tipográficas.

Los archivos CSS anteriores funcionan como puente de paridad visual. Su retiro es incremental:

1. capturar la pantalla existente;
2. expresar el mismo diseño con utilidades Tailwind;
3. comparar escritorio y móvil;
4. retirar únicamente los selectores que ya no tienen consumidores;
5. ejecutar formato, TypeScript y build.

No se usa el tema visual predeterminado de shadcn. Los módulos incorporados se adaptan a los tokens de Nexo.
