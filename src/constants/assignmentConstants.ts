// Assignment/TP status options
export const ASSIGNMENT_STATUS = {
  IN_PROGRESS: 'En progreso',
  COMPLETED: 'Completado',
  PAUSED: 'Pausado',
  DELETED: 'Borrar',
} as const

// Assignment types
export const ASSIGNMENT_TYPES = {
  TP: 'TP',
  PRACTICE: 'Práctica',
  THEORY: 'Teoría',
} as const

// Assignment sections
export const ASSIGNMENT_SECTIONS = {
  THEORY: 'Parte Teórica',
  PRACTICE: 'Parte Práctica',
  BONUS: 'Bonus',
} as const

// Default assignment values
export const ASSIGNMENT_DEFAULTS = {
  DEADLINE: '15 de Marzo, 2025',
  PROGRESS_PERCENTAGE: 75,
  EXERCISES_COMPLETED: '6 de 8 ejercicios',
  TOTAL_EXERCISES: 8,
} as const
