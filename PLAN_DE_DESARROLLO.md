# Plan de Desarrollo: Sistema de Evaluación por Rúbricas

Este documento detalla la hoja de ruta para la evolución de la aplicación "Rúbrica para evaluar en el área de composición musical de la Universidad de Antioquia". Las modificaciones han sido organizadas de manera progresiva, desde la reestructuración de la base de datos y la gestión de usuarios, hasta la implementación de lógicas complejas de evaluación y visualización de resultados.

---

## Fase 1: Gestión de Múltiples Rúbricas y Configuración Base
*El objetivo de esta fase es permitir que el sistema no dependa de una única rúbrica estática, sino que el administrador pueda gestionar diferentes instrumentos de evaluación.*

1. **Soporte para múltiples rúbricas:** Modificar la estructura de datos para permitir la creación, almacenamiento y selección de múltiples rúbricas en el sistema.
2. **Nomenclatura de rúbricas:** Añadir un campo de "Nombre" a cada rúbrica para poder identificarlas fácilmente (ej. "Rúbrica Portafolio 2026", "Rúbrica Proyecto Final").
3. **Estructura consistente:** Asegurar que todas las nuevas rúbricas creadas mantengan la misma estructura jerárquica existente (Categorías > Ítems > Niveles de 0 a 5 > Pesos configurables).
4. **Configuración de parámetros por rúbrica:** Añadir la capacidad de definir y modificar, para cada rúbrica específica:
   - El número de jurados (evaluadores) requeridos.
   - El número de estudiantes o piezas que se pueden evaluar por estudiante bajo esa rúbrica.

---

## Fase 2: Roles, Usuarios y Asignaciones
*Esta fase se centra en expandir el sistema de usuarios para soportar a los estudiantes y vincular a los evaluadores con rúbricas específicas.*

1. **Creación de usuarios para estudiantes:** Implementar un nuevo rol de usuario (`STUDENT`) que permita crear credenciales (usuario y contraseña) para los estudiantes que serán evaluados.
2. **Asignación de evaluadores por rúbrica:** Modificar el panel de administración para que se puedan crear credenciales de evaluadores y asignarlos específicamente a una o varias rúbricas concretas.
3. **Anonimato de los jurados:** Modificar el modelo de datos y la interfaz para que los nombres reales de los evaluadores nunca se muestren a los estudiantes ni a los otros evaluadores. El sistema debe asignarles automáticamente alias como "Jurado 1", "Jurado 2", "Jurado 3", etc., dependiendo de su orden de asignación.

---

## Fase 3: Flujo de Evaluación Individual
*Mejorar la experiencia del evaluador al momento de calificar y revisar su propio trabajo.*

1. **Interfaz de calificación por evaluador:** Asegurar que cada evaluador asignado a una rúbrica pueda ingresar con sus credenciales, seleccionar al estudiante a evaluar, asignar sus calificaciones (0 a 5) y dejar comentarios por cada ítem.
2. **Resumen individual del evaluador:** Crear una vista donde, al finalizar su calificación, el evaluador pueda ver un resumen de su propia evaluación: sus comentarios, sus calificaciones cuantitativas y las descripciones cualitativas asociadas a cada ítem calificado.
3. **Campo de resumen general:** Añadir un campo de texto al final del formulario de evaluación para que el evaluador pueda redactar un "Resumen general de la evaluación" cualitativo sobre el estudiante.

---

## Fase 4: Consolidación y Visualización de Resultados Globales
*Esta es la fase final y más compleja, donde se cruzan los datos de todos los evaluadores para generar el reporte final.*

1. **Lógica de cierre de evaluación:** Implementar un estado que detecte cuando todos los jurados asignados a un estudiante (según la configuración de la rúbrica) han terminado de calificar.
2. **Vista consolidada para Evaluadores (Post-evaluación):** Una vez terminada la evaluación por todos los jurados, habilitar una vista donde los evaluadores puedan ver:
   - Los comentarios de los otros evaluadores (como Jurado 1, Jurado 2, etc.).
   - Las calificaciones individuales de cada ítem dadas por cada jurado.
   - El promedio de los evaluadores por cada ítem.
   - El puntaje final otorgado por cada evaluador.
   - El promedio final definitivo del estudiante (todo en escala de 0 a 5).
3. **Vista de resultados para el Estudiante:** Crear el panel o "Dashboard" del estudiante. Al iniciar sesión, el estudiante podrá ver exactamente la misma información consolidada descrita en el punto anterior (promedios por ítem, comentarios anónimos de los jurados, resúmenes generales y nota final).
4. **Visualización de resúmenes generales:** Asegurar que los resúmenes generales redactados por cada jurado sean visibles tanto en la vista consolidada de los evaluadores como en el panel del estudiante.
