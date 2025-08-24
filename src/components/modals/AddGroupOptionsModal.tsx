import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
} from '@mui/material'
import {
  Close as CloseIcon,
  Add as AddIcon,
  Code as CodeIcon,
  Group as GroupIcon,
} from '@mui/icons-material'

interface AddGroupOptionsModalProps {
  open: boolean
  onClose: () => void
  onCreateNew: () => void
  onJoinExisting: (code: string) => void
}

export default function AddGroupOptionsModal({
  open,
  onClose,
  onCreateNew,
  onJoinExisting,
}: AddGroupOptionsModalProps) {
  const [groupCode, setGroupCode] = useState('')

  const handleJoinExisting = () => {
    if (groupCode.trim()) {
      onJoinExisting(groupCode.trim())
      setGroupCode('')
    }
  }

  const handleClose = () => {
    setGroupCode('')
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={false}
      sx={{ zIndex: 1300 }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 3, pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupIcon color="primary" />
          <Typography variant="h6">
            Agregar Grupo de Estudio
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
            ¿Qué te gustaría hacer?
          </Typography>

          {/* Crear nuevo grupo */}
          <Box
            sx={{
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              p: 3,
              mb: 3,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'primary.50',
                borderColor: 'primary.dark',
              },
            }}
            onClick={onCreateNew}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <AddIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h6" color="primary">
                Crear nuevo grupo
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Crea un grupo de estudio desde cero y invita a tus compañeros
            </Typography>
          </Box>

          {/* Unirse a grupo existente */}
          <Box
            sx={{
              border: '2px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CodeIcon color="action" sx={{ fontSize: 32 }} />
              <Typography variant="h6" color="text.primary">
                Unirse a grupo existente
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ingresa el código de un grupo creado por alguien más
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: -1, mb: -1 }}>
              <TextField
                fullWidth
                label="Código del grupo"
                placeholder="ej: GRUPO123"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />
              <Button
                variant="outlined"
                onClick={handleJoinExisting}
                disabled={!groupCode.trim()}
                sx={{ textTransform: 'none', minWidth: 100 }}
              >
                Unirse
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
