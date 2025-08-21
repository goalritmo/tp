import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

export default function Profile() {

  // Mock data - esto vendrá de los contexts más adelante
  const stats = {
    totalAssignments: 1,
    completedAssignments: 0,
    activeGroups: 1,
    totalProgress: 77,
  }

            const profile = {
            name: 'Juan Pérez',
            email: 'juan.perez@email.com',
            career: 'Ciencias de la Computación',
            avatar: 'JP',
            joinDate: '2025-08-21',
          }

  const menuItems = [
    { icon: <PersonIcon />, text: 'Editar Perfil', action: () => console.log('Edit profile') },
    { icon: <SchoolIcon />, text: 'Mis Materias', action: () => console.log('My subjects') },
    { icon: <SettingsIcon />, text: 'Configuración', action: () => console.log('Settings') },
    { icon: <LogoutIcon />, text: 'Cerrar Sesión', action: () => console.log('Logout') },
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
        Mi Perfil
      </Typography>

      {/* Main Grid - Profile, Menu, and Stats */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
        gridTemplateRows: { xs: 'auto auto auto', md: 'auto auto' },
        gap: 2,
        mb: 1
      }}>
        {/* Profile Card */}
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: '2rem',
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {profile.avatar}
            </Avatar>
            <Typography variant="h5" component="div" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {profile.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {profile.career}
            </Typography>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card sx={{ display: { xs: 'none', md: 'block' } }}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <ListItem onClick={item.action} sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                {index < menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Card>

        {/* Stats Cards */}
        <Box sx={{ 
          gridColumn: { xs: '1', md: '1 / -1' },
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)' }, 
          gap: 2
        }}>
        <Card sx={{ height: '180px' }}>
          <CardContent sx={{ textAlign: 'center', py: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AssignmentIcon color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h6" component="div">
                {stats.completedAssignments}/{stats.totalAssignments}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              TPs Completados
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '180px' }}>
          <CardContent sx={{ textAlign: 'center', py: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <GroupIcon color="secondary" sx={{ fontSize: 32 }} />
              <Typography variant="h6" component="div">
                {stats.activeGroups}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Grupos Activos
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '180px' }}>
          <CardContent sx={{ textAlign: 'center', py: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SchoolIcon color="warning" sx={{ fontSize: 32 }} />
              <Typography variant="h6" component="div">
                {stats.totalProgress}%
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Rendimiento
            </Typography>
          </CardContent>
        </Card>
        </Box>
      </Box>

      {/* Menu Items - Only visible on mobile */}
      <Card sx={{ display: { xs: 'block', md: 'none' } }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem onClick={item.action} sx={{ cursor: 'pointer' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>


    </Box>
  )
}
