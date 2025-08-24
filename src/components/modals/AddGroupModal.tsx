import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material'
import {
  Close as CloseIcon,
  Add as AddIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material'

interface AddGroupModalProps {
  open: boolean
  onClose: () => void
  onBack: () => void
  onSave: (groupData: {
    name: string
    subject: string
    description: string
    isPrivate: boolean
    groupPhoto: File | null
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

export default function AddGroupModal({ open, onClose, onBack, onSave }: AddGroupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    isPrivate: true,
    groupPhoto: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, groupPhoto: file }))
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
    if (hasFormContent) {
      // Si hay contenido, cerrar completamente
      setFormData({
        name: '',
        subject: '',
        description: '',
        isPrivate: true,
        groupPhoto: null,
      })
      setErrors({})
      onClose()
    } else {
      // Si está vacío, volver al modal anterior
      onBack()
    }
  }

  // Verificar si el formulario tiene contenido
  const hasFormContent = formData.name.trim() || formData.subject || formData.description.trim() || formData.groupPhoto

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={false}
      sx={{ zIndex: 1300 }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupIcon color="primary" />
          <Typography variant="h6">
            Crear Nuevo Grupo de Estudio (Privado)
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 0 }}>
        <Box sx={{ mt: 2 }}>
          {/* Nombre del grupo */}
          <TextField
            fullWidth
            label="Nombre del grupo"
            placeholder="ej: Los Algoritmos del Apocalipsis"
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
              MenuProps={{
                PaperProps: {
                  sx: { zIndex: 1400 }
                }
              }}
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

          {/* Foto del grupo y Descripción en la misma fila */}
          <Box sx={{ display: 'flex', gap: 3, mb: 0, alignItems: 'flex-start' }}>
            {/* Foto del grupo */}
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center' }}>
                Foto del grupo (opcional)
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: formData.groupPhoto ? 'transparent' : 'primary.main' 
                  }}
                  src={formData.groupPhoto ? URL.createObjectURL(formData.groupPhoto) : undefined}
                >
                  {!formData.groupPhoto && <GroupIcon sx={{ fontSize: 40 }} />}
                </Avatar>
                <Box sx={{ textAlign: 'center' }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="group-photo-upload"
                    type="file"
                    onChange={handlePhotoChange}
                  />
                  <label htmlFor="group-photo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCameraIcon />}
                      sx={{ textTransform: 'none' }}
                      size="small"
                    >
                      {formData.groupPhoto ? 'Cambiar' : 'Subir foto'}
                    </Button>
                  </label>
                  {formData.groupPhoto && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      {formData.groupPhoto.name.length > 20 
                        ? `${formData.groupPhoto.name.substring(0, 20)}...` 
                        : formData.groupPhoto.name}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Descripción */}
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Descripción"
                placeholder="Describe el propósito del grupo, objetivos de estudio, etc..."
                multiline
                rows={6.35}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Box>
          </Box>


        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pt: 2, pb: 3, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          sx={{ textTransform: 'none' }}
        >
          {hasFormContent ? 'Cancelar' : 'Volver'}
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none' }}
        >
          Crear Grupo
        </Button>
      </DialogActions>
    </Dialog>
  )
}
