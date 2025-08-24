import { useState } from 'react'
import type { EditData, ItemToDelete } from '../types'

export function useAssignmentModal() {
  // Main modal states
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [expandedExercises, setExpandedExercises] = useState<Record<number, boolean>>({})
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set([1, 2, 3]))
  const [isMoveMode, setIsMoveMode] = useState(false)

  // Dialog states
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)

  // Confirmation modals
  const [showDeleteExerciseModal, setShowDeleteExerciseModal] = useState(false)
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false)
  const [showDeleteAttachmentModal, setShowDeleteAttachmentModal] = useState(false)
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)

  // Selection states
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [editType, setEditType] = useState<'section' | 'exercise' | null>(null)
  const [editMode, setEditMode] = useState<'exercise' | 'notes'>('exercise')
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null)
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null)

  // Data states
  const [editData, setEditData] = useState<EditData | null>(null)
  const [newSectionName, setNewSectionName] = useState('')
  const [newLinkData, setNewLinkData] = useState<{ text: string; url: string }>({ text: '', url: '' })
  const [originalNoteData, setOriginalNoteData] = useState<{ name: string; description: string } | null>(null)
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null)
  const [selectedNoteHistory, setSelectedNoteHistory] = useState<any[]>([])

  // Mock data states
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([
    { title: 'Nota importante', content: 'Esta es una nota de ejemplo con título y descripción.' }
  ])
  const [sectionNotes] = useState<Record<string, { title: string; content: string }[]>>({
    'teoria': [{ title: 'Nota general', content: 'Esta sección incluye conceptos fundamentales de algoritmos.' }],
    'practica': [{ title: 'Implementación', content: 'Código debe estar bien documentado y probado.' }],
    'entrega': [{ title: 'Formato', content: 'Entregar en PDF con código adjunto.' }]
  })
  const [shareOptions, setShareOptions] = useState({
    shareProgress: true,
    shareNotes: true
  })
  const [selectedGroups, setSelectedGroups] = useState<Set<number>>(new Set([1, 2]))

  // Mock notes data
  const exerciseNotes = {
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

  const [exerciseNotesState, setExerciseNotesState] = useState(exerciseNotes)

  return {
    // Main modal states
    isEditing,
    setIsEditing,
    expandedSections,
    setExpandedSections,
    expandedExercises,
    setExpandedExercises,
    completedExercises,
    setCompletedExercises,
    isMoveMode,
    setIsMoveMode,

    // Dialog states
    showShareDialog,
    setShowShareDialog,
    showNotesDialog,
    setShowNotesDialog,
    showEditModal,
    setShowEditModal,
    showAddSectionModal,
    setShowAddSectionModal,
    showHistoryModal,
    setShowHistoryModal,
    showAddNoteModal,
    setShowAddNoteModal,
    showAddLinkModal,
    setShowAddLinkModal,

    // Confirmation modals
    showDeleteExerciseModal,
    setShowDeleteExerciseModal,
    showDeleteLinkModal,
    setShowDeleteLinkModal,
    showDeleteAttachmentModal,
    setShowDeleteAttachmentModal,
    showDeleteConfirmModal,
    setShowDeleteConfirmModal,

    // Selection states
    selectedExercise,
    setSelectedExercise,
    selectedSection,
    setSelectedSection,
    editType,
    setEditType,
    editMode,
    setEditMode,
    editingNoteIndex,
    setEditingNoteIndex,
    itemToDelete,
    setItemToDelete,

    // Data states
    editData,
    setEditData,
    newSectionName,
    setNewSectionName,
    newLinkData,
    setNewLinkData,
    originalNoteData,
    setOriginalNoteData,
    noteToDelete,
    setNoteToDelete,
    selectedNoteHistory,
    setSelectedNoteHistory,

    // Mock data states
    notes,
    setNotes,
    sectionNotes,
    shareOptions,
    setShareOptions,
    selectedGroups,
    setSelectedGroups,
    exerciseNotesState,
    setExerciseNotesState,
  }
}
