# Catálogo digital para nuevo cliente

## Objetivo

Catálogo web editable para un negocio de novedades: calzado, ropa, accesorios y bisutería, con un inventario aproximado de 30 a 50 productos. El cliente subirá y actualizará sus propias fotos, podrá agregar, modificar, ocultar o retirar productos, y actualizar su disponibilidad. Cada producto tendrá un botón para iniciar una conversación directa por WhatsApp. No se contempla carrito ni pago en línea en el alcance actual.

## Stack instalada

- **Next.js 16 + React 19 + TypeScript:** aplicación web y estructura de páginas/componentes.
- **Tailwind CSS 4:** estilos adaptables a móviles y escritorio.
- **Supabase:** previsto para base de datos, autenticación del panel y almacenamiento de fotos. Los paquetes cliente y SSR ya están instalados; el proyecto de Supabase aún debe conectarse y configurarse.
- **Three.js + React Three Fiber + Drei:** animación 3D de entrada basada en el personaje que entregó el cliente; el archivo `.blend` original se conserva y la web carga las mallas y materiales exportados.
- **Playwright:** herramienta de automatización instalada como dependencia de desarrollo, con Chromium local instalado para revisar la página en escritorio y móvil.
- **Figma MCP:** previsto para trabajar con diseños en Figma. La conexión MCP todavía está pendiente.

## Skills de diseño

Se usarán las skills locales disponibles en `../.agents/skills/`:

- `emil-design-eng`
- `impeccable`
- `design-taste-frontend`
- `animate`

## Estado

La estructura inicial de Next.js y la stack de dependencias ya están instaladas. La iteración visual actual incluye el header y una intro breve con el modelo 3D de Marisol: guiña un ojo, gira la cabeza y da paso al catálogo. La intro se puede omitir y se omite si el visitante prefiere reducir movimiento. El menú móvil y el panel de búsqueda abren y cierran; conectar la búsqueda a productos y las categorías al catálogo queda para la siguiente etapa. Supabase y Figma MCP siguen pendientes de conexión.

Playwright y Chromium están instalados. Playwright confirmó la intro, la opción de omitirla, la preferencia de movimiento reducido, el buscador, Escape y el menú móvil. Las capturas están en `.impeccable/review/`.

**Notas del entorno:** Node.js instalado es 22.12.0; una dependencia de ESLint recomienda Node 22.13.0 o superior y mostró un aviso de compatibilidad durante la instalación. `npm audit` reporta vulnerabilidades altas en la cadena de herramientas de ESLint (solo dependencias de desarrollo); la corrección automática propuesta requiere bajar `eslint-config-next` a una versión mayor antigua, por lo que no se aplicó.

## Desarrollo local

```bash
npm run dev
```

Abrir `http://localhost:3000` en el navegador.

## Comandos previstos

```bash
npm run build       # generar build de producción
npm run lint        # revisar lint
npx playwright test # ejecutar pruebas de navegador (cuando se agreguen)
```
