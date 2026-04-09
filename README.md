# 📦 Angular Category App

Aplicación desarrollada en Angular para la gestión de categorías internas, como parte de una prueba técnica frontend.

---

## 🚀 Funcionalidades

* Listado de categorías
* Creación y edición
* Eliminación con confirmación
* Cambio de estado (activo / inactivo)
* Búsqueda global

---

## 🎯 Experiencia de usuario

* Notificaciones con Toast
* Confirmación de acciones críticas
* Estado vacío (empty state)
* Estado de carga (loading)
* Manejo básico de errores

---

## 🧱 Arquitectura

Se implementó una **arquitectura hexagonal (Ports & Adapters)**:

* `core`: modelos e interfaces
* `application`: lógica de negocio (facade)
* `infrastructure`: implementación (mock)
* `features`: UI

Esto permite desacoplar la lógica del backend y facilita escalar a una API real.

---

## 🔄 Manejo de datos

Se utilizó un repositorio mock con `BehaviorSubject` para simular un flujo reactivo:

* Actualización automática de la UI
* Simulación de backend
* Fácil migración a REST

---

## 🧪 Pruebas

Se implementaron pruebas unitarias enfocadas en la capa de facade, validando la interacción con el repositorio y el flujo de datos.

---

## ⚙️ Instalación

```bash
npm install
ng serve
```

Ir a:

```
http://localhost:4200
```

---

## 🧠 Decisiones técnicas

* Uso de PrimeNG para UI consistente
* Arquitectura hexagonal para desacoplamiento
* Reactive Forms para control de validaciones
* Validadores personalizados para lógica de negocio

---

## 🔮 Mejoras futuras

* Integración con API REST
* Manejo global de estado
* Pruebas unitarias
* Guards e interceptors
* Paginación backend

---

## 👨‍💻 Autor

Camilo Ramirez
