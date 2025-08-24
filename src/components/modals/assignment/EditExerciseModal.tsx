import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material'
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
  UploadFile as UploadFileIcon,
  Link as LinkIcon,
  Close as CloseLinkIcon,
} from '@mui/icons-material'

interface EditData {
  id: string | number
  name: string
  description?: string
  links?: { text: string; url: string }[]
  attachments?: { name: string; url: string }[]
}

interface EditExerciseModalProps {
  open: boolean
  onClose: () => void
  editData: EditData | null
  editType: 'section' | 'exercise' | null
  editMode: 'exercise' | 'notes'
  onSave: () => void
  onCancel: () => void
  onDataChange: (data: EditData) => void
  onRemoveAttachment: (index: number) => void
  onDeleteLink: (index: number) => void
  onAddLink: () => void
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteExercise: () => void
}

export default function EditExerciseModal({
  open,
  onClose,
  editData,
  editType,
  editMode,
  onSave,
  onCancel,
  onDataChange,
  onRemoveAttachment,
  onDeleteLink,
  onAddLink,
  onFileUpload,
  onDeleteExercise,
}: EditExerciseModalProps) {
  if (!editData) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      keepMounted
      disableEscapeKeyDown={false}
      sx={{ zIndex: 10005 }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">
            {editType === 'exercise' 
              ? `Editar Ejercicio: ${editData.name}`
              : editType === 'section'
              ? `Editar Sección: ${editData.name}`
              : 'Editar'
            }
          </Typography>
        </Box>
        {editType === 'exercise' && editMode !== 'notes' && (
          <IconButton
            color="error"
            size="small"
            onClick={onDeleteExercise}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ pb: editMode === 'notes' ? 0 : 3 }}>
        <Box sx={{ mt: editMode === 'notes' ? 0 : 2 }}>
          {editMode !== 'notes' && (
            <TextField
              fullWidth
              label="Nombre"
              value={editData?.name || ''}
              onChange={(e) => onDataChange({ ...editData, name: e.target.value })}
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
                onChange={(e) => onDataChange({ ...editData, description: e.target.value })}
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
                          onClick={() => onDeleteLink(index)}
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
                  onClick={onAddLink}
                >
                  Agregar Link
                </Button>
              </Box>

              {/* Attachments Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
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
                        onDelete={() => onRemoveAttachment(index)}
                        deleteIcon={<CloseIcon />}
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
                    onChange={onFileUpload}
                  />
                </Button>
              </Box>
            </>
          )}

          {editMode === 'notes' && (
            <TextField
              fullWidth
              label="Contenido de la nota"
              multiline
              rows={6}
              placeholder="Escribe el contenido de la nota..."
              value={editData?.description || ''}
              onChange={(e) => onDataChange({ ...editData, description: e.target.value })}
              sx={{ mb: 2 }}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 0, pr: 3, pb: 3 }}>
        <Button onClick={onCancel} sx={{ textTransform: 'none' }}>
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          onClick={onSave}
          sx={{ textTransform: 'none' }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  )
}
