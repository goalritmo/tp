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
  AvatarGroup,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  TextField,
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
  Add as AddIcon,
  ContentCopy as ContentCopyIcon,
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
  const [showCodeModal, setShowCodeModal] = useState(false)
  
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
    setShowCodeModal(false)
    onClose()
  }

  const handleOpenCodeModal = () => {
    setShowCodeModal(true)
  }

  const handleCloseCodeModal = () => {
    setShowCodeModal(false)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('GRP-ABC123')
    // Aquí se podría mostrar un snackbar de confirmación
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
              color="default"
              variant="outlined"
              icon={<LockIcon sx={{ fontSize: '0.9rem' }} />}
              sx={{ 
                fontSize: '0.7rem', 
                height: 20,
                borderColor: 'text.primary',
                color: 'text.primary',
                '& .MuiChip-icon': {
                  fontSize: '0.9rem !important',
                  paddingLeft: '4px',
                  color: 'text.primary'
                },
                '& .MuiChip-label': {
                  paddingLeft: '6px',
                  color: 'text.primary'
                }
              }}
            />
          </Box>

          {/* Active Assignments */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
            <AssignmentIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {group.activeAssignments} TPs activos
            </Typography>
          </Box>

          {/* Progress and Members Row */}
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', mb: 2 }}>
            {/* Progress Section */}
            <Box sx={{ flex: '1 1 0%', minWidth: 0 }}>
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
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                15 de 28 ejercicios completados
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={group.groupProgress}
                color={getProgressColor(group.groupProgress)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            {/* Group Members Section */}
            <Box sx={{ flex: '1 1 0%', minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Miembros que forman parte del grupo:
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AvatarGroup 
                  max={6} 
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
                  {group.members.map((member) => (
                    <Avatar
                      key={member.id}
                      sx={{ 
                        bgcolor: 'primary.main'
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                  ))}
                  <Avatar
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.8rem',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      bgcolor: 'transparent',
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { 
                        bgcolor: 'primary.main',
                        color: 'white',
                        opacity: 0.9 
                      }
                    }}
                    onClick={handleOpenCodeModal}
                  >
                    <AddIcon fontSize="small" />
                  </Avatar>
                </AvatarGroup>
              </Box>
            </Box>
          </Box>


        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Active Assignments Section */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          TPs activos
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Mock active assignments */}
          <Box sx={{ 
            p: 2, 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 2,
            '&:hover': { 
              borderColor: 'primary.main',
              bgcolor: 'action.hover' 
            }
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                TP 1 - Algoritmos de Ordenamiento
              </Typography>
              <Chip 
                label="En progreso"
                size="small"
                color="warning"
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Fecha límite: 15 de Marzo, 2025
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Progreso
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    75%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={75}
                  color="warning"
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                6 de 8 ejercicios
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            p: 2, 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 2,
            '&:hover': { 
              borderColor: 'primary.main',
              bgcolor: 'action.hover' 
            }
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                TP 2 - Estructuras de Datos
              </Typography>
              <Chip 
                label="Pendiente"
                size="small"
                color="default"
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Fecha límite: 22 de Marzo, 2025
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Progreso
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    25%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={25}
                  color="primary"
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                2 de 8 ejercicios
              </Typography>
            </Box>
          </Box>
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

      {/* Code Modal */}
      <Dialog 
        open={showCodeModal} 
        onClose={handleCloseCodeModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" component="span">
            Invitar a tu grupo
          </Typography>
          <IconButton onClick={handleCloseCodeModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Comparte este código con tus amigos para que se unan al grupo:
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              value="GRP-ABC123"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
                sx: { 
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em'
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleCopyCode}
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            El código expira en 7 días
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleCloseCodeModal}
            sx={{ textTransform: 'none' }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}
