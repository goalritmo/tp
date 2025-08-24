import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import {
  Delete as DeleteIcon,
} from '@mui/icons-material'

interface ItemToDelete {
  type: 'exercise' | 'link' | 'attachment'
  id?: number
  index?: number
  name?: string
}

interface ConfirmationModalsProps {
  showDeleteExerciseModal: boolean
  showDeleteLinkModal: boolean
  showDeleteAttachmentModal: boolean
  itemToDelete: ItemToDelete | null
  onConfirmDelete: () => void
  onCancelDelete: () => void
}

export default function ConfirmationModals({
  showDeleteExerciseModal,
  showDeleteLinkModal,
  showDeleteAttachmentModal,
  itemToDelete,
  onConfirmDelete,
  onCancelDelete,
}: ConfirmationModalsProps) {
  return (
    <>
      {/* Delete Exercise Confirmation Modal */}
      <Dialog 
        open={showDeleteExerciseModal} 
        onClose={onCancelDelete}
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
          <Button onClick={onCancelDelete} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={onConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar Ejercicio
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Link Confirmation Modal */}
      <Dialog 
        open={showDeleteLinkModal} 
        onClose={onCancelDelete}
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
          <Button onClick={onCancelDelete} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={onConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Attachment Confirmation Modal */}
      <Dialog 
        open={showDeleteAttachmentModal} 
        onClose={onCancelDelete}
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
          <Button onClick={onCancelDelete} sx={{ textTransform: 'none' }}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={onConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar Archivo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
