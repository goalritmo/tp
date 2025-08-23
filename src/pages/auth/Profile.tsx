import React, { useState } from 'react'
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
  Badge,
  IconButton,
  Chip,
} from '@mui/material'
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon,
  Circle as CircleIcon,
  School as SchoolIcon,
} from '@mui/icons-material'

export default function Profile() {
  const [showNotifications, setShowNotifications] = useState(false)

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

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Nuevo TP disponible',
      message: 'Se ha publicado el TP 1 - Estructuras de Datos para Algoritmos I',
      time: '2 horas',
      type: 'assignment',
      read: false,
    },
    {
      id: 2,
      title: 'Invitación a grupo',
      message: 'Te han invitado al grupo "Los Recursivos" de Matemática Discreta I',
      time: '5 horas',
      type: 'group',
      read: false,
    },
    {
      id: 3,
      title: 'Fecha límite próxima',
      message: 'El TP 0 - Laboratorio vence en 2 días',
      time: '1 día',
      type: 'deadline',
      read: true,
    },
    {
      id: 4,
      title: 'Comentario en grupo',
      message: 'Juan comentó en "Los Algoritmos del Apocalipsis"',
      time: '2 días',
      type: 'comment',
      read: true,
    },
    {
      id: 5,
      title: 'TP completado',
      message: 'Has completado exitosamente el TP 0 - Práctico',
      time: '3 días',
      type: 'success',
      read: true,
    },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const menuItems = [
    { icon: <PersonIcon />, text: 'Editar Perfil', action: () => console.log('Edit profile') },
    { 
      icon: (
        <Badge badgeContent={unreadCount} color="warning">
          <NotificationsIcon />
        </Badge>
      ), 
      text: 'Notificaciones', 
      action: () => setShowNotifications(!showNotifications) 
    },
    { icon: <SettingsIcon />, text: 'Configuración', action: () => console.log('Settings') },
    { icon: <LogoutIcon />, text: 'Cerrar Sesión', action: () => console.log('Logout') },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <AssignmentIcon color="primary" />
      case 'group': return <GroupIcon color="secondary" />
      case 'deadline': return <CircleIcon color="warning" />
      case 'comment': return <PersonIcon color="info" />
      case 'success': return <CircleIcon color="success" />
      default: return <CircleIcon />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'primary'
      case 'group': return 'secondary'
      case 'deadline': return 'warning'
      case 'comment': return 'info'
      case 'success': return 'success'
      default: return 'default'
    }
  }

  return (
    <Box className="container" sx={{ py: 2 }}>
      {/* Header */}
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        onClick={() => window.location.reload()}
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
          fontSize: { xs: '2rem', md: '2.5rem' },
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
          transition: 'opacity 0.2s ease',
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
        {/* Profile Card or Notifications */}
        <Card>
          {showNotifications ? (
            <CardContent sx={{ p: 0, height: '280px' }}>
              {/* Notifications List */}
              <Box sx={{ height: '100%', overflowY: 'auto' }}>
                {notifications.map((notification) => (
                  <ListItem 
                    key={notification.id}
                    sx={{ 
                      borderBottom: 1, 
                      borderColor: 'divider',
                      backgroundColor: notification.read ? 'transparent' : 'action.hover',
                      '&:hover': { backgroundColor: 'action.selected' }
                    }}
                  >
                    <ListItemIcon>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <CircleIcon sx={{ fontSize: 8, color: 'error.main' }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {notification.message}
                          </Typography>
                          <Chip 
                            label={`Hace ${notification.time}`}
                            size="small"
                            variant="outlined"
                            color={getNotificationColor(notification.type) as any}
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </Box>
            </CardContent>
          ) : (
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: '2rem',
                  mx: 'auto',
                  mt: {xs: 0.5, md: 2},
                  mb: 1,
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
              <Chip 
                label={`Miembro desde el ${new Date(new Date(profile.joinDate).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('es-AR')}`}
                size="small"
                variant="outlined"
                sx={{ mt: 0 }}
              />
            </CardContent>
          )}
        </Card>

        {/* Menu Items */}
        <Card sx={{ display: { xs: 'none', md: 'block' } }}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <ListItem 
                  onClick={item.action} 
                  sx={{ 
                    cursor: 'pointer', 
                    px: 3, 
                    py: 2,
                    backgroundColor: item.text === 'Notificaciones' && showNotifications ? 'action.selected' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
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
              <ListItem 
                onClick={item.action} 
                sx={{ 
                  cursor: 'pointer', 
                  px: 3, 
                  py: 2,
                  backgroundColor: item.text === 'Notificaciones' && showNotifications ? 'action.selected' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
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
