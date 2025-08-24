export const getProgressColor = (progress: number) => {
  if (progress === 100) return 'success'
  if (progress >= 70) return 'warning'
  return 'primary'
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  date.setDate(date.getDate() + 1) // Ajuste de timezone
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const getMotivationalMessage = (progress: number) => {
  if (progress === 100) return '¡Felicitaciones!'
  if (progress >= 70) return '¡Ya casi!'
  return ''
}

export const calculateTotalProgress = (completedExercises: Set<number>, totalExercises: number) => {
  return totalExercises > 0 ? (completedExercises.size / totalExercises) * 100 : 0
}

export const getCompletedExercisesCount = (completedExercises: Set<number>) => {
  return completedExercises.size
}

export const getTotalExercisesCount = (sections: any[]) => {
  return sections.reduce((total, section) => total + section.exercises.length, 0)
}
