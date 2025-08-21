import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  AvatarGroup,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

export default function Groups() {

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

  return (
    <Box className="container" sx={{ py: 2 }}>
      {/* Header */}
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        Mis Grupos
      </Typography>

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
          <Card key={group.id} sx={{ height: '180px' }}>
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
    </Box>
  )
}
