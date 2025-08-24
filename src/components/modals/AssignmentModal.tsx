
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
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Share as ShareIcon,
  Note as NoteIcon,
  AttachFile as AttachFileIcon,
  Link as LinkIcon,
  Close as CloseAttachmentIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
  History as HistoryIcon,
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

  const [showEditModal, setShowEditModal] = useState(false)
  const [editType, setEditType] = useState<'section' | 'exercise' | null>(null)
  const [editData, setEditData] = useState<{
    id: string | number
    name: string
    description?: string
    links?: { text: string; url: string }[]
    attachments?: string[]
  } | null>(null)
  const [editMode, setEditMode] = useState<'exercise' | 'notes'>('exercise')
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedNoteHistory, setSelectedNoteHistory] = useState<any[]>([])
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([{ title: '', content: '' }])
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set([1, 2, 3]))
  
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
      attachments: string[]
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
          links: [],
          attachments: ['algoritmos_complejidad.pdf']
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

  const handleSaveExercise = (exerciseId: number, newName: string, newDescription: string, links?: { text: string; url: string }[], attachments?: string[]) => {
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

  const handleOpenHistory = (noteId: number) => {
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

  const handleAddNote = () => {
    setNotes(prev => [...prev, { title: '', content: '' }])
  }

  const handleUpdateNote = (index: number, field: 'title' | 'content', value: string) => {
    setNotes(prev => prev.map((note, i) => i === index ? { ...note, [field]: value } : note))
  }

  const handleRemoveNote = (index: number) => {
    setNotes(prev => prev.filter((_, i) => i !== index))
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

  const handleSaveEdit = () => {
    if (!editData || !editType) return

    if (editType === 'exercise') {
      handleSaveExercise(
        editData.id as number, 
        editData.name, 
        editData.description || '',
        editData.links,
        editData.attachments
      )
    } else if (editType === 'section') {
      handleSaveSection(editData.id as string, editData.name)
    }
    
    handleCloseEditModal()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && editData) {
      const fileNames = Array.from(files).map(file => file.name)
      setEditData(prev => prev ? {
        ...prev,
        attachments: [...(prev.attachments || []), ...fileNames]
      } : null)
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setEditData(prev => prev ? {
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index) || []
    } : null)
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
            <IconButton size="small" color="primary" onClick={handleOpenAddSection}>
              <AddIcon fontSize="small" />
            </IconButton>
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
              onClick={() => toggleSection(section.id)}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                px: 2, 
                py: 1, 
                borderRadius: 1,
                cursor: 'pointer'
              }}
            >
              <Box sx={{ minWidth: 36, display: 'flex', alignItems: 'center' }}>
                {expandedSections[section.id] ? (
                  <ExpandLessIcon color="primary" />
                ) : (
                  <ExpandMoreIcon color="primary" />
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
              {isEditing && !expandedSections[section.id] && (
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
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        {isEditing ? (
          <>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancelEdit}
              sx={{ textTransform: 'none' }}
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
              Notas del Ejercicio {selectedExercise}
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            color="primary"
            onClick={() => {
              setEditType('exercise')
              setEditMode('notes')
              setEditData({
                id: selectedExercise || 0,
                name: `Ejercicio ${selectedExercise}`,
                description: ''
              })
              setShowEditModal(true)
              setShowNotesDialog(false)
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1, pb: 0 }}>
          <List>
            {selectedExercise && exerciseNotes[selectedExercise as keyof typeof exerciseNotes]?.map((note) => (
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
            ))}
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
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              Compartir con grupos:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {sharedGroups.map((group) => (
                <Chip
                  key={group.id}
                  label={group.name}
                  size="medium"
                  avatar={<Avatar sx={{ bgcolor: group.color, fontSize: '0.8rem' }}>{group.avatar}</Avatar>}
                  onDelete={isEditing ? () => console.log('Remove group:', group.id) : undefined}
                />
              ))}
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Opciones de compartir:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
                <Typography variant="body2">
                  Compartir progreso del TP
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="primary" fontSize="small" />
                <Typography variant="body2">
                  Compartir notas vinculadas a ejercicios
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RadioButtonUncheckedIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Permitir edición por miembros del grupo
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
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
                : editMode === 'notes' 
                  ? 'Editar Notas' 
                  : 'Editar Ejercicio'
              }
            </Typography>
          </Box>

        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              value={editData?.name || ''}
              onChange={(e) => setEditData(prev => prev ? { ...prev, name: e.target.value } : null)}
              sx={{ mb: 0 }}
            />
            
            {editType === 'exercise' && editMode === 'exercise' && (
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
                    Enlace de referencia
                  </Typography>
                  <TextField
                    fullWidth
                    label="Texto del enlace"
                    placeholder="ej: Documentación oficial"
                    value={editData?.links?.[0]?.text || ''}
                    onChange={(e) => setEditData(prev => prev ? { 
                      ...prev, 
                      links: [{ text: e.target.value, url: prev.links?.[0]?.url || '' }]
                    } : null)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="URL"
                    placeholder="https://..."
                    value={editData?.links?.[0]?.url || ''}
                    onChange={(e) => setEditData(prev => prev ? { 
                      ...prev, 
                      links: [{ text: prev.links?.[0]?.text || '', url: e.target.value }]
                    } : null)}
                  />
                </Box>

                {/* Attachments Section */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachFileIcon fontSize="small" />
                    Archivos adjuntos
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AttachFileIcon />}
                    sx={{ mb: 2, textTransform: 'none' }}
                  >
                    Adjuntar
                    <input
                      type="file"
                      hidden
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </Button>

                  {editData?.attachments && editData.attachments.length > 0 && (
                    <Box>
                      {editData.attachments.map((fileName, index) => (
                        <Chip
                          key={index}
                          label={fileName}
                          onDelete={() => handleRemoveAttachment(index)}
                          deleteIcon={<CloseAttachmentIcon />}
                          sx={{ mr: 1, mb: 1 }}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </>
            )}

            {editType === 'exercise' && editMode === 'notes' && (
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {notes.map((note, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label={`Título de la nota ${index + 1}`}
                      placeholder="Título de la nota..."
                      value={note.title}
                      onChange={(e) => handleUpdateNote(index, 'title', e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label={`Contenido de la nota ${index + 1}`}
                      multiline
                      rows={3}
                      placeholder="Escribe una nota para este ejercicio..."
                      value={note.content}
                      onChange={(e) => handleUpdateNote(index, 'content', e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    {notes.length > 1 && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRemoveNote(index)}
                        sx={{ textTransform: 'none' }}
                      >
                        Eliminar Nota
                      </Button>
                    )}
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddNote}
                  sx={{ mt: 1, textTransform: 'none' }}
                >
                  Agregar Nota
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, pr: 3, pb: 3 }}>
          <Button onClick={handleCloseEditModal} sx={{ textTransform: 'none' }}>
            Cancelar
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
    </Dialog>
  )
}
