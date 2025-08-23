
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

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
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

          {/* Progress Section */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progreso general
              </Typography>
              <Chip 
                label={`${assignment.progress}%`}
                color={getProgressColor(assignment.progress)}
                size="small"
              />
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={assignment.progress}
              color={getProgressColor(assignment.progress)}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {assignment.completedExercises} de {assignment.exercises} ejercicios completados
            </Typography>
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
    </Dialog>
  )
}
