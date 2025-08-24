import type { ExerciseSection, SharedGroup } from './types'

export const mockExerciseSections: ExerciseSection[] = [
  {
    id: 'teoria',
    name: 'Parte Teórica',
    exercises: [
      { 
        id: 1, 
        name: 'Ejercicio 1: Análisis de complejidad', 
        completed: true,
        description: 'Analizar la complejidad temporal y espacial de los algoritmos de ordenamiento estudiados en clase. Incluir notación Big O y casos mejor, promedio y peor.',
        links: [
          { text: 'Documentación Big O Notation', url: 'https://en.wikipedia.org/wiki/Big_O_notation' },
          { text: 'Tutorial de Algoritmos', url: 'https://www.geeksforgeeks.org/sorting-algorithms/' }
        ],
        attachments: [
          { name: 'algoritmos_complejidad.pdf', url: 'https://supabase.com/storage/v1/object/public/files/algoritmos_complejidad.pdf' },
          { name: 'ejemplos_implementacion.pdf', url: 'https://supabase.com/storage/v1/object/public/files/ejemplos_implementacion.pdf' },
          { name: 'casos_prueba.pdf', url: 'https://supabase.com/storage/v1/object/public/files/casos_prueba.pdf' }
        ]
      },
      { 
        id: 2, 
        name: 'Ejercicio 2: Comparación de algoritmos', 
        completed: true,
        description: 'Realizar una comparación detallada entre QuickSort, MergeSort y HeapSort, incluyendo ventajas y desventajas de cada uno.',
        links: [],
        attachments: []
      },
    ]
  },
  {
    id: 'practica',
    name: 'Parte Práctica',
    exercises: [
      { 
        id: 3, 
        name: 'Ejercicio 3: Implementación de algoritmo', 
        completed: true,
        description: 'Implementar el algoritmo de QuickSort en el lenguaje de programación de su elección. El código debe estar bien documentado y seguir buenas prácticas.',
        links: [],
        attachments: []
      },
      { 
        id: 4, 
        name: 'Ejercicio 4: Pruebas unitarias', 
        completed: false,
        description: 'Crear un conjunto completo de pruebas unitarias para validar la correctitud de la implementación. Incluir casos edge y casos de prueba exhaustivos.',
        links: [],
        attachments: []
      },
    ]
  },
  {
    id: 'entrega',
    name: 'Entrega',
    exercises: [
      { 
        id: 5, 
        name: 'Ejercicio 5: Documentación', 
        completed: false,
        description: 'Preparar un informe técnico que incluya el análisis teórico, la implementación, los resultados de las pruebas y las conclusiones del trabajo.',
        links: [],
        attachments: []
      },
    ]
  }
]

export const mockSharedGroups: SharedGroup[] = [
  { id: 1, name: 'Grupo Algoritmos', avatar: 'A', color: '#1976d2' },
  { id: 2, name: 'Estudiantes TP', avatar: 'E', color: '#2e7d32' },
  { id: 3, name: 'Ayudantía', avatar: 'A', color: '#ed6c02' },
]

export const mockExerciseNotes = {
  1: [
    { id: 1, text: 'Complejidad O(n log n) en promedio', timestamp: '2025-01-15T10:30:00' },
    { id: 2, text: 'Caso peor: O(n²) cuando el array está ordenado', timestamp: '2025-01-15T11:15:00' },
  ],
  2: [
    { id: 3, text: 'QuickSort es más rápido en la práctica', timestamp: '2025-01-16T09:00:00' },
  ],
  3: [
    { id: 4, text: 'Usar pivot aleatorio para evitar caso peor', timestamp: '2025-01-17T14:20:00' },
    { id: 5, text: 'Implementar con recursión de cola', timestamp: '2025-01-17T15:45:00' },
  ],
}

export const mockSectionNotes = {
  'teoria': [{ title: 'Nota general', content: 'Esta sección incluye conceptos fundamentales de algoritmos.' }],
  'practica': [{ title: 'Implementación', content: 'Código debe estar bien documentado y probado.' }],
  'entrega': [{ title: 'Formato', content: 'Entregar en PDF con código adjunto.' }]
}
