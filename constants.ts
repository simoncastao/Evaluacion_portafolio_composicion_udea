import { RubricCategory, User, UserRole } from './types';

export const INITIAL_ADMIN_EMAIL = "simon.castano@udea.edu.co";

export const INITIAL_USERS: User[] = [
  { 
    email: INITIAL_ADMIN_EMAIL, 
    role: UserRole.ADMIN, 
    name: "Simón Castaño",
    password: "admin123" 
  },
  { 
    email: "docente1@udea.edu.co", 
    role: UserRole.EVALUATOR, 
    name: "Docente Evaluador",
    password: "123"
  },
];

export const RUBRIC_INTRO_TEXT = `PROPUESTA DE REQUISITOS, CRITERIOS Y PRECISIONES SOBRE EL PORTAFOLIO DE GRADO DE MÚSICA COMPOSICIÓN UDEA.

Este documento presenta una rúbrica para evaluar el portafolio de grado que presentan los estudiantes de composición. También es una manera de consignar los requisitos, criterios y precisiones para construir el portafolio de composiciones a través de todo el pregrado.

Para lograrlo, la rúbrica usa cinco estrategias:
1. Descriptores graduales (0–5).
2. Aclaraciones de alcance (definiciones breves).
3. Umbrales cuantitativos (mínimos verificables).
4. Ponderaciones flexibles (cada ítem puede tener un peso diferente según el evaluador, mínimo 5% y máximo 20%).
5. Implementación digital.`;

export const RUBRIC_GENERALITIES = `• Requisitos mínimos del portafolio: el portafolio de grado debe contener mínimo seis (6) obras. Entre todas deben sumar mínimo treinta (30) minutos de duración total.
• Naturaleza de la rúbrica: esta es una rúbrica cualitativo–cuantitativa que describe niveles de logro (0 a 5) para distintos criterios. Los pesos relativos de cada ítem (ponderaciones) no están fijados de antemano: cada evaluador podrá asignar pesos distintos según el enfoque, el tipo de repertorio, los medios y los propósitos del portafolio, siempre que explicite su criterio de ponderación. El mínimo sin embargo para cada item es de
• Implementación: esta rúbrica se proyecta para ser utilizada mediante una aplicación de evaluación, por lo que su estructura está pensada para convertir descriptores y niveles en resultados evaluables y comparables.
• Fundamento curricular: la rúbrica es una implementación de los procesos y resultados de aprendizaje definidos por el Área para el programa de composición, y busca reflejar aspectos específicos del portafolio como evidencia del aprendizaje.`;

