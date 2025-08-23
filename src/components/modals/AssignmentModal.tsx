
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
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  AvatarGroup,
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
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
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

  // Mock exercises data organized by sections
  const exerciseSections = [
    {
      id: 'teoria',
      name: 'Parte Teórica',
      exercises: [
        { 
          id: 1, 
          name: 'Ejercicio 1: Análisis de complejidad', 
          completed: true,
          description: 'Analizar la complejidad temporal y espacial de los algoritmos de ordenamiento estudiados en clase. Incluir notación Big O y casos mejor, promedio y peor.'
        },
        { 
          id: 2, 
          name: 'Ejercicio 2: Comparación de algoritmos', 
          completed: true,
          description: 'Realizar una comparación detallada entre QuickSort, MergeSort y HeapSort, incluyendo ventajas y desventajas de cada uno.'
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
          description: 'Implementar el algoritmo de QuickSort en el lenguaje de programación de su elección. El código debe estar bien documentado y seguir buenas prácticas.'
        },
        { 
          id: 4, 
          name: 'Ejercicio 4: Pruebas unitarias', 
          completed: false,
          description: 'Crear un conjunto completo de pruebas unitarias para validar la correctitud de la implementación. Incluir casos edge y casos de prueba exhaustivos.'
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
          description: 'Preparar un informe técnico que incluya el análisis teórico, la implementación, los resultados de las pruebas y las conclusiones del trabajo.'
        },
      ]
    }
  ]

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
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
                  label={`${assignment.progress}%`}
                  color={getProgressColor(assignment.progress)}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  Progreso general
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                {assignment.completedExercises} de {assignment.exercises} ejercicios completados
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={assignment.progress}
                color={getProgressColor(assignment.progress)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            {/* Shared Groups Section */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Compartido en los siguientes grupos:
                </Typography>
                {isEditing && (
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
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
                <IconButton size="small" color="primary" sx={{ width: 32, height: 32, ml: 0.5 }} onClick={handleOpenShare}>
                  <ShareIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Exercises Sections */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Ejercicios
          </Typography>
          {isEditing && (
            <IconButton size="small" color="primary">
              <AddIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        
        {exerciseSections.map((section) => (
          <Box key={section.id} sx={{ mb: 2 }}>
            {/* Section Header */}
            <ListItemButton 
              onClick={() => toggleSection(section.id)}
              sx={{ 
                px: 0, 
                py: 1, 
                borderRadius: 1,
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {expandedSections[section.id] ? (
                  <ExpandLessIcon color="primary" />
                ) : (
                  <ExpandMoreIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={section.name}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: 'medium',
                    color: 'primary.main'
                  }
                }}
              />
              {isEditing && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </ListItemButton>

            {/* Section Exercises */}
            {expandedSections[section.id] && (
              <List sx={{ pl: 2, pt: 0 }}>
                {section.exercises.map((exercise) => (
                  <Box key={exercise.id}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {exercise.completed ? (
                          <CheckCircleIcon color="success" fontSize="small" />
                        ) : (
                          <RadioButtonUncheckedIcon color="action" fontSize="small" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={exercise.name}
                        sx={{
                          '& .MuiListItemText-primary': {
                            textDecoration: exercise.completed ? 'line-through' : 'none',
                            color: exercise.completed ? 'text.secondary' : 'text.primary',
                          }
                        }}
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => toggleExercise(exercise.id)}
                        sx={{ ml: 1 }}
                      >
                        {expandedExercises[exercise.id] ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleOpenNotes(exercise.id)}
                        sx={{ ml: 0.5 }}
                      >
                        <NoteIcon fontSize="small" />
                      </IconButton>
                      {isEditing && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                          <IconButton size="small" color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </ListItem>
                    
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
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NoteIcon color="primary" />
          <Typography variant="h6">
            Notas del Ejercicio {selectedExercise}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Compartir notas vinculadas:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {sharedGroups.map((group) => (
                <Chip
                  key={group.id}
                  label={group.name}
                  size="small"
                  avatar={<Avatar sx={{ bgcolor: group.color, fontSize: '0.7rem' }}>{group.avatar}</Avatar>}
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
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
        <DialogActions>
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
    </Dialog>
  )
}
