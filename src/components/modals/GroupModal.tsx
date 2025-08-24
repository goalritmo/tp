import { useState } from 'react'
import AddTPOptionsModal from './AddTPOptionsModal'
import AddAssignmentModal from './AddAssignmentModal'
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
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [selectedMemberForModal, setSelectedMemberForModal] = useState<GroupMember | null>(null)
  const [selectedTP, setSelectedTP] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [showAddTPModal, setShowAddTPModal] = useState(false)
  const [showCreateTPModal, setShowCreateTPModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedTPForStatus, setSelectedTPForStatus] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedGroupName, setEditedGroupName] = useState('')
  const [showRemoveMembersModal, setShowRemoveMembersModal] = useState(false)
  const [groupTPs, setGroupTPs] = useState([
    'TP 1 - Algoritmos de Ordenamiento',
    'TP 2 - Estructuras de Datos'
  ])
  const [groupCode, setGroupCode] = useState('GRP-ABC123')
  const [isEditingCode, setIsEditingCode] = useState(false)
  const [isAdmin] = useState(false) // TODO: Esto debería venir del contexto de autenticación
  
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

  const handleEditStatus = (tpName: string) => {
    setSelectedTPForStatus(tpName)
    setShowStatusModal(true)
  }

  const handleCloseStatusModal = () => {
    setShowStatusModal(false)
    setSelectedTPForStatus(null)
    setSelectedStatus(null)
  }

  const handleSelectStatus = (status: string) => {
    setSelectedStatus(status)
  }

  const handleConfirmStatusChange = () => {
    if (selectedStatus) {
      if (selectedStatus === 'Borrar') {
        // TODO: Eliminar el TP del grupo en el backend
        console.log('Eliminando TP del grupo:', selectedTPForStatus)
        // Aquí se podría actualizar el estado local para remover el TP
        setGroupTPs(prev => prev.filter(tp => tp !== selectedTPForStatus))
      } else {
        // TODO: Guardar el nuevo estado en el backend
        console.log('Cambiando estado del TP:', selectedTPForStatus, 'a:', selectedStatus)
      }
      setShowStatusModal(false)
      setSelectedTPForStatus(null)
      setSelectedStatus(null)
    }
  }

  const handleEditName = () => {
    setEditedGroupName(group.name)
    setIsEditingName(true)
  }

  const handleSaveName = () => {
    // TODO: Guardar el nuevo nombre en el backend
    console.log('Cambiando nombre del grupo a:', editedGroupName)
    setIsEditingName(false)
  }

  const handleOpenRemoveMembersModal = () => {
    setShowRemoveMembersModal(true)
  }

  const handleCloseRemoveMembersModal = () => {
    setShowRemoveMembersModal(false)
  }

  const handleRemoveMember = (memberId: number) => {
    // TODO: Eliminar miembro del grupo en el backend
    console.log('Eliminando miembro del grupo:', memberId)
    setShowRemoveMembersModal(false)
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
    setShowMemberModal(false)
    setShowAddTPModal(false)
    setShowCreateTPModal(false)
    setShowStatusModal(false)
    setSelectedTPForStatus(null)
    setSelectedStatus(null)
    setIsEditingName(false)
    setEditedGroupName('')
    setShowRemoveMembersModal(false)
    setIsEditingCode(false)
    setGroupCode('GRP-ABC123')
    setSelectedMemberForModal(null)
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

  const handleMemberClick = (member: GroupMember) => {
    setSelectedMemberForModal(member)
    setShowMemberModal(true)
  }

  const handleCloseMemberModal = () => {
    setShowMemberModal(false)
    setSelectedMemberForModal(null)
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

  const handleOpenAddTPModal = () => {
    setShowAddTPModal(true)
  }

  const handleCloseAddTPModal = () => {
    setShowAddTPModal(false)
  }

  const handleJoinTP = (tpCode: string) => {
    // Unirse a TP existente y agregarlo al grupo
    const newTPName = `TP ${groupTPs.length + 1} - TP Existente (${tpCode})`
    setGroupTPs(prev => [...prev, newTPName])
    setShowAddTPModal(false)
  }

  const handleCreateTPFromScratch = () => {
    setShowAddTPModal(false)
    setShowCreateTPModal(true)
  }

  const handleCloseCreateTPModal = () => {
    setShowCreateTPModal(false)
  }

  const handleCreateTP = (tpData: any) => {
    // Crear TP desde cero y agregarlo al grupo
    const newTPName = `TP ${groupTPs.length + 1} - ${tpData.name}`
    setGroupTPs(prev => [...prev, newTPName])
    setShowCreateTPModal(false)
  }

  const handleEditCode = () => {
    setIsEditingCode(true)
  }

  const handleSaveCode = () => {
    setIsEditingCode(false)
    // Aquí se guardaría el nuevo código en el backend
    console.log('Nuevo código guardado:', groupCode)
  }

  const handleCancelEditCode = () => {
    setGroupCode('GRP-ABC123') // Restaurar código original
    setIsEditingCode(false)
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
      sx={{ zIndex: 15000 }}
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
            {isEditingName ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                <TextField
                  value={editedGroupName}
                  onChange={(e) => setEditedGroupName(e.target.value)}
                  variant="standard"
                  sx={{ 
                    flex: 1,
                    '& .MuiInputBase-input': {
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      padding: 0
                    }
                  }}
                  autoFocus
                />
                <IconButton size="small" color="primary" onClick={handleSaveName}>
                  <SaveIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                  {group.name}
                </Typography>
                {isEditing && (
                  <IconButton size="small" color="primary" onClick={handleEditName}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            )}
            {isEditing && !isEditingName && (
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
                      cursor: isEditing ? 'default' : 'pointer',
                      '&:hover': isEditing ? {} : { opacity: 0.8 }
                    }
                  }}
                >
                  {group.members.map((member) => (
                    <Avatar
                      key={member.id}
                      sx={{ 
                        bgcolor: 'primary.main',
                        cursor: isEditing ? 'default' : 'pointer',
                        '&:hover': isEditing ? {} : { opacity: 0.8 }
                      }}
                      onClick={isEditing ? undefined : () => handleMemberClick(member)}
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
                    onClick={isEditing ? handleOpenRemoveMembersModal : handleOpenCodeModal}
                  >
                    {isEditing ? <EditIcon fontSize="small" /> : <AddIcon fontSize="small" />}
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
            {/* Active assignments */}
            {groupTPs.map((tpName) => (
              <Box key={tpName} sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                cursor: isEditing ? 'default' : 'pointer',
                '&:hover': isEditing ? {} : { 
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover' 
                }
              }}
              onClick={isEditing ? undefined : () => handleTPClick(tpName)}
              >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {tpName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isEditing && (
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditStatus(tpName)
                      }}
                      sx={{ p: 0.5 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                  <Chip 
                    label="En progreso"
                    size="small"
                    color="warning"
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Box>
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
            ))}

          {/* Add TP Card - Only in edit mode */}
          {isEditing && (
            <Box sx={{ 
              p: 2, 
              border: '2px dashed', 
              borderColor: 'primary.main',
              borderRadius: 2,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '140px',
              '&:hover': { 
                borderColor: 'primary.dark',
                bgcolor: 'primary.50' 
              }
            }}
            onClick={handleOpenAddTPModal}
          >
            <AddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="body1" color="primary.main" sx={{ fontWeight: 500, textAlign: 'center' }}>
              Agregar TP
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Agregar un nuevo trabajo práctico al grupo
            </Typography>
          </Box>
          )}
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
          !selectedTP && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ textTransform: 'none' }}
            >
              Editar
            </Button>
          )
        )}
      </DialogActions>

            {/* Code Modal */}
      <Dialog
        open={showCodeModal}
        onClose={handleCloseCodeModal}
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: 16000 }}
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

        <DialogContent sx={{ pt: 1, pb: 1 }}>
          <Typography variant="body1" sx={{ mb: 1, mt: 1 }}>
            Comparte este código con tus amigos para que se unan al grupo:
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TextField
              value={groupCode}
              fullWidth
              variant="outlined"
              size="small"
              disabled={!isEditingCode}
              onChange={(e) => setGroupCode(e.target.value)}
                            sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  height: '36px',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  padding: '6px 12px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
            />
            {!isEditingCode ? (
              <>
                <IconButton 
                  color="primary" 
                  onClick={handleEditCode}
                  sx={{ 
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    height: '36px',
                    width: '36px',
                    '&:hover': { 
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  color="primary" 
                  onClick={handleCopyCode}
                  sx={{ 
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    height: '36px',
                    width: '36px',
                    '&:hover': { 
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton 
                  color="primary" 
                  onClick={handleCancelEditCode}
                  sx={{ 
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    height: '36px',
                    width: '36px',
                    '&:hover': { 
                      bgcolor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton 
                  color="success" 
                  onClick={handleSaveCode}
                  sx={{ 
                    bgcolor: 'transparent',
                    color: 'success.main',
                    height: '36px',
                    width: '36px',
                    '&:hover': { 
                      bgcolor: 'success.main',
                      color: 'white'
                    }
                  }}
                >
                  <SaveIcon />
                </IconButton>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'center' }}>
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
        sx={{ zIndex: 16000 }}
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

      {/* Member Info Modal */}
      <Dialog
        open={showMemberModal}
        onClose={handleCloseMemberModal}
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: 16000 }}
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
            Información del miembro
          </Typography>
          <IconButton onClick={handleCloseMemberModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 2, pb: 1 }}>
          {selectedMemberForModal && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Member Avatar and Name */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    fontSize: '1.5rem',
                    bgcolor: 'primary.main'
                  }}
                >
                  {selectedMemberForModal.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {selectedMemberForModal.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMemberForModal.role || 'Miembro del grupo'}
                  </Typography>
                </Box>
              </Box>

              {/* Member Stats */}
              <Box sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 2,
                bgcolor: 'grey.50'
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Estadísticas en este grupo:
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      3
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      TPs completados
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                      85%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Promedio
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="warning.main" sx={{ fontWeight: 'bold' }}>
                      12
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Notas creadas
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Recent Activity */}
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Actividad reciente:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: 'success.main' 
                    }} />
                    <Typography variant="body2">
                      Completó ejercicio en TP 1 - Algoritmos
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                      hace 2h
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: 'info.main' 
                    }} />
                    <Typography variant="body2">
                      Agregó nota en TP 2 - Estructuras
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                      hace 1d
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleCloseMemberModal}
            sx={{ textTransform: 'none' }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add TP Options Modal */}
      <AddTPOptionsModal
        open={showAddTPModal}
        onClose={handleCloseAddTPModal}
        onCreateNew={handleCreateTPFromScratch}
        onJoinExisting={handleJoinTP}
        isAdmin={isAdmin}
      />

      {/* Create TP Modal */}
      <AddAssignmentModal
        open={showCreateTPModal}
        onClose={handleCloseCreateTPModal}
        onBack={handleCloseCreateTPModal}
        onSave={handleCreateTP}
      />

      {/* Status Change Modal */}
      <Dialog
        open={showStatusModal}
        onClose={handleCloseStatusModal}
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: 16000 }}
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
            Cambiar estado del TP
          </Typography>
          <IconButton onClick={handleCloseStatusModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 2, pb: 1 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Selecciona el nuevo estado para <strong>"{selectedTPForStatus}"</strong>:
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant={selectedStatus === 'En progreso' ? 'contained' : 'outlined'}
              onClick={() => handleSelectStatus('En progreso')}
              sx={{ 
                textTransform: 'none',
                justifyContent: 'flex-start',
                p: 2,
                bgcolor: selectedStatus === 'En progreso' ? 'primary.main' : 'transparent',
                color: selectedStatus === 'En progreso' ? 'white' : 'inherit',
                '&:hover': {
                  bgcolor: selectedStatus === 'En progreso' ? 'primary.dark' : 'action.hover'
                }
              }}
            >
              <Chip 
                label="En progreso"
                size="small"
                color={selectedStatus === 'En progreso' ? 'default' : 'warning'}
                sx={{ 
                  mr: 2, 
                  fontSize: '0.7rem',
                  bgcolor: selectedStatus === 'En progreso' ? 'white' : undefined,
                  color: selectedStatus === 'En progreso' ? 'primary.main' : undefined
                }}
              />
              El TP está siendo trabajado activamente
            </Button>
            
            <Button
              variant={selectedStatus === 'Completado' ? 'contained' : 'outlined'}
              onClick={() => handleSelectStatus('Completado')}
              sx={{ 
                textTransform: 'none',
                justifyContent: 'flex-start',
                p: 2,
                bgcolor: selectedStatus === 'Completado' ? 'primary.main' : 'transparent',
                color: selectedStatus === 'Completado' ? 'white' : 'inherit',
                '&:hover': {
                  bgcolor: selectedStatus === 'Completado' ? 'primary.dark' : 'action.hover'
                }
              }}
            >
              <Chip 
                label="Completado"
                size="small"
                color={selectedStatus === 'Completado' ? 'default' : 'success'}
                sx={{ 
                  mr: 2, 
                  fontSize: '0.7rem',
                  bgcolor: selectedStatus === 'Completado' ? 'white' : undefined,
                  color: selectedStatus === 'Completado' ? 'primary.main' : undefined
                }}
              />
              El TP ha sido finalizado completamente
            </Button>
            
            <Button
              variant={selectedStatus === 'Pausado' ? 'contained' : 'outlined'}
              onClick={() => handleSelectStatus('Pausado')}
              sx={{ 
                textTransform: 'none',
                justifyContent: 'flex-start',
                p: 2,
                bgcolor: selectedStatus === 'Pausado' ? 'primary.main' : 'transparent',
                color: selectedStatus === 'Pausado' ? 'white' : 'inherit',
                '&:hover': {
                  bgcolor: selectedStatus === 'Pausado' ? 'primary.dark' : 'action.hover'
                }
              }}
            >
              <Chip 
                label="Pausado"
                size="small"
                color={selectedStatus === 'Pausado' ? 'default' : 'default'}
                sx={{ 
                  mr: 2, 
                  fontSize: '0.7rem',
                  bgcolor: selectedStatus === 'Pausado' ? 'white' : undefined,
                  color: selectedStatus === 'Pausado' ? 'primary.main' : undefined
                }}
              />
              El TP está temporalmente suspendido
            </Button>

            <Button
              variant={selectedStatus === 'Borrar' ? 'contained' : 'outlined'}
              onClick={() => handleSelectStatus('Borrar')}
              sx={{ 
                textTransform: 'none',
                justifyContent: 'flex-start',
                p: 2,
                bgcolor: selectedStatus === 'Borrar' ? 'error.main' : 'transparent',
                color: selectedStatus === 'Borrar' ? 'white' : 'inherit',
                borderColor: selectedStatus === 'Borrar' ? 'error.main' : undefined,
                '&:hover': {
                  bgcolor: selectedStatus === 'Borrar' ? 'error.dark' : 'action.hover'
                }
              }}
            >
              <Chip 
                label="Borrar"
                size="small"
                color={selectedStatus === 'Borrar' ? 'default' : 'error'}
                sx={{ 
                  mr: 2, 
                  fontSize: '0.7rem',
                  bgcolor: selectedStatus === 'Borrar' ? 'white' : undefined,
                  color: selectedStatus === 'Borrar' ? 'error.main' : undefined
                }}
              />
              Eliminar el TP del grupo permanentemente
            </Button>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleCloseStatusModal}
            sx={{ textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmStatusChange}
            disabled={!selectedStatus}
            sx={{ textTransform: 'none' }}
          >
            Confirmar
          </Button>
        </DialogActions>
              </Dialog>

        {/* Remove Members Modal */}
        <Dialog
          open={showRemoveMembersModal}
          onClose={handleCloseRemoveMembersModal}
          maxWidth="sm"
          fullWidth
          sx={{ zIndex: 16000 }}
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
              Eliminar miembros del grupo
            </Typography>
            <IconButton onClick={handleCloseRemoveMembersModal} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <Divider />

          <DialogContent sx={{ pt: 2, pb: 1 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Selecciona los miembros que quieres eliminar del grupo:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {group.members.map((member) => (
                <Box
                  key={member.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 32,
                        height: 32,
                        fontSize: '0.8rem'
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="body1">
                      {member.name}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveMember(member.id)}
                    sx={{ 
                      p: 0.5,
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main'
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleCloseRemoveMembersModal}
              sx={{ textTransform: 'none' }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
  )
}
