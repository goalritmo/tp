
import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  AvatarGroup,
  TextField,

} from '@mui/material'
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,

  Save as SaveIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Share as ShareIcon,
  Note as NoteIcon,
  AttachFile as AttachFileIcon,
  UploadFile as UploadFileIcon,
  Link as LinkIcon,
  Close as CloseAttachmentIcon,
  Close as CloseLinkIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
  History as HistoryIcon,

  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  SwapVert as SwapVertIcon,
} from '@mui/icons-material'

interface Assignment {
  id: number
  name: string
  subject: string
  dueDate: string
  progress: number
  exercises: number
  completedExercises: number
}

interface AssignmentModalProps {
  open: boolean
  onClose: () => void
  assignment: Assignment | null
}

export default function AssignmentModal({ open, onClose, assignment }: AssignmentModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [expandedExercises, setExpandedExercises] = useState<Record<number, boolean>>({})
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const [showEditModal, setShowEditModal] = useState(false)
  const [editType, setEditType] = useState<'section' | 'exercise' | null>(null)
  const [editData, setEditData] = useState<{
    id: string | number
    name: string
    description?: string
    links?: { text: string; url: string }[]
    attachments?: { name: string; url: string }[]
  } | null>(null)
  const [editMode, setEditMode] = useState<'exercise' | 'notes'>('exercise')
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedNoteHistory, setSelectedNoteHistory] = useState<any[]>([])
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([
    { title: 'Nota importante', content: 'Esta es una nota de ejemplo con título y descripción.' }
  ])
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set([1, 2, 3]))
  const [sectionNotes] = useState<Record<string, { title: string; content: string }[]>>({
    'teoria': [{ title: 'Nota general', content: 'Esta sección incluye conceptos fundamentales de algoritmos.' }],
    'practica': [{ title: 'Implementación', content: 'Código debe estar bien documentado y probado.' }],
    'entrega': [{ title: 'Formato', content: 'Entregar en PDF con código adjunto.' }]
  })
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [shareOptions, setShareOptions] = useState({
    shareProgress: true,
    shareNotes: true
  })
  const [selectedGroups, setSelectedGroups] = useState<Set<number>>(new Set([1, 2]))
  const [originalNoteData, setOriginalNoteData] = useState<{ name: string; description: string } | null>(null)
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null)
  const [showAddLinkModal, setShowAddLinkModal] = useState(false)
  const [newLinkData, setNewLinkData] = useState<{ text: string; url: string }>({ text: '', url: '' })
  const [isMoveMode, setIsMoveMode] = useState(false)
  const [showDeleteExerciseModal, setShowDeleteExerciseModal] = useState(false)
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false)
  const [showDeleteAttachmentModal, setShowDeleteAttachmentModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: 'exercise' | 'link' | 'attachment'; id?: number; index?: number; name?: string } | null>(null)

  
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
    4: [
      { id: 6, text: 'Probar con arrays vacíos y de un elemento', timestamp: '2025-01-18T16:30:00' },
    ],
    5: [
      { id: 7, text: 'Incluir gráficos de comparación de tiempos', timestamp: '2025-01-19T12:00:00' },
    ],
  }
  
  const [exerciseNotesState, setExerciseNotesState] = useState(exerciseNotes)
  
  // Mock exercises data organized by sections
  const [exerciseSections, setExerciseSections] = useState<{
    id: string
    name: string
    exercises: {
      id: number
      name: string
      completed: boolean
      description: string
      links: { text: string; url: string }[]
      attachments: { name: string; url: string }[]
    }[]
  }[]>([
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
  ])
  
  if (!assignment) return null

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success'
    if (progress >= 70) return 'warning'
    return 'primary'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1) // Ajuste de timezone
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Mock shared groups data
  const sharedGroups = [
    { id: 1, name: 'Grupo Algoritmos', avatar: 'A', color: '#1976d2' },
    { id: 2, name: 'Estudiantes TP', avatar: 'E', color: '#2e7d32' },
    { id: 3, name: 'Ayudantía', avatar: 'A', color: '#ed6c02' },
  ]

  const handleEdit = () => {
    setIsEditing(true)
    // Expandir todas las secciones al entrar en modo edición
    const allSections = exerciseSections.map(section => section.id)
    
    setExpandedSections(
      allSections.reduce((acc, sectionId) => ({ ...acc, [sectionId]: true }), {})
    )
    setExpandedExercises({})
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setIsMoveMode(false)
  }

  const handleToggleMoveMode = () => {
    if (!isMoveMode) {
      // Al activar el modo de mover, plegar todas las secciones
      setExpandedSections({})
    }
    setIsMoveMode(!isMoveMode)
  }





  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    setExerciseSections(prev => {
      const currentIndex = prev.findIndex(section => section.id === sectionId)
      if (currentIndex === -1) return prev

      const newSections = [...prev]
      if (direction === 'up' && currentIndex > 0) {
        // Mover hacia arriba
        [newSections[currentIndex], newSections[currentIndex - 1]] = [newSections[currentIndex - 1], newSections[currentIndex]]
      } else if (direction === 'down' && currentIndex < newSections.length - 1) {
        // Mover hacia abajo
        [newSections[currentIndex], newSections[currentIndex + 1]] = [newSections[currentIndex + 1], newSections[currentIndex]]
      }
      return newSections
    })
  }

  const handleSaveChanges = () => {
    // TODO: Guardar cambios en el backend
    console.log('Guardando cambios del TP:', assignment.id)
    setIsEditing(false)
  }

  const handleDelete = () => {
    // TODO: Implementar eliminación
    console.log('Eliminar TP:', assignment.id)
    onClose()
  }

  const handleCloseModal = () => {
    setIsEditing(false)
    setIsMoveMode(false)
    setExpandedSections({})
    setExpandedExercises({})
    onClose()
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const toggleExercise = (exerciseId: number) => {
    setExpandedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }))
  }

  const handleOpenNotes = (exerciseId: number) => {
    setSelectedExercise(exerciseId)
    // Find the section that contains this exercise
    const section = exerciseSections.find(sec => sec.exercises.some(ex => ex.id === exerciseId))
    setSelectedSection(section?.id || null)
    setShowNotesDialog(true)
  }

  const handleOpenShare = () => {
    setShowShareDialog(true)
  }

  const handleCloseShare = () => {
    setShowShareDialog(false)
  }

  const handleCloseNotes = () => {
    setShowNotesDialog(false)
    setSelectedExercise(null)
    setSelectedSection(null)
  }

  const handleEditExercise = (exerciseId: number) => {
    const exercise = exerciseSections
      .flatMap(section => section.exercises)
      .find(ex => ex.id === exerciseId)
    
    if (exercise) {
      setEditData({
        id: exerciseId,
        name: exercise.name,
        description: exercise.description,
        links: exercise.links || [],
        attachments: exercise.attachments || []
      })
      setEditType('exercise')
      setShowEditModal(true)
    }
  }

  const handleEditSection = (sectionId: string) => {
    const section = exerciseSections.find(sec => sec.id === sectionId)
    
    if (section) {
      setEditData({
        id: sectionId,
        name: section.name
      })
      setEditType('section')
      setShowEditModal(true)
    }
  }

  const handleSaveExercise = (exerciseId: number, newName: string, newDescription: string, links?: { text: string; url: string }[], attachments?: { name: string; url: string }[]) => {
    setExerciseSections(prev => prev.map(section => ({
      ...section,
      exercises: section.exercises.map(exercise => 
        exercise.id === exerciseId 
          ? { 
              ...exercise, 
              name: newName, 
              description: newDescription,
              links: links || exercise.links,
              attachments: attachments || exercise.attachments
            }
          : exercise
      )
    })))
  }

  const handleSaveSection = (sectionId: string, newName: string) => {
    setExerciseSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, name: newName }
        : section
    ))
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditType(null)
    setEditData(null)
  }

  const handleOpenAddSection = () => {
    setShowAddSectionModal(true)
  }

  const handleCloseAddSection = () => {
    setShowAddSectionModal(false)
    setNewSectionName('')
  }

  const handleAddSection = () => {
    if (newSectionName.trim()) {
      const newSection = {
        id: `section-${Date.now()}`,
        name: newSectionName.trim(),
        exercises: []
      }
      setExerciseSections(prev => [...prev, newSection])
      handleCloseAddSection()
    }
  }

  const handleOpenHistory = (_noteId: number) => {
    // Mock historial de cambios para la nota
    const mockHistory = [
      {
        id: 1,
        text: 'Nota original creada',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
        type: 'created'
      },
      {
        id: 2,
        text: 'Nota modificada por primera vez',
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 horas atrás
        type: 'modified'
      },
      {
        id: 3,
        text: 'Nota actualizada con nueva información',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
        type: 'modified'
      }
    ]
    setSelectedNoteHistory(mockHistory)
    setShowHistoryModal(true)
  }

  const handleCloseHistory = () => {
    setShowHistoryModal(false)
    setSelectedNoteHistory([])
  }



  const handleToggleExercise = (exerciseId: number) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev)
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId)
      } else {
        newSet.add(exerciseId)
      }
      return newSet
    })
  }

  const calculateProgress = () => {
    const totalExercises = exerciseSections.reduce((total, section) => total + section.exercises.length, 0)
    const completedCount = completedExercises.size
    return totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
  }

  const getCompletedCount = () => {
    return completedExercises.size
  }

  const getTotalExercises = () => {
    return exerciseSections.reduce((total, section) => total + section.exercises.length, 0)
  }

  const handleToggleShareOption = (option: 'shareProgress' | 'shareNotes') => {
    setShareOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const handleRemoveGroup = (groupId: number) => {
    setSelectedGroups(prev => {
      const newSet = new Set(prev)
      newSet.delete(groupId)
      return newSet
    })
  }

  const handleAddGroup = () => {
    // Mock function - in real app would open a group selector
    console.log('Add group functionality')
  }

  const handleBackToNotes = () => {
    setShowEditModal(false)
    setShowNotesDialog(true)
    setEditingNoteIndex(null)
  }

  const handleEditNote = (index: number) => {
    setEditingNoteIndex(index)
    setEditData({
      id: index,
      name: notes[index].title,
      description: notes[index].content
    })
    setOriginalNoteData({
      name: notes[index].title,
      description: notes[index].content
    })
    setEditType('exercise')
    setEditMode('notes')
    setShowEditModal(true)
    setShowNotesDialog(false)
  }

  const handleEditExerciseNote = (noteId: number) => {
    if (!selectedExercise) return
    
    const exerciseNote = exerciseNotesState[selectedExercise as keyof typeof exerciseNotesState]?.find(note => note.id === noteId)
    if (exerciseNote) {
      setEditingNoteIndex(noteId)
      setEditData({
        id: noteId,
        name: exerciseNote.text,
        description: exerciseNote.text // Las notas de ejercicio solo tienen texto, no título separado
      })
      setOriginalNoteData({
        name: exerciseNote.text,
        description: exerciseNote.text
      })
      setEditType('exercise')
      setEditMode('notes')
      setShowEditModal(true)
      setShowNotesDialog(false)
    }
  }

  const handleDeleteNote = (index: number) => {
    setNoteToDelete(index)
    setShowDeleteConfirmModal(true)
  }

  const handleConfirmDeleteNote = () => {
    if (noteToDelete !== null) {
      setNotes(prev => prev.filter((_, i) => i !== noteToDelete))
      setEditingNoteIndex(null)
      setShowEditModal(false)
      setShowNotesDialog(true)
      setShowDeleteConfirmModal(false)
      setNoteToDelete(null)
    }
  }

  const handleCancelDeleteNote = () => {
    setShowDeleteConfirmModal(false)
    setNoteToDelete(null)
  }

  const handleOpenAddNote = () => {
    setEditData({
      id: -1,
      name: '',
      description: ''
    })
    setShowAddNoteModal(true)
    setShowNotesDialog(false)
  }

  const handleCloseAddNote = () => {
    setShowAddNoteModal(false)
    setShowNotesDialog(true)
  }

  const handleCloseAddLink = () => {
    setShowAddLinkModal(false)
    setNewLinkData({ text: '', url: '' })
  }

  const handleSaveAddLink = () => {
    if (newLinkData.url.trim()) {
      const newLink = {
        text: newLinkData.text.trim() || newLinkData.url.trim(),
        url: newLinkData.url.trim()
      }
      setEditData(prev => prev ? {
        ...prev,
        links: [...(prev.links || []), newLink]
      } : null)
      handleCloseAddLink()
    }
  }

  const handleSaveAddNote = () => {
    if (editData && editData.name.trim()) {
      setNotes(prev => [...prev, { 
        title: editData.name, 
        content: editData.description || '' 
      }])
      setShowAddNoteModal(false)
      setShowNotesDialog(true)
    }
  }

  const handleOpenSectionNotes = (sectionId: string) => {
    setSelectedExercise(null)
    setSelectedSection(sectionId)
    setShowNotesDialog(true)
    // Set notes for the section
    setNotes(sectionNotes[sectionId] || [{ title: '', content: '' }])
  }

  const handleSaveEdit = () => {
    if (!editData || !editType) return

    if (editType === 'exercise' && editMode === 'notes' && editingNoteIndex !== null) {
      // Save individual note - check if it's a section note or exercise note
      if (selectedExercise) {
        // Save exercise note
        setExerciseNotesState(prev => ({
          ...prev,
          [selectedExercise]: prev[selectedExercise as keyof typeof prev].map((note: { id: number; text: string; timestamp: string }) => 
            note.id === editingNoteIndex 
              ? { 
                  ...note, 
                  text: editData.description || editData.name || ''
                }
              : note
          )
        }))
      } else {
        // Save section note
        setNotes(prev => prev.map((note, index) => 
          index === editingNoteIndex 
            ? { 
                title: editData.name, 
                content: editData.description || '',
                description: editData.description || ''
              }
            : note
        ))
      }
      setEditingNoteIndex(null)
      setShowEditModal(false)
      setShowNotesDialog(true)
    } else if (editType === 'exercise') {
      handleSaveExercise(
        editData.id as number, 
        editData.name, 
        editData.description || '',
        editData.links,
        editData.attachments
      )
      handleCloseEditModal()
    } else if (editType === 'section') {
      handleSaveSection(editData.id as string, editData.name)
      handleCloseEditModal()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && editData) {
      const newAttachments = Array.from(files).map(file => ({
        name: file.name,
        url: `https://supabase.com/storage/v1/object/public/files/${file.name}`
      }))
      setEditData(prev => prev ? {
        ...prev,
        attachments: [...(prev.attachments || []), ...newAttachments]
      } : null)
    }
  }

  const handleRemoveAttachment = (index: number) => {
                const attachment = editData?.attachments?.[index]
            if (attachment) {
              setItemToDelete({ type: 'attachment', index, name: attachment.name })
      setShowDeleteAttachmentModal(true)
    }
  }

  const handleDeleteExercise = () => {
    if (editData) {
      setItemToDelete({ type: 'exercise', id: editData.id as number, name: editData.name })
      setShowDeleteExerciseModal(true)
    }
  }

  const handleDeleteLink = (index: number) => {
    const link = editData?.links?.[index]
    if (link) {
      setItemToDelete({ type: 'link', index, name: link.text || link.url })
      setShowDeleteLinkModal(true)
    }
  }

  const handleConfirmDelete = () => {
    if (!itemToDelete) return

    switch (itemToDelete.type) {
      case 'exercise':
        console.log('Delete exercise:', itemToDelete.id)
        handleCloseEditModal()
        break
      case 'link':
        if (itemToDelete.index !== undefined) {
          const newLinks = editData?.links?.filter((_, i) => i !== itemToDelete.index) || []
          setEditData(prev => prev ? { ...prev, links: newLinks } : null)
        }
        break
      case 'attachment':
        if (itemToDelete.index !== undefined) {
          setEditData(prev => prev ? {
            ...prev,
            attachments: prev.attachments?.filter((_, i) => i !== itemToDelete.index) || []
          } : null)
        }
        break
    }

    // Close all modals
    setShowDeleteExerciseModal(false)
    setShowDeleteLinkModal(false)
    setShowDeleteAttachmentModal(false)
    setItemToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteExerciseModal(false)
    setShowDeleteLinkModal(false)
    setShowDeleteAttachmentModal(false)
    setItemToDelete(null)
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
      keepMounted
      disableEscapeKeyDown={false}
      sx={{ zIndex: 10000 }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon color="primary" />
          <Typography variant="h6" component="span">
            Detalles del TP
          </Typography>
        </Box>
        <IconButton onClick={handleCloseModal} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2 }}>
        {/* Assignment Info */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {assignment.name}
            </Typography>
            {isEditing && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" color="primary">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={handleDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SchoolIcon fontSize="small" color="action" />
            <Typography variant="body1" color="text.secondary">
              {assignment.subject}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CalendarIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Fecha límite: {formatDate(assignment.dueDate)}
            </Typography>
          </Box>

          {/* Progress and Groups Section */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 2, 
            mb: 2 
          }}>
            {/* Progress Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip 
                  label={`${calculateProgress()}%`}
                  color={getProgressColor(calculateProgress())}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  Progreso general
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                {getCompletedCount()} de {getTotalExercises()} ejercicios completados
                {calculateProgress() === 100 && (
                  <Box component="span" sx={{ ml: 1, color: 'success.main', fontWeight: 'bold' }}>
                    ¡Felicitaciones!
                  </Box>
                )}
                {calculateProgress() >= 70 && calculateProgress() < 100 && (
                  <Box component="span" sx={{ ml: 1, color: 'warning.main', fontWeight: 'bold' }}>
                    ¡Ya casi!
                  </Box>
                )}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress()}
                color={getProgressColor(calculateProgress())}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            {/* Shared Groups Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Compartido en los siguientes grupos:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AvatarGroup 
                  max={4} 
                  sx={{ 
                    '& .MuiAvatar-root': { 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }
                  }}
                >
                  {sharedGroups.map((group) => (
                    <Avatar
                      key={group.id}
                      sx={{ 
                        bgcolor: group.color,
                      }}
                    >
                      {group.avatar}
                    </Avatar>
                  ))}
                </AvatarGroup>
                {isEditing && (
                  <IconButton size="small" color="primary" sx={{ width: 32, height: 32, ml: 0.5 }} onClick={handleOpenShare}>
                    <ShareIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Exercises Sections */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Secciones
          </Typography>
          {isEditing && (
            <>
              {(
                <IconButton size="small" color="primary" onClick={handleToggleMoveMode}>
                  <SwapVertIcon fontSize="small" />
                </IconButton>
              )}
              {!isMoveMode && (
                <IconButton size="small" color="primary" onClick={handleOpenAddSection}>
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </>
          )}
        </Box>
        
        {exerciseSections.map((section) => (
          <Box 
            key={section.id} 
            sx={{ 
              mb: 2,
              borderRadius: 1,
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            {/* Section Header */}
            <Box 
              onClick={!isMoveMode ? () => toggleSection(section.id) : undefined}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                px: 2, 
                py: 1, 
                borderRadius: 1,
                cursor: isMoveMode ? 'default' : 'pointer'
              }}
            >
              <Box sx={{ minWidth: 36, display: 'flex', alignItems: 'center' }}>
                {!isMoveMode && (
                  expandedSections[section.id] ? (
                    <ExpandLessIcon color="primary" />
                  ) : (
                    <ExpandMoreIcon color="primary" />
                  )
                )}
              </Box>
              <Typography 
                variant="body1"
                sx={{
                  fontWeight: 'medium',
                  color: 'primary.main'
                }}
              >
                {section.name}
              </Typography>

              {!isEditing && !expandedSections[section.id] && (
                <IconButton 
                  size="small" 
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenSectionNotes(section.id)
                  }}
                  sx={{ ml: 0.5 }}
                >
                  <NoteIcon fontSize="small" />
                </IconButton>
              )}
              {isEditing && !expandedSections[section.id] && !isMoveMode && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSection(section.id)
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Delete section:', section.id)
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              {isEditing && isMoveMode && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoveSection(section.id, 'up')
                    }}
                    disabled={exerciseSections.indexOf(section) === 0}
                  >
                    <KeyboardArrowUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoveSection(section.id, 'down')
                    }}
                    disabled={exerciseSections.indexOf(section) === exerciseSections.length - 1}
                  >
                    <KeyboardArrowDownIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>

                        {/* Section Exercises */}
            {expandedSections[section.id] && (
              <List sx={{ pl: 2, pt: 0 }}>
                {section.exercises.map((exercise) => (
                  <Box key={exercise.id}>
                    <Box 
                      onClick={() => handleToggleExercise(exercise.id)}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        px: 2, 
                        py: 1, 
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover !important' }
                      }}
                    >
                      <Box sx={{ minWidth: 36, display: 'flex', alignItems: 'center' }}>
                        {completedExercises.has(exercise.id) ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <RadioButtonUncheckedIcon color="action" fontSize="small" />
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Typography 
                          variant="body1"
                          sx={{
                            textDecoration: completedExercises.has(exercise.id) ? 'line-through' : 'none',
                            color: completedExercises.has(exercise.id) ? 'text.secondary' : 'text.primary'
                          }}
                        >
                          {exercise.name}
                        </Typography>
                        {!isEditing && (
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenNotes(exercise.id)
                            }}
                            sx={{ ml: 0.5 }}
                          >
                            <NoteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      {!isEditing && (
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleExercise(exercise.id)
                          }}
                          sx={{ ml: 1 }}
                        >
                          {expandedExercises[exercise.id] ? (
                            <ExpandLessIcon fontSize="small" />
                          ) : (
                            <ExpandMoreIcon fontSize="small" />
                          )}
                        </IconButton>
                      )}
                      {isEditing && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditExercise(exercise.id)
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log('Delete exercise:', exercise.id)
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    
                    {/* Exercise Description */}
                    {expandedExercises[exercise.id] && (
                      <Box sx={{ pl: 5, pr: 2, pb: 2 }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            fontStyle: 'italic',
                            backgroundColor: 'action.hover',
                            p: 2,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          {exercise.description}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </List>
            )}
          </Box>
        ))}
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions sx={{ px: 4, py: 3, gap: 1 }}>
        {isEditing ? (
          <>
            <Button
              variant="outlined"
              onClick={handleCancelEdit}
              sx={{ 
                textTransform: 'none',
                color: 'primary.main',
                borderColor: 'primary.main',
                backgroundColor: 'transparent',
                '&:hover': { 
                  backgroundColor: 'primary.100',
                  color: 'primary.main'
                }
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
              sx={{ textTransform: 'none' }}
            >
              Confirmar Cambios
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ textTransform: 'none' }}
          >
            Editar
          </Button>
        )}
      </DialogActions>

      {/* Notes Dialog */}
      <Dialog 
        open={showNotesDialog} 
        onClose={handleCloseNotes}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10001 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 3, pb: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NoteIcon color="primary" />
            <Typography variant="h6">
              {selectedExercise 
                ? `Notas del Ejercicio: ${exerciseSections.flatMap(section => section.exercises).find(ex => ex.id === selectedExercise)?.name || selectedExercise}`
                : `Notas de la Sección: ${exerciseSections.find(sec => sec.id === selectedSection)?.name || ''}`
              }
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            color="primary"
            onClick={handleOpenAddNote}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 0 }}>
          <List>
            {selectedExercise ? (
              // Exercise notes
              exerciseNotesState[selectedExercise as keyof typeof exerciseNotesState]?.map((note) => (
                <ListItem key={note.id} sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary={note.text}
                    secondary={new Date(note.timestamp).toLocaleString('es-ES')}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                      },
                      '& .MuiListItemText-secondary': {
                        fontSize: '0.7rem',
                      }
                    }}
                  />
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleEditExerciseNote(note.id)}
                    sx={{ mr: 0.5 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleOpenHistory(note.id)}
                    sx={{ mr: 0.5 }}
                  >
                    <HistoryIcon fontSize="small" />
                  </IconButton>
                  {isEditing && (
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
              ))
            ) : (
              // Section notes
              notes.map((note, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary={note.title}
                    secondary={note.content}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      },
                      '& .MuiListItemText-secondary': {
                        fontSize: '0.8rem',
                      }
                    }}
                  />
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleEditNote(index)}
                    sx={{ mr: 0.5 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleOpenHistory(index)}
                    sx={{ mr: 0.5 }}
                  >
                    <HistoryIcon fontSize="small" />
                  </IconButton>
                  {isEditing && (
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
              ))
            )}
          </List>
          {isEditing && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Agregar Nota
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ pt: 1 }}>
          <Button onClick={handleCloseNotes} sx={{ textTransform: 'none' }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog 
        open={showShareDialog} 
        onClose={handleCloseShare}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10001 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShareIcon color="primary" />
          <Typography variant="h6">
            Compartir TP
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              Compartir con grupos:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {sharedGroups.filter(group => selectedGroups.has(group.id)).map((group) => (
                <Chip
                  key={group.id}
                  label={group.name}
                  size="medium"
                  avatar={<Avatar sx={{ bgcolor: group.color, fontSize: '0.8rem' }}>{group.avatar}</Avatar>}
                  onDelete={() => handleRemoveGroup(group.id)}
                />
              ))}
              <IconButton color="primary" onClick={handleAddGroup}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mb: 0 }}>
            <Typography variant="body1" gutterBottom>
              Opciones de compartir:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box 
                sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                onClick={() => handleToggleShareOption('shareProgress')}
              >
                {shareOptions.shareProgress ? (
                  <CheckCircleIcon color="primary" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon color="action" fontSize="small" />
                )}
                <Typography variant="body2" color={shareOptions.shareProgress ? 'text.primary' : 'text.secondary'}>
                  Compartir progreso del TP
                </Typography>
              </Box>
              <Box 
                sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                onClick={() => handleToggleShareOption('shareNotes')}
              >
                {shareOptions.shareNotes ? (
                  <CheckCircleIcon color="primary" fontSize="small" />
                ) : (
                  <RadioButtonUncheckedIcon color="action" fontSize="small" />
                )}
                <Typography variant="body2" color={shareOptions.shareNotes ? 'text.primary' : 'text.secondary'}>
                  Compartir notas vinculadas a secciones y ejercicios
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pt: 1, pb: 3, pr: 3 }}>
          <Button onClick={handleCloseShare} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button variant="contained" sx={{ textTransform: 'none' }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog 
        open={showEditModal} 
        onClose={handleCloseEditModal}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10002 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditIcon color="primary" />
            <Typography variant="h6">
              {editType === 'section' 
                ? 'Editar Sección' 
                : editMode === 'notes' && editingNoteIndex !== null
                  ? selectedExercise === null 
                    ? `Editar Nota de la Sección: ${exerciseSections.find(sec => sec.id === selectedSection)?.name || ''}`
                    : `Editar Nota del Ejercicio: ${exerciseSections.flatMap(section => section.exercises).find(ex => ex.id === selectedExercise)?.name || selectedExercise}`
                  : editMode === 'notes'
                    ? 'Editar Notas'
                    : 'Editar Ejercicio'
              }
            </Typography>
          </Box>
          {editMode === 'notes' && editingNoteIndex !== null && (
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDeleteNote(editingNoteIndex)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          {editType === 'exercise' && editMode !== 'notes' && (
            <IconButton
              color="error"
              size="small"
              onClick={handleDeleteExercise}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent sx={{ pb: editMode === 'notes' && editingNoteIndex !== null ? 0 : 3 }}>
          <Box sx={{ mt: editMode === 'notes' ? 0 : 2 }}>
            {editMode !== 'notes' && (
              <TextField
                fullWidth
                label="Nombre"
                value={editData?.name || ''}
                onChange={(e) => setEditData(prev => prev ? { ...prev, name: e.target.value } : null)}
                sx={{ mb: 2 }}
              />
            )}
            
            {editType === 'exercise' && editMode !== 'notes' && (
              <>
                <TextField
                  fullWidth
                  label="Descripción"
                  multiline
                  rows={4}
                  value={editData?.description || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, description: e.target.value } : null)}
                  sx={{ mb: 3 }}
                />

                {/* Link Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkIcon fontSize="small" />
                    Links
                  </Typography>
                  
                  {editData?.links && editData.links.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      {editData.links.map((link, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 1,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: 'action.hover',
                            '&:hover': { backgroundColor: 'action.selected' }
                          }}
                        >
                          <Typography
                            component="a"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              color: 'primary.main',
                              textDecoration: 'none',
                              cursor: 'pointer',
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            {link.text || link.url}
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{ color: 'text.secondary' }}
                            onClick={() => handleDeleteLink(index)}
                          >
                            <CloseLinkIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                  
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    size="small"
                    sx={{ textTransform: 'none' }}
                    onClick={() => {
                      setShowAddLinkModal(true)
                    }}
                  >
                    Agregar Link
                  </Button>
                </Box>

                {/* Attachments Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachFileIcon fontSize="small" />
                    Archivos adjuntos
                  </Typography>
                  
                  {editData?.attachments && editData.attachments.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      {editData.attachments.map((attachment, index) => (
                        <Chip
                          key={index}
                          label={attachment.name}
                          onClick={() => window.open(attachment.url, '_blank')}
                          onDelete={() => handleRemoveAttachment(index)}
                          deleteIcon={<CloseAttachmentIcon />}
                          sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}

                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Subir Archivo
                    <input
                      type="file"
                      hidden
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Box>
              </>
            )}

            {editType === 'exercise' && editMode === 'notes' && editingNoteIndex !== null && (
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <TextField
                  fullWidth
                  label="Título de la nota"
                  placeholder="Título de la nota..."
                  value={editData?.name || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, name: e.target.value } : null)}
                  sx={{ mb: 2, mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Contenido de la nota"
                  multiline
                  rows={4}
                  placeholder="Escribe el contenido de la nota..."
                  value={editData?.description || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, description: e.target.value } : null)}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 0, pr: 3, pb: 3 }}>
          <Button onClick={editMode === 'notes' && editingNoteIndex !== null ? handleBackToNotes : handleCloseEditModal} sx={{ textTransform: 'none' }}>
            {editMode === 'notes' && editingNoteIndex !== null 
              ? ((editData?.name?.trim() !== originalNoteData?.name?.trim() || editData?.description?.trim() !== originalNoteData?.description?.trim()) ? 'Cancelar' : 'Volver')
              : 'Cancelar'
            }
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveEdit}
            sx={{ textTransform: 'none' }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Link Modal */}
      <Dialog 
        open={showAddLinkModal} 
        onClose={handleCloseAddLink}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10004 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon color="primary" />
          <Typography variant="h6">
            Agregar Link
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="URL"
              placeholder="https://..."
              value={newLinkData.url}
              onChange={(e) => setNewLinkData(prev => ({ ...prev, url: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Texto del enlace (opcional)"
              placeholder="ej: Documentación oficial"
              value={newLinkData.text}
              onChange={(e) => setNewLinkData(prev => ({ ...prev, text: e.target.value }))}
              sx={{ mb: 0 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1, pt: 2, pb: 2 }}>
          <Button onClick={handleCloseAddLink} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAddLink}
            sx={{ textTransform: 'none' }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Section Modal */}
      <Dialog 
        open={showAddSectionModal} 
        onClose={handleCloseAddSection}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10003 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon color="primary" />
          <Typography variant="h6">
            Agregar Nueva Sección
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 1 }}>
          <Box sx={{ mt: 0.5 }}>
            <TextField
              fullWidth
              label="Nombre de la sección"
              placeholder="ej: Parte Teórica, Parte Práctica..."
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              sx={{ mb: 0 }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddSection()
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, pr: 3, pb: 3 }}>
          <Button onClick={handleCloseAddSection} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddSection}
            disabled={!newSectionName.trim()}
            sx={{ textTransform: 'none' }}
          >
            Agregar Sección
          </Button>
        </DialogActions>
      </Dialog>

      {/* History Modal */}
      <Dialog 
        open={showHistoryModal} 
        onClose={handleCloseHistory}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10004 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 3, pb: 0 }}>
          <HistoryIcon color="primary" />
          <Typography variant="h6">
            Historial de Cambios
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 0 }}>
          <List>
            {selectedNoteHistory.map((change) => (
              <ListItem key={change.id} sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {change.type === 'created' ? (
                    <AddIcon color="action" fontSize="small" />
                  ) : (
                    <EditIcon color="action" fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={change.text}
                  secondary={new Date(change.timestamp).toLocaleString('es-ES')}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.9rem',
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '0.7rem',
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ pt: 1 }}>
          <Button onClick={handleCloseHistory} sx={{ textTransform: 'none' }}>
            Volver
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Note Modal */}
      <Dialog 
        open={showAddNoteModal} 
        onClose={handleCloseAddNote}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10005 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon color="primary" />
          <Typography variant="h6">
            {selectedExercise 
              ? `Agregar Nota del Ejercicio: ${exerciseSections.flatMap(section => section.exercises).find(ex => ex.id === selectedExercise)?.name || selectedExercise}`
              : `Agregar Nota en la Sección: ${exerciseSections.find(sec => sec.id === selectedSection)?.name || ''}`
            }
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={editData?.name?.trim() ? undefined : "Título de la nota"}
              placeholder="Título de la nota..."
              value={editData?.name || ''}
              onChange={(e) => setEditData(prev => prev ? { ...prev, name: e.target.value } : null)}
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField
              fullWidth
              label="Contenido de la nota"
              multiline
              rows={4}
              placeholder="Escribe una nota para este ejercicio..."
              value={editData?.description || ''}
              onChange={(e) => setEditData(prev => prev ? { ...prev, description: e.target.value } : null)}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, pr: 3, pb: 3 }}>
          <Button onClick={handleCloseAddNote} sx={{ textTransform: 'none' }}>
            {(editData?.name?.trim() || editData?.description?.trim()) ? 'Cancelar' : 'Volver'}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAddNote}
            disabled={!editData?.name?.trim()}
            sx={{ textTransform: 'none' }}
          >
            Agregar Nota
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog 
        open={showDeleteConfirmModal} 
        onClose={handleCancelDeleteNote}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10006 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 3 }}>
          <DeleteIcon color="error" />
          <Typography variant="h6">
            Confirmar Eliminación
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 0 }}>
          <Typography>
            ¿Estás seguro de que quieres eliminar esta nota? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1, pr: 3, pb: 3 }}>
          <Button onClick={handleCancelDeleteNote} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleConfirmDeleteNote}
            sx={{ textTransform: 'none' }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Exercise Confirmation Modal */}
      <Dialog 
        open={showDeleteExerciseModal} 
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10007 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 3 }}>
          <DeleteIcon color="error" />
          <Typography variant="h6">
            Eliminar Ejercicio
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 0 }}>
          <Typography>
            ¿Estás seguro de que quieres eliminar el ejercicio <strong>"{itemToDelete?.name}"</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1, pr: 3, pb: 3 }}>
          <Button onClick={handleCancelDelete} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar Ejercicio
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Link Confirmation Modal */}
      <Dialog 
        open={showDeleteLinkModal} 
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10007 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 3 }}>
          <DeleteIcon color="error" />
          <Typography variant="h6">
            Eliminar Link
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 0 }}>
          <Typography>
            ¿Estás seguro de que quieres eliminar el link <strong>"{itemToDelete?.name}"</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1, pr: 3, pb: 3 }}>
          <Button onClick={handleCancelDelete} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Attachment Confirmation Modal */}
      <Dialog 
        open={showDeleteAttachmentModal} 
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
        keepMounted
        disableEscapeKeyDown={false}
        sx={{ zIndex: 10007 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 3 }}>
          <DeleteIcon color="error" />
          <Typography variant="h6">
            Eliminar Archivo
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 0 }}>
          <Typography>
            ¿Estás seguro de que quieres eliminar el archivo <strong>"{itemToDelete?.name}"</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1, pr: 3, pb: 3 }}>
          <Button onClick={handleCancelDelete} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar Archivo
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}
