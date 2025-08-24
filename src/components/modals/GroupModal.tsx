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
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
} from '@mui/material'
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Lock as LockIcon,
} from '@mui/icons-material'

interface GroupMember {
  id: number
  name: string
  avatar: string
  role?: string
}

interface Group {
  id: number
  name: string
  subject: string
  members: GroupMember[]
  totalMembers: number
  activeAssignments: number
  groupProgress: number
}

interface GroupModalProps {
  open: boolean
  onClose: () => void
  group: Group | null
}

export default function GroupModal({ open, onClose, group }: GroupModalProps) {
  const [showDelete, setShowDelete] = useState(false)
  
  if (!group) return null

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success'
    if (progress >= 70) return 'warning'
    return 'primary'
  }

  const handleEdit = () => {
    setShowDelete(true)
  }

  const handleDelete = () => {
    // TODO: Implementar eliminación
    console.log('Eliminar grupo:', group.id)
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
          <GroupIcon color="primary" />
          <Typography variant="h6" component="span">
            Detalles del Grupo
          </Typography>
        </Box>
        <IconButton onClick={handleCloseModal} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2 }}>
        {/* Group Info */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {group.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SchoolIcon fontSize="small" color="action" />
            <Typography variant="body1" color="text.secondary">
              {group.subject}
            </Typography>
            <Chip 
              label="Privado"
              size="small"
              color="secondary"
              variant="outlined"
              icon={<LockIcon />}
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          </Box>

          {/* Progress Section */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progreso del grupo
              </Typography>
              <Chip 
                label={`${group.groupProgress}%`}
                color={getProgressColor(group.groupProgress)}
                size="small"
              />
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={group.groupProgress}
              color={getProgressColor(group.groupProgress)}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {group.totalMembers} miembros
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AssignmentIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {group.activeAssignments} TPs activos
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Members Section */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Miembros del grupo
        </Typography>
        
        <List sx={{ pt: 0 }}>
          {group.members.map((member) => (
            <ListItem key={member.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 40, height: 40, fontSize: '0.9rem' }}>
                  {member.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={member.name}
                secondary={member.role || 'Miembro'}
              />
            </ListItem>
          ))}
        </List>

        {/* Add Member Button */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: 'none' }}
          >
            + Invitar miembro
          </Button>
        </Box>
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: 'center' }}>
        {showDelete && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar grupo
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
