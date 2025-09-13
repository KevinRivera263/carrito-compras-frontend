## Carrito Compras – Frontend (Angular 20)

Este repositorio contiene el  **frontend** del proyecto _Carrito Compras_ desarrollado con **Angular 20**, **Angular Material** y desplegado en **GitHub Pages**.

---

## 🔗 Producción (GitHub Pages)
**URL:** `https://kevinrivera263.github.io/carrito-compras-frontend/`

> Nota: el backend corre en Render 

---

## Stack
- **Angular 20** (standalone components, routing sin NgModule)
- **Angular Material** (toolbar, botones, inputs, snackbars, badge, spinner)
- **TypeScript**
- **GitHub Pages** para el despliegue estático
- **Render** para el backend

---

## 📂 Estructura del proyecto

```
carrito-compras-frontend/
├─ docs/                         
│  ├─ index.html                 
│  ├─ 404.html                   
│  └─ assets/ ...                
├─ src/
│  ├─ app/
│  │  ├─ pages/
│  │  │  ├─ home/
│  │  │  │  ├─ home.html         # listado de productos
│  │  │  │  ├─ home.ts           # lógica de Home (carga, cantidad, agregar)
│  │  │  │  └─ home.css          # estilos (responsive con media queries)
│  │  │  └─ cart/
│  │  │     ├─ cart.html         # vista del carrito
│  │  │     ├─ cart.ts           # lógica del carrito (eliminar, total, finalizar)
│  │  │     └─ cart.css          # estilos
│  │  ├─ services/
│  │  │  └─ api.ts               # servicio HTTP al backend (productos, carrito)
│  │  ├─ app.routes.ts           # rutas 
│  │  ├─ app.config.ts           
│  │  ├─ app.html                
│  │  └─ app.ts                  # componente raíz standalone
│  ├─ styles.css                 
│  ├─ main.ts                   
│  └─ index.html                 
├─ angular.json                 
├─ package.json                 
└─ README.md
```

---

## Endpoints del backend (Render)

**Base:** `https://carrito-compras-backend.onrender.com`

- `GET /productos` → Lista de productos
- `GET /carrito` → Lista de ítems en carrito
- `POST /carrito` → Agregar `{ producto_id | nombre, cantidad }`
- `DELETE /carrito/:id` → Eliminar ítem por id

> En el servicio `api.ts` está centralizada la base URL y helpers. También expone un **BehaviorSubject** para el **contador del carrito** (badge en el toolbar).

---

## Funcionalidades y decoradore que se incorporaron
- **Listado de productos** con imagen, precio y stock
- **Agregar al carrito** con selector de **cantidad** (botones `–` / `+` y input)
- **Carrito** con resumen, **eliminar** ítems, **total** y **finalizar compra**
- **Snackbars** (Material) para confirmaciones/errores
- **Loading states**: progress bar + spinner mientras carga
- **Badge** de cantidad en el navbar (contador reactivo)
- **Responsive**: layout optimizado para desktop y móvil (controles no se solapan)
- **SPA en Pages**: `404.html` incluido para que rutas funcionen al refrescar

---

## ▶️ Desarrollo local

```bash
# instalar dependencias
npm install

# levantar
ng serve -o
# http://localhost:4200
```

> El servicio `ApiService` ya apunta al backend de Render vía HTTPS.

