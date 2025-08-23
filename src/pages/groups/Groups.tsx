import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  AvatarGroup,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Add as AddIcon, Info as InfoIcon } from '@mui/icons-material'
import GroupModal from '../../components/modals/GroupModal'

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success'
    if (progress >= 70) return 'warning'
    return 'primary'
  }

  // Mock data - esto vendrá de los contexts más adelante
  const groups = [
    {
      id: 1,
      name: 'Los Algoritmos del Apocalipsis',
      subject: 'Algoritmos I',
      members: [
        { id: 1, name: 'Juan Pérez', avatar: 'JP' },
        { id: 2, name: 'María García', avatar: 'MG' },
        { id: 3, name: 'Carlos López', avatar: 'CL' },
        { id: 4, name: 'Ana Martínez', avatar: 'AM' },
      ],
      totalMembers: 4,
      activeAssignments: 2,
      groupProgress: 75,
    },
    {
      id: 2,
      name: 'Algoritmos & Chill',
      subject: 'Algoritmos I',
      members: [
        { id: 1, name: 'Juan Pérez', avatar: 'JP' },
        { id: 5, name: 'Laura Silva', avatar: 'LS' },
        { id: 6, name: 'Roberto Díaz', avatar: 'RD' },
      ],
      totalMembers: 3,
      activeAssignments: 1,
      groupProgress: 90,
    },

  ]

  const handleCardClick = (group: any) => {
    setSelectedGroup(group)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGroup(null)
  }

  return (
    <Box className="container" sx={{ py: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 1, mb: 2 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          onClick={() => window.location.reload()}
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '2.5rem' },
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
            transition: 'opacity 0.2s ease',
          }}
        >
          Mis Grupos
        </Typography>
        <Tooltip 
          title="Aquí puedes ver todos tus grupos de estudio, sus miembros y el progreso grupal. Haz click en cualquier grupo para ver más detalles."
          placement={isMobile ? "bottom" : "right"}
          arrow
        >
          <IconButton size="small" sx={{ color: 'primary.main', mt: { xs: 0.8, md: 1.5 } }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Groups Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          lg: 'repeat(3, 1fr)' 
        }, 
        gap: 2,
        mb: 3,
        justifyContent: 'center'
      }}>
        {groups.map((group) => (
          <Card 
            key={group.id} 
            sx={{ 
              height: '180px',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
            onClick={() => handleCardClick(group)}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" component="div" gutterBottom noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%', width: '100%' }}>
                    {group.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.8 }}>
                    <Typography variant="body2" color="text.secondary">
                      {group.subject}
                    </Typography>
                    <Chip 
                      label="Privado"
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: 20 }}
                    />
                  </Box>
                  
                  {/* Members */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AvatarGroup max={4} sx={{ mr: 1 }}>
                      {group.members.map((member) => (
                        <Avatar key={member.id} sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>
                          {member.avatar}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    <Typography variant="body2" color="text.secondary">
                      {group.totalMembers} miembros
                    </Typography>
                  </Box>

                  {/* Stats */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                <Chip 
                              label={`${group.groupProgress}% progreso`}
                              color={getProgressColor(group.groupProgress)}
                              size="small"
                            />
                    <Chip 
                      label={`${group.activeAssignments} TPs activos`}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Box>

              </Box>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Group Card */}
        <Card
          sx={{
            height: '180px',
            cursor: 'pointer',
            border: '2px dashed',
            borderColor: 'primary.main',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'primary.50',
              borderColor: 'primary.dark',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

          }}
          onClick={() => console.log('Add new group')}
        >
          <Box sx={{ textAlign: 'center' }}>
            <AddIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h6" color="primary">
              Crear Grupo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crear nuevo grupo de estudio
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Group Modal */}
      <GroupModal
        open={isModalOpen}
        onClose={handleCloseModal}
        group={selectedGroup}
      />
    </Box>
  )
}