export const INITIAL_RUBRIC: RubricCategory[] = [
  {
    id: "1",
    title: "1. Desarrollo técnico-musical",
    description: "La rúbrica cubre de forma fuerte el resultado de aprender a componer obras originales, diversas y técnicamente sólidas, y de dominar la escritura para distintos ensambles y medios.",
    items: [
      {
        id: "1.1",
        title: "1.1 Originalidad y diversidad estilística de las piezas",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se presentan piezas originales ni propuestas compositivas propias." },
          { score: 1, description: "Las piezas se perciben imitativas/derivativas; la originalidad es marginal y no sostiene el discurso del portafolio." },
          { score: 2, description: "En algunas piezas aparece intención de originalidad, pero aún no se consolida un lenguaje o estética propia; la diversidad estilística es puntual y poco diferenciada." },
          { score: 3, description: "Al menos una pieza es claramente original y algunas piezas exploran más de un estilo/estética con coherencia, mostrando decisiones conscientes." },
          { score: 4, description: "Varias piezas presentan originalidad sostenida y diversidad estilística bien fundamentada; se evidencian cambios estéticos claros y consistentes entre piezas." },
          { score: 5, description: "La gran mayoría de las piezas configura un lenguaje propio reconocible; la diversidad estética es amplia y la exploración creativa es profunda y consistente." }
        ]
      },
      {
        id: "1.2",
        title: "1.2 Dominio de técnicas compositivas",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay control técnico; decisiones formales y de escritura resultan arbitrarias, afectando gravemente la inteligibilidad musical." },
          { score: 1, description: "El dominio es muy limitado; en la mayoría de piezas hay errores recurrentes (forma, textura, ritmo, armonía, timbre) que comprometen coherencia." },
          { score: 2, description: "El control es parcial e inestable; hay aciertos puntuales, pero los recursos técnicos no se sostienen a lo largo de las piezas." },
          { score: 3, description: "Dominio adecuado para egreso; al menos la mitad de las piezas muestran coherencia formal y manejo funcional de recursos técnicos; los errores no alteran estructuralmente las obras." },
          { score: 4, description: "La mayoría de las piezas evidencia dominio sólido y consistente de técnicas diversas, aplicadas con intención y control del discurso." },
          { score: 5, description: "La gran mayoría de las piezas integra técnicas con flexibilidad, refinamiento y complejidad clara; los recursos se usan expresivamente sin perder legibilidad." }
        ]
      },
      {
        id: "1.3",
        title: "1.3 Escritura musical y notación",
        description: "En este ítem, “notación clara y correcta” se entiende, en primer lugar, como la posibilidad de que los intérpretes decodifiquen la partitura. Además, supone que la intención compositiva del compositor se vea reflejada en la partitura: tanto en el plano conceptual, técnico y estético, como en el grado de control co-creativo que el compositor propone a los intérpretes. También se considera si los materiales son adecuados para montaje, registro y circulación/difusión.",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay materiales legibles o suficientes; no es posible decodificar la partitura ni comprender la propuesta compositiva." },
          { score: 1, description: "En la mayoría de piezas la notación es confusa; hay ambigüedades y errores que impiden decodificar con precisión qué se espera sonora y musicalmente." },
          { score: 2, description: "La notación funciona parcialmente; requiere múltiples correcciones e inconsistencias que debilitan la representación conceptual/técnica/estética y el control co-creativo." },
          { score: 3, description: "Notación clara en al menos la mitad de las piezas: se decodifica con fidelidad la intención compositiva (conceptual/técnica/estética) y el margen co-creativo es comprensible para intérpretes u otros agentes." },
          { score: 4, description: "Notación precisa en la mayoría de las piezas: intención compositiva bien reflejada y controlada; materiales adecuados para montaje, registro y circulación." },
          { score: 5, description: "Nivel editorial profesional en la gran mayoría de las piezas: máxima claridad de decodificación y control de la intención; lista para montaje profesional, registro de alta calidad y circulación sin ajustes sustanciales." }
        ]
      },
      {
        id: "1.4",
        title: "1.4 Adecuación a ensambles y formatos",
        description: "“Viabilidad interpretativa” significa que la pieza puede ejecutarse efectivamente por el medio propuesto. “Idiomático” significa correspondencia con posibilidades naturales/realistas del instrumento/ensamble (sin que eso implique facilidad). Desde el nivel 3 se evalúa viabilidad + evidencia de manejo idiomático.",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "Las decisiones son incompatibles con los medios propuestos; no hay viabilidad interpretativa." },
          { score: 1, description: "Hay dificultades importantes con la viabilidad interpretativa: el material presenta problemas serios de ejecución y requiere ajustes sustanciales para realizarse." },
          { score: 2, description: "La viabilidad interpretativa aún tiene dificultades, pero menos que en el nivel 1; algunas piezas pueden interpretarse, aunque con problemas importantes. Aún no se aprovecha el medio y hay poca correspondencia con criterios idiomáticos." },
          { score: 3, description: "Se evidencia variedad y adaptación correcta: algunas piezas incluyen formatos distintos y son viables interpretativamente; al menos 1 pieza evidencia manejo idiomático del/los ensambles específicos." },
          { score: 4, description: "Comprensión profunda de los medios usados: la mayoría de las piezas es viable interpretativamente y 2 piezas evidencian manejo idiomático claro del instrumento/ensamble." },
          { score: 5, description: "Uso creativo y experto: la gran mayoría de las piezas es plenamente viable y 3 piezas o más evidencian manejo idiomático sobresaliente, ampliando posibilidades expresivas sin comprometer la ejecución." }
        ]
      },
      {
        id: "1.5",
        title: "1.5 Uso de tecnologías digitales y análogas electrónicas",
        description: "Este ítem evalúa el uso creativo y crítico de tecnologías digitales y análogas electrónicas. Por “tecnologías digitales” se entienden computadores y tecnologías digitales no necesariamente computacionales. El uso cotidiano/habitual (guitarra eléctrica por defecto, programa de notación “normal”) no cuenta por sí mismo.",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se emplean tecnologías digitales o análogas electrónicas en el portafolio, o su presencia no cumple criterios compositivos (solo uso cotidiano)." },
          { score: 1, description: "El uso tecnológico es superficial o incorrecto; no se integra al pensamiento musical/conceptual ni se documenta de manera mínima." },
          { score: 2, description: "Uso básico y parcialmente integrado; se limita a procedimientos estándar sin reflexión estética o metodológica clara (más cercano al uso habitual que al uso creativo)." },
          { score: 3, description: "Uso pertinente y funcional: 1 pieza integra tecnologías digitales/análogas (incluida generatividad o IA cuando aplique) de forma creativa y documentada." },
          { score: 4, description: "Integración creativa y crítica: 2 piezas incorporan tecnologías digitales o análogas electrónicas aportando valor estético y compositivo, con claridad metodológica." },
          { score: 5, description: "Integración avanzada e innovadora: 3 piezas incorporan tecnologías digitales o análogas electrónicas como eje de decisión artística, con documentación robusta, reflexividad y ética sólidas." }
        ]
      },
      {
        id: "1.6",
        title: "1.6 Producción y finalización sonora de las piezas",
        description: "En los niveles 0, 1 y 2 predominan maquetas sonoras. En los niveles 3 y 4 se exige producción virtual avanzada (mezcla/producción/masterización). En el nivel 5 se exige producción final (grabación real o producción final equivalente).",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay audio suficiente para evaluación, o el audio no permite comprender las decisiones musicales (registro incompleto, fallas críticas)." },
          { score: 1, description: "Maquetas muy preliminares: audio inestable o incompleto; problemas serios de balance, definición o ruido impiden apreciar la intención sonora." },
          { score: 2, description: "Maquetas funcionales: se entiende la propuesta musical, pero la presentación sonora sigue siendo básica; sin mezcla/producción que permita oír capas, espacios y balances con claridad." },
          { score: 3, description: "1 pieza presenta mezcla/producción/masterización (producción virtual avanzada): la maqueta se convierte en un producto más finalizado, con balances, espacialidad y claridad suficientes." },
          { score: 4, description: "2 piezas presentan mezcla/producción/masterización (producción virtual avanzada): maquetas altamente finalizadas, con control claro de timbre, balance y espacio, cercanas a sonoridades reales." },
          { score: 5, description: "3 piezas o más presentan producción final (grabación real o producción equivalente profesional): el resultado ya no es maqueta, sino un producto utilizable profesionalmente." }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "2. Formación crítica y ética",
    description: "La rúbrica orienta a que el portafolio no sea solo “obras sueltas”, sino un conjunto con postura y responsabilidad.",
    items: [
      {
        id: "2.1",
        title: "2.1 Reflexión crítica sobre el rol del compositor",
        description: "Estas reflexiones deben evidenciarse explícitamente mediante bitácora, texto, producto audiovisual, podcast, mapa conceptual, imagen comentada u otro formato verificable.",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se evidencia reflexión." },
          { score: 1, description: "Reflexión superficial o meramente descriptiva, sin sostén argumental ni vínculo real con el portafolio." },
          { score: 2, description: "Hay ideas generales, pero la argumentación es limitada y el vínculo con las piezas es débil o episódico." },
          { score: 3, description: "Reflexión clara y coherente, vinculada a decisiones verificables del portafolio y a más de una pieza." },
          { score: 4, description: "Postura argumentada y consistente: la mayoría de las piezas evidencia coherencia entre reflexión, decisiones estéticas y posicionamiento ético." },
          { score: 5, description: "Postura crítica sólida y madura: la gran mayoría de las piezas refleja una comprensión ética, estética y social integrada al hacer compositivo." }
        ]
      },
      {
        id: "2.2",
        title: "2.2 Consideraciones éticas en los procesos creativos",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se consideran aspectos éticos en la creación." },
          { score: 1, description: "La ética aparece solo de forma implícita o accidental; no guía decisiones." },
          { score: 2, description: "Consideraciones éticas poco desarrolladas o inconsistentes; aparecen como enunciado sin efectos verificables." },
          { score: 3, description: "Consideraciones éticas claras: al menos 1 pieza refleja decisiones éticas verificables (fuentes, colaboración, autoría, contexto, tratamiento de materiales)." },
          { score: 4, description: "Aplicación ética coherente: al menos 2 piezas evidencian consistencia entre intención, proceso y resultado." },
          { score: 5, description: "Integración ética profunda: al menos 3 piezas o más evidencian decisiones responsables, críticas y transparentes, con impacto claro en la obra." }
        ]
      },
      {
        id: "2.3",
        title: "2.3 Reflexión sobre contexto social y cultural",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay evidencia de reflexión sobre contextos sociales y culturales." },
          { score: 1, description: "Reflexión anecdótica o superficial; no incide en decisiones compositivas." },
          { score: 2, description: "Reflexión débil o poco desarrollada; el contexto aparece como decorativo o accesorio." },
          { score: 3, description: "Reflexión clara y pertinente: 1 pieza evidencia reflexión verificable sobre realidades sociales/culturales con incidencia en decisiones compositivas." },
          { score: 4, description: "Reflexión significativa: 2 piezas evidencian que el contexto opera como dimensión compositiva." },
          { score: 5, description: "Reflexión profunda: 3 piezas o más articulan contexto, escucha y propuesta estética de manera consistente y no reduccionista." }
        ]
      },
      {
        id: "2.4",
        title: "2.4 Uso ético de tecnologías e IA",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "Uso irresponsable o no declarado de tecnologías/IA." },
          { score: 1, description: "Uso acrítico, sin transparencia de procedimientos ni atribución." },
          { score: 2, description: "Uso básico con reflexión ética incipiente; documentación insuficiente." },
          { score: 3, description: "Uso consciente y responsable; hay transparencia mínima sobre herramientas y decisiones." },
          { score: 4, description: "Uso reflexivo y documentado; la mayoría de piezas tecnológicas explicitan límites, decisiones y responsabilidades." },
          { score: 5, description: "Uso ético ejemplar y crítico; trazabilidad, atribución y reflexión profunda integradas a la práctica compositiva." }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "3. Construcción de un enfoque integral y multidimensional",
    description: "Aquí la rúbrica guía la construcción de obras donde se vea tanto pensamiento como sensibilidad.",
    items: [
      {
        id: "3.1",
        title: "3.1 Claridad y coherencia estructural",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay organización reconocible; el material aparece fragmentado o inconexo." },
          { score: 1, description: "Estructuras débiles y erráticas; los eventos no construyen forma ni dirección." },
          { score: 2, description: "Se perciben intenciones formales, pero con discontinuidades; la coherencia solo se sostiene en algunos tramos." },
          { score: 3, description: "Varias piezas presentan estructura clara y coherencia global; se entiende dirección formal en buena parte del portafolio." },
          { score: 4, description: "La mayoría de las piezas muestra estructuras bien articuladas, con manejo de tensión/distensión y continuidad convincente." },
          { score: 5, description: "La gran mayoría de las piezas presenta arquitectura formal ejemplar: claridad, organicidad y control de macroforma/microforma." }
        ]
      },
      {
        id: "3.2",
        title: "3.2 Equilibrio entre análisis formal e intuición",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay integración: decisiones se sienten arbitrarias o mecánicas." },
          { score: 1, description: "Predomina solo lo intuitivo o solo lo técnico, sin diálogo entre ambos." },
          { score: 2, description: "Se intenta integrar, pero el balance es irregular; la intuición no siempre se formaliza o el análisis se siente impuesto." },
          { score: 3, description: "Integración funcional: algunas piezas evidencian decisiones intuitivas sostenidas por recursos formales claros." },
          { score: 4, description: "Integración equilibrada: la mayoría de las piezas muestra diálogo natural entre intención expresiva y estructura." },
          { score: 5, description: "Integración madura: la gran mayoría de las piezas evidencia que técnica y emoción co-determinan la obra con fluidez y alto nivel artístico." }
        ]
      },
      {
        id: "3.3",
        title: "3.3 Profundidad conceptual de las propuestas",
        description: "Esta profundidad conceptual puede relacionarse con la reflexión ética y/o con la reflexión sobre el contexto social y cultural, pero también puede ser una profundidad conceptual autónoma (formal, perceptual, tímbrica, espacial, tecnológica, matemática, poética, fenomenológica, etc.).",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No hay concepto, pregunta ni intención artística declarada o inferible." },
          { score: 1, description: "Profundidad conceptual incipiente: 1 pieza presenta una idea/pregunta sin desarrollo y con poca incidencia en decisiones compositivas." },
          { score: 2, description: "Profundidad conceptual limitada: 2 piezas presentan conceptos identificables, pero su desarrollo es parcial o irregular." },
          { score: 3, description: "Profundidad conceptual adecuada: 3 piezas desarrollan ideas claras y coherentes con los materiales musicales, más allá de lo declarativo." },
          { score: 4, description: "Profundidad conceptual sólida: 4 piezas evidencian consistencia entre idea, técnica, forma y escucha; el concepto organiza decisiones verificables." },
          { score: 5, description: "Profundidad conceptual alta: la mayoría de las piezas articula un universo conceptual riguroso y no superficial, materializado musicalmente de forma convincente." }
        ]
      },
      {
        id: "3.4",
        title: "3.4 Sensibilidad artística y expresividad",
        description: "Entendemos la sensibilidad artística como la capacidad de preocuparse y reflexionar por el otro, el mundo y/o sí mismo. La expresividad sería la capacidad de plasmar esa sensibilidad en una obra.",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se percibe intención expresiva; el discurso carece de dirección sensible." },
          { score: 1, description: "Expresividad muy limitada; gestos poco diferenciados o planos." },
          { score: 2, description: "Expresividad irregular; algunos momentos logrados conviven con tramos poco sensibles o rutinarios." },
          { score: 3, description: "1 pieza logra expresividad adecuada; hay intención sensible perceptible en materiales, energía y articulación." },
          { score: 4, description: "2 piezas evidencian alta sensibilidad artística; el discurso sostiene interés, contraste y afecto consistentemente." },
          { score: 5, description: "3 piezas o más alcanzan expresividad excepcional: sutileza, fuerza poética y control de lo sensible sin caer en cliché." }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "4. Adaptación al contexto y formación profesional",
    description: "La rúbrica funciona también como guía de “portafolio para circular”.",
    items: [
      {
        id: "4.1",
        title: "4.1 Competencias para ámbitos profesionales diversos",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "El portafolio no evidencia competencias transferibles a contextos profesionales; carece de pertinencia fuera del aula." },
          { score: 1, description: "Evidencias muy incipientes; las piezas no muestran claridad sobre requisitos reales de desempeño profesional." },
          { score: 2, description: "Aproximaciones parciales: algunas piezas sugieren aplicación, pero con limitaciones notorias (brief, montaje, destinatario, medio)." },
          { score: 3, description: "Pertinencia profesional adecuada: 2 piezas se alinean con al menos dos ámbitos (Academia, Concierto, Audiovisual, Interactivo y Pedagógico) y muestran comprensión de sus exigencias." },
          { score: 4, description: "Perfil versátil: 3 piezas se alinean con al menos dos ámbitos diferentes (Academia, Concierto, Audiovisual, Interactivo y Pedagógico) y responden a requerimientos concretos." },
          { score: 5, description: "Perfil profesional sólido: 4 o más piezas se alinean con al menos tres ámbitos diferentes. La propuesta evidencia oficio, criterio y proyección clara." }
        ]
      },
      {
        id: "4.2",
        title: "4.2 Adaptación al mercado laboral (versatilidad, comunicación, gestión)",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se evidencia comprensión de escenarios laborales ni estrategias de inserción profesional." },
          { score: 1, description: "Adaptación muy baja: el portafolio no se presenta como herramienta profesional (faltan datos, claridad, organización, soportes)." },
          { score: 2, description: "Adaptación limitada: hay materiales, pero carecen de enfoque hacia clientes/convocatorias/producción real." },
          { score: 3, description: "Adaptación adecuada: 1 pieza está claramente presentada para uso profesional (documentación, notas, ficha técnica, créditos, enlaces)." },
          { score: 4, description: "Adaptación alta: 2 piezas tienen presentación y documentación profesional consistente, mostrando versatilidad y comprensión de circuitos laborales." },
          { score: 5, description: "Adaptación estratégica: 3 piezas o más están listas para mercado (curaduría clara, narrativa profesional, claridad de roles/servicios, evidencia de producción y/o colaboración)." }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "5. Superación de retos formativos iniciales",
    description: "Se evalúa el progreso técnico-musical evidenciado a lo largo del portafolio.",
    items: [
      {
        id: "5.1",
        title: "5.1 Progreso técnico-musical evidenciado a lo largo del portafolio",
        minWeightConfig: 5,
        maxWeightConfig: 20,
        levels: [
          { score: 0, description: "No se evidencia progreso; las piezas mantienen limitaciones iniciales sin transformación." },
          { score: 1, description: "Progreso mínimo: cambios superficiales; persisten fallas estructurales y técnicas a lo largo del portafolio." },
          { score: 2, description: "Progreso irregular: algunas piezas muestran mejora, pero otras conservan vacíos importantes." },
          { score: 3, description: "Progreso claro: 1 pieza evidencia avances técnicos sostenidos (claridad formal, control de escritura, coherencia del material)." },
          { score: 4, description: "Progreso sostenido: 2 piezas muestran consolidación progresiva de recursos y mayor solvencia técnica." },
          { score: 5, description: "Progreso notable y consistente: 3 piezas reflejan evolución clara, madurez técnica y control cada vez más complejo del lenguaje." }
        ]
      }
    ]
  }
];