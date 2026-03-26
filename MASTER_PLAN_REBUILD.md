# Documento Maestro de Arquitectura y Plan de Desarrollo (V2)
**Proyecto:** Sistema de Evaluación por Rúbricas - Área de Composición Musical (UdeA)

Este documento ha sido diseñado como un **Plan Maestro (Master Prompt)**. Contiene el análisis de la versión inicial (V1), los nuevos requerimientos y la hoja de ruta exacta para reconstruir la aplicación desde cero. 

> **Instrucción para el usuario:** Puedes copiar todo el contenido de este documento y pegarlo en otra IA (como Claude, ChatGPT, o un nuevo chat de Gemini) para que tenga el contexto absoluto y comience a programar la nueva versión paso a paso.

---

## 1. Análisis de la Versión Inicial (V1) y Lecciones Aprendidas

**Lo que funcionó en V1:**
*   **Estructura de datos de la rúbrica:** La jerarquía de `Categorías -> Ítems -> Niveles de desempeño (0 a 5) -> Pesos (%)` demostró ser sólida y escalable.
*   **Interfaz de usuario (UI):** El uso de React, Tailwind CSS y Lucide icons proporcionó una interfaz limpia y profesional.

**Limitaciones de V1 (Por qué reconstruir):**
*   **Estado Local / Sin Backend real:** V1 dependía de almacenamiento local o estructuras estáticas. Para el nuevo flujo multi-usuario, se requiere una base de datos relacional en tiempo real (Supabase/PostgreSQL).
*   **Monolítico (Una sola rúbrica):** El sistema estaba atado a una única rúbrica.
*   **Roles limitados:** Solo existían administradores y evaluadores, sin espacio para el estudiante ni lógica de anonimato entre jurados.
*   **Falta de consolidación:** No existía un motor matemático para promediar las calificaciones de múltiples jurados sobre un mismo estudiante.

---

## 2. Nuevos Requerimientos (Alcance de la V2)

La nueva aplicación debe construirse contemplando las siguientes características desde su cimiento:

1.  **Múltiples Rúbricas:** Creación, edición y nombrado de múltiples rúbricas conservando la estructura base.
2.  **Configuración de Rúbrica:** Cada rúbrica define cuántos jurados evalúan y cuántos estudiantes/piezas se pueden evaluar.
3.  **Sistema de Usuarios y Roles (Supabase Auth):**
    *   **Admin:** Crea rúbricas, crea usuarios, asigna jurados a estudiantes.
    *   **Evaluador (Jurado):** Califica, comenta por ítem y deja un resumen general.
    *   **Estudiante:** Visualiza sus resultados consolidados.
4.  **Anonimato Estricto:** Los evaluadores se identifican en el sistema únicamente como "Jurado 1", "Jurado 2", "Jurado 3", etc. Ni el estudiante ni los otros jurados conocen la identidad real.
5.  **Flujo de Evaluación:** 
    *   Calificación cuantitativa (0 a 5) y cualitativa por ítem.
    *   Resumen general obligatorio por evaluador.
    *   Vista de revisión individual para el evaluador antes de enviar.
6.  **Motor de Consolidación:** Una vez que *todos* los jurados terminan, el sistema calcula:
    *   Promedio por ítem (suma de los jurados / cantidad de jurados).
    *   Puntaje final por jurado.
    *   Promedio final definitivo.
    *   Agrupación de comentarios y resúmenes generales por "Jurado X".

---

## 3. Stack Tecnológico Recomendado

*   **Frontend:** React 18+ (Vite), TypeScript, Tailwind CSS.
*   **Backend & Base de Datos:** Supabase (PostgreSQL, Auth, Row Level Security).
*   **Iconos & UI:** Lucide React, Radix UI (opcional para modales/dropdowns).
*   **Estado Global:** Zustand o React Context (para manejar la sesión del usuario).

---

## 4. Diseño de la Base de Datos (PostgreSQL / Supabase)

Para entregar a la IA, aquí está la estructura relacional requerida:

*   `users`: id (auth), email, role (ADMIN, EVALUATOR, STUDENT), name.
*   `rubrics`: id, name, content (JSONB con categorías e ítems), required_judges, max_students, created_at.
*   `assignments`: id, rubric_id, student_id (user), status (PENDING, COMPLETED).
*   `assignment_judges`: id, assignment_id, evaluator_id (user), anonymous_label (ej. "Jurado 1"), status (PENDING, COMPLETED).
*   `evaluations`: id, assignment_judge_id, general_summary, final_score, submitted_at.
*   `evaluation_items`: id, evaluation_id, rubric_item_id, score (0-5), qualitative_feedback, comment.

---

## 5. Plan de Desarrollo Paso a Paso (Prompt para la IA)

*Copia y pega las siguientes fases una por una en tu asistente de IA para construir la app de forma ordenada:*

### Fase 1: Setup y Autenticación
> "Actúa como un Senior Full-Stack Developer. Vamos a construir una app en React + Vite + Supabase. Inicia configurando el proyecto con Tailwind CSS. Luego, implementa el sistema de autenticación con Supabase Auth y crea un Contexto de React para manejar la sesión del usuario y proteger las rutas según 3 roles: ADMIN, EVALUATOR, STUDENT."

### Fase 2: Panel de Administración y Gestión de Rúbricas
> "Ahora, construye el Dashboard del Admin. El Admin debe poder: 1) Crear usuarios (Evaluadores y Estudiantes). 2) Crear múltiples rúbricas. Cada rúbrica tiene un nombre, número de jurados requeridos, y un JSON con la estructura de categorías, ítems (con pesos) y niveles de 0 a 5. Crea la UI para gestionar esto y las consultas a Supabase."

### Fase 3: Motor de Asignaciones y Anonimato
> "Implementa la lógica de asignación. El Admin selecciona una rúbrica, un estudiante, y asigna a N evaluadores. Al guardar en la base de datos, el sistema debe asignar automáticamente un alias ('Jurado 1', 'Jurado 2', etc.) a cada evaluador para esa asignación específica, garantizando el anonimato."

### Fase 4: Flujo del Evaluador (Jurado)
> "Construye el Dashboard del Evaluador. Debe ver las rúbricas que tiene asignadas pendientes. Al entrar a evaluar, debe ver la rúbrica, seleccionar un puntaje de 0 a 5 por ítem, dejar un comentario por ítem, y al final redactar un 'Resumen General'. Antes de enviar, debe ver un resumen de sus propias calificaciones. Al enviar, el estado de su asignación cambia a COMPLETED."

### Fase 5: Consolidación y Dashboard del Estudiante
> "Finalmente, implementa el Dashboard del Estudiante y la vista de resultados. Esta vista solo se habilita si TODOS los jurados asignados han terminado. La vista debe mostrar: 1) El promedio matemático de cada ítem basado en los jurados. 2) Los comentarios de cada ítem agrupados por 'Jurado X'. 3) Los resúmenes generales de cada jurado. 4) La nota final promedio. Asegúrate de que en ninguna parte se filtre el nombre real del evaluador."
