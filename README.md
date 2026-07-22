# Nexo Eventos — V1 local

Prototipo del flujo de cotización entre una Cuenta de Usuario y una Cuenta de Empresa. Incluye dos accesos demo, una empresa ficticia y una única solicitud almacenada en el navegador.

## Ejecutar

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`. No se necesitan variables de entorno ni base de datos.

## Verificar

```bash
pnpm typecheck
pnpm build
```

Los datos se guardan en `localStorage`. El botón **Reiniciar demo** borra el recorrido actual.
