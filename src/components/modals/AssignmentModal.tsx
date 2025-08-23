
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
} from '@mui/material'
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
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
  const [showDelete, setShowDelete] = useState(false)
  
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

  // Mock exercises data
  const exercises = [
    { id: 1, name: 'Ejercicio 1: Análisis de complejidad', completed: true },
    { id: 2, name: 'Ejercicio 2: Implementación de algoritmo', completed: true },
    { id: 3, name: 'Ejercicio 3: Pruebas unitarias', completed: true },
    { id: 4, name: 'Ejercicio 4: Documentación', completed: true },
    { id: 5, name: 'Ejercicio 5: Presentación', completed: true },
  ]

  const handleEdit = () => {
    setShowDelete(true)
  }

  const handleDelete = () => {
    // TODO: Implementar eliminación
    console.log('Eliminar TP:', assignment.id)
    onClose()
  }

  const handleCloseModal = () => {
    setShowDelete(false)
    onClose()
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
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {assignment.name}
          </Typography>
          
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

        {/* Exercises List */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ejercicios
        </Typography>
        
        <List sx={{ pt: 0 }}>
          {exercises.map((exercise) => (
            <ListItem key={exercise.id} sx={{ px: 0, py: 1 }}>
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
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        {showDelete && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={showDelete ? <CloseIcon /> : <EditIcon />}
          onClick={showDelete ? () => setShowDelete(false) : handleEdit}
          sx={{ textTransform: 'none' }}
        >
          {showDelete ? 'Cancelar' : 'Editar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
