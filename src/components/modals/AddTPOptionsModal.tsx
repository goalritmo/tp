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
  Info as InfoIcon,
} from '@mui/icons-material'

interface AddTPOptionsModalProps {
  open: boolean
  onClose: () => void
  onJoinExisting: (code: string) => void
}

export default function AddTPOptionsModal({
  open,
  onClose,
  onJoinExisting,
}: AddTPOptionsModalProps) {
  const [tpCode, setTpCode] = useState('')

  const handleJoinExisting = () => {
    if (tpCode.trim()) {
      onJoinExisting(tpCode.trim())
      setTpCode('')
    }
  }

  const handleClose = () => {
    setTpCode('')
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
          <AddIcon color="primary" />
          <Typography variant="h6">
            Agregar Trabajo Práctico
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 3 }}>
        <Box sx={{ mt: 2 }}>
          {/* Agregar TP existente */}
          <Box
            sx={{
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              p: 3,
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CodeIcon color="action" sx={{ fontSize: 32 }} />
              <Typography variant="h6" color="text.primary">
                Agregar TP existente
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ingresa el código de un TP creado por alguien más
            </Typography>
            
            {/* Info sobre TPs oficiales */}
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'info.main',
                borderRadius: 2,
                p: 2,
                bgcolor: 'info.50',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <InfoIcon color="info" fontSize="small" />
                <Typography variant="body2" color="info.main" sx={{ fontWeight: 500 }}>
                  TPs oficiales disponibles:
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                ALGO1TP0 • ALGO1TP1
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: -1, mb: -1 }}>
              <TextField
                fullWidth
                label="Código del TP"
                placeholder="ej: ABC123"
                value={tpCode}
                onChange={(e) => setTpCode(e.target.value.toUpperCase())}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />
              <Button
                variant="outlined"
                onClick={handleJoinExisting}
                disabled={!tpCode.trim()}
                sx={{ textTransform: 'none', minWidth: 100 }}
              >
                Agregar
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>


    </Dialog>
  )
}
