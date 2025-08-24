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
  LinearProgress,
  TextField,
  MenuItem,
} from '@mui/material'
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Lock as LockIcon,
  Add as AddIcon,
  ContentCopy as ContentCopyIcon,
  CalendarToday as CalendarIcon,
  Save as SaveIcon,

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
  const [isEditing, setIsEditing] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [selectedTP, setSelectedTP] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  
  if (!group) return null

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success'
    if (progress >= 70) return 'warning'
    return 'primary'
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveChanges = () => {
    // TODO: Guardar cambios en el backend
    console.log('Guardando cambios del grupo:', group.id)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setShowDelete(true)
  }

  const handleConfirmDelete = () => {
    // TODO: Implementar eliminación
    console.log('Eliminar grupo:', group.id)
    setShowDelete(false)
    onClose()
  }

  const handleCancelDelete = () => {
    setShowDelete(false)
  }

  const handleCloseModal = () => {
    setIsEditing(false)
    setShowDelete(false)
    setShowCodeModal(false)
    setSelectedTP(null)
    onClose()
  }

  const handleTPClick = (tpName: string) => {
    setSelectedTP(tpName)
  }

  const handleBackToTPs = () => {
    setSelectedTP(null)
    setSelectedMember(null)
  }

  const handleMemberSelect = (memberId: number) => {
    setSelectedMember(memberId)
  }

  const handleBackToSections = () => {
    setSelectedMember(null)
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

  // Mock data for TP sections and exercises
  const tpSections = {
    'TP 1 - Algoritmos de Ordenamiento': [
      {
        id: 'teoria',
        name: 'Parte Teórica',
        exercises: [
          { id: 1, name: 'Ejercicio 1: Análisis de complejidad', completed: true },
          { id: 2, name: 'Ejercicio 2: Comparación de algoritmos', completed: true },
        ]
      },
      {
        id: 'practica',
        name: 'Parte Práctica',
        exercises: [
          { id: 3, name: 'Ejercicio 3: Implementación de algoritmo', completed: true },
          { id: 4, name: 'Ejercicio 4: Pruebas y validación', completed: false },
        ]
      }
    ],
    'TP 2 - Estructuras de Datos': [
      {
        id: 'conceptos',
        name: 'Conceptos Fundamentales',
        exercises: [
          { id: 1, name: 'Ejercicio 1: Definiciones y propiedades', completed: true },
          { id: 2, name: 'Ejercicio 2: Análisis de casos de uso', completed: false },
        ]
      },
      {
        id: 'implementacion',
        name: 'Implementación',
        exercises: [
          { id: 3, name: 'Ejercicio 3: Código base', completed: false },
          { id: 4, name: 'Ejercicio 4: Optimizaciones', completed: false },
        ]
      }
    ]
  }

  // Mock data for member progress
  const memberProgress = {
    'TP 1 - Algoritmos de Ordenamiento': {
      1: { // Juan Pérez
        progress: 100,
        completedExercises: 4,
        totalExercises: 4,
        notes: [
          { id: 1, text: 'Complejidad O(n log n) en promedio', timestamp: '2025-01-15T10:30:00' },
          { id: 2, text: 'QuickSort es más rápido en la práctica', timestamp: '2025-01-16T09:00:00' },
        ]
      },
      2: { // María García
        progress: 75,
        completedExercises: 3,
        totalExercises: 4,
        notes: [
          { id: 3, text: 'Usar pivot aleatorio para evitar caso peor', timestamp: '2025-01-17T14:20:00' },
        ]
      },
      3: { // Carlos López
        progress: 50,
        completedExercises: 2,
        totalExercises: 4,
        notes: []
      },
      4: { // Ana Martínez
        progress: 25,
        completedExercises: 1,
        totalExercises: 4,
        notes: []
      }
    },
    'TP 2 - Estructuras de Datos': {
      1: { // Juan Pérez
        progress: 50,
        completedExercises: 2,
        totalExercises: 4,
        notes: []
      },
      5: { // Laura Silva
        progress: 75,
        completedExercises: 3,
        totalExercises: 4,
        notes: [
          { id: 4, text: 'Implementar con recursión de cola', timestamp: '2025-01-17T15:45:00' },
        ]
      },
      6: { // Roberto Díaz
        progress: 25,
        completedExercises: 1,
        totalExercises: 4,
        notes: []
      }
    }
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {group.name}
            </Typography>
            {isEditing && (
              <IconButton size="small" color="error" onClick={handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SchoolIcon fontSize="small" color="action" />
            <Typography variant="body1" color="text.secondary">
              {group.subject}
            </Typography>
            <Chip 
              label="Privado"
              size="small"
              color="success"
              variant="outlined"
              icon={<LockIcon sx={{ fontSize: '0.9rem' }} />}
              sx={{ 
                fontSize: '0.7rem', 
                height: 20,
                '& .MuiChip-icon': {
                  fontSize: '0.9rem !important',
                  paddingLeft: '4px'
                },
                '& .MuiChip-label': {
                  paddingLeft: '6px'
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              cursor: selectedTP ? 'pointer' : 'default',
              '&:hover': selectedTP ? { color: 'primary.main' } : {}
            }}
            onClick={selectedTP ? handleBackToTPs : undefined}
          >
            TPs activos
          </Typography>
          {selectedTP && (
            <>
              <Typography variant="h6" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                &gt;
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  cursor: selectedMember ? 'pointer' : 'default',
                  '&:hover': selectedMember ? { color: 'primary.main' } : {}
                }}
                onClick={selectedMember ? handleBackToSections : undefined}
              >
                {selectedTP}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                &gt;
              </Typography>
              <Box sx={{ minWidth: 250, mt: 1.875 }}>
                <TextField
                  select
                  value={selectedMember || ''}
                  onChange={(e) => handleMemberSelect(Number(e.target.value))}
                  size="small"
                  variant="outlined"
                  placeholder="Seleccionar miembro"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      height: 32,
                      fontSize: '0.9rem'
                    }
                  }}
                >
                  {group.members.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </>
          )}
        </Box>
        
        {!selectedTP ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {/* Mock active assignments */}
            <Box sx={{ 
              p: 2, 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': { 
                borderColor: 'primary.main',
                bgcolor: 'action.hover' 
              }
            }}
            onClick={() => handleTPClick('TP 1 - Algoritmos de Ordenamiento')}
            >
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Fecha límite: 15 de Marzo, 2025
              </Typography>
            </Box>
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
            cursor: 'pointer',
            '&:hover': { 
              borderColor: 'primary.main',
              bgcolor: 'action.hover' 
            }
          }}
          onClick={() => handleTPClick('TP 2 - Estructuras de Datos')}
          >
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Fecha límite: 22 de Marzo, 2025
              </Typography>
            </Box>
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
                  ) : (
        // TP Sections View
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {selectedTP && tpSections[selectedTP as keyof typeof tpSections]?.map((section) => (
            <Box key={section.id} sx={{ 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              {/* Section Header */}
              <Box sx={{ 
                p: 2, 
                bgcolor: 'grey.50',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {section.name}
                </Typography>
              </Box>
              
                          {/* Exercises */}
            <Box sx={{ p: 0 }}>
              {section.exercises.map((exercise) => {
                // Check if member has completed this exercise
                const memberData = selectedMember && selectedTP ? 
                  (memberProgress as any)[selectedTP]?.[selectedMember] : null;
                const isCompletedByMember = memberData?.completedExercises >= exercise.id;
                
                // Check if member has notes for this exercise
                const hasNotes = memberData?.notes?.some((note: any) => 
                  note.text.toLowerCase().includes(exercise.name.toLowerCase().split(':')[0])
                );
                
                return (
                  <Box key={exercise.id} sx={{
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                    '&:hover': { bgcolor: 'action.hover' }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          bgcolor: selectedMember ? 
                            (isCompletedByMember ? 'success.main' : 'grey.300') : 
                            (exercise.completed ? 'success.main' : 'grey.300'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {(selectedMember ? isCompletedByMember : exercise.completed) && (
                            <Box sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'white'
                            }} />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{
                          color: selectedMember ? 
                            (isCompletedByMember ? 'text.primary' : 'text.secondary') :
                            (exercise.completed ? 'text.primary' : 'text.secondary'),
                          textDecoration: selectedMember ? 
                            (isCompletedByMember ? 'line-through' : 'none') :
                            (exercise.completed ? 'line-through' : 'none')
                        }}>
                          {exercise.name}
                        </Typography>
                      </Box>
                      {selectedMember && hasNotes && (
                        <Box sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: 'info.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.7rem'
                        }}>
                          N
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
            </Box>
          ))}
        </Box>
      )}
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions sx={{ px: 4, py: 3, gap: 1, justifyContent: 'center' }}>
        {isEditing ? (
          <>
            <Button
              variant="outlined"
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
              Guardar cambios
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

      {/* Delete Confirmation Modal */}
      <Dialog 
        open={showDelete} 
        onClose={handleCancelDelete}
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
            Confirmar eliminación
          </Typography>
          <IconButton onClick={handleCancelDelete} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 2, pb: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ¿Estás seguro de que quieres eliminar el grupo <strong>"{group.name}"</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta acción no se puede deshacer. Se eliminarán todos los datos del grupo, incluyendo miembros, TPs y progreso.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, pb: 3, gap: 1, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleCancelDelete}
            sx={{ textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleConfirmDelete}
            sx={{ textTransform: 'none' }}
          >
            Eliminar grupo
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}
