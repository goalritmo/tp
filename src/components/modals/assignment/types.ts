export interface Assignment {
  id: number
  name: string
  subject: string
  dueDate: string
  progress: number
  exercises: number
  completedExercises: number
}

export interface Exercise {
  id: number
  name: string
  completed: boolean
  description: string
  links: { text: string; url: string }[]
  attachments: { name: string; url: string }[]
}

export interface ExerciseSection {
  id: string
  name: string
  exercises: Exercise[]
}

export interface EditData {
  id: string | number
  name: string
  description?: string
  links?: { text: string; url: string }[]
  attachments?: { name: string; url: string }[]
}

export interface ItemToDelete {
  type: 'exercise' | 'link' | 'attachment'
  id?: number
  index?: number
  name?: string
}

export interface SharedGroup {
  id: number
  name: string
  avatar: string
  color: string
}

export interface Note {
  id: number
  text: string
  timestamp: string
}

export interface SectionNote {
  title: string
  content: string
}
