import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material'
import {
  Close as CloseIcon,
  Add as AddIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material'

interface AddAssignmentModalProps {
  open: boolean
  onClose: () => void
  onSave: (assignment: {
    name: string
    subject: string
    dueDate: string
    description: string
  }) => void
}

// Mock subjects - esto podría venir de una API
const mockSubjects = [
  'Algoritmos y Estructuras de Datos',
  'Programación Orientada a Objetos',
  'Bases de Datos',
  'Sistemas Operativos',
  'Redes de Computadoras',
  'Inteligencia Artificial',
  'Desarrollo Web',
  'Ingeniería de Software',
]

export default function AddAssignmentModal({ open, onClose, onSave }: AddAssignmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    dueDate: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.subject) {
      newErrors.subject = 'La materia es requerida'
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'La fecha límite es requerida'
    } else {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.dueDate = 'La fecha límite no puede ser anterior a hoy'
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      subject: '',
      dueDate: '',
      description: '',
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      keepMounted
      disableEscapeKeyDown={false}
      sx={{ zIndex: 10010 }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon color="primary" />
          <Typography variant="h6">
            Crear Nuevo Trabajo Práctico
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 0 }}>
        <Box sx={{ mt: 2 }}>
          {/* Nombre del TP */}
          <TextField
            fullWidth
            label="Nombre del trabajo práctico"
            placeholder="ej: TP1 - Algoritmos de Ordenamiento"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 3 }}
            autoFocus
          />

          {/* Materia */}
          <FormControl fullWidth error={!!errors.subject} sx={{ mb: 3 }}>
            <InputLabel>Materia</InputLabel>
            <Select
              value={formData.subject}
              label="Materia"
              onChange={(e) => handleInputChange('subject', e.target.value)}
              startAdornment={<SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />}
            >
              {mockSubjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
            {errors.subject && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.subject}
              </Typography>
            )}
          </FormControl>

          {/* Fecha límite */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <TextField
              fullWidth
              label="Fecha límite"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              error={!!errors.dueDate}
              helperText={errors.dueDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split('T')[0],
              }}
            />
          </Box>

          {/* Descripción */}
          <TextField
            fullWidth
            label="Descripción"
            placeholder="Describe brevemente el trabajo práctico..."
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 2 }}
          />

          {/* Información adicional */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Información adicional:</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label="Secciones y ejercicios se pueden agregar después"
                size="small"
                variant="outlined"
                color="primary"
              />
              <Chip 
                label="Links y archivos adjuntos disponibles"
                size="small"
                variant="outlined"
                color="primary"
              />
              <Chip 
                label="Compartir con grupos"
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          sx={{ textTransform: 'none' }}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none' }}
        >
          Crear TP
        </Button>
      </DialogActions>
    </Dialog>
  )
}
