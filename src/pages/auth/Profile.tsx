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
  Chip,
  TextField,
  Button,
  IconButton,
} from '@mui/material'
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Circle as CircleIcon,
  School as SchoolIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Check as CheckIcon,
} from '@mui/icons-material'

export default function Profile() {
  const [activeSection, setActiveSection] = useState('') // '', 'notifications', 'settings', 'editing'
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    career: '',
    avatar: ''
  })

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

  const [notificationsState, setNotificationsState] = useState(notifications)

  const unreadCount = notificationsState.filter(n => !n.read).length

  const handleEditProfile = () => {
    if (isEditing) {
      // Cancelar edición - volver al estado normal
      setIsEditing(false)
      setEditedProfile({
        name: '',
        email: '',
        career: '',
        avatar: ''
      })
      setActiveSection('')
    } else {
      // Iniciar edición - marcar como editando
      setIsEditing(true)
      setEditedProfile({
        name: profile.name,
        email: profile.email,
        career: profile.career,
        avatar: profile.avatar
      })
      setActiveSection('editing')
    }
  }

  const handleSaveProfile = () => {
    // TODO: Guardar cambios en el backend
    console.log('Guardando cambios:', editedProfile)
    setIsEditing(false)
    setActiveSection('')
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMenuClick = (section: string) => {
    if (activeSection === section) {
      // Si ya está seleccionada, deseleccionar (volver al estado normal)
      setActiveSection('')
    } else {
      // Si no está seleccionada, seleccionarla
      setActiveSection(section)
    }
    if (isEditing && section !== 'editing') {
      setIsEditing(false)
    }
  }

  const handleMarkAsRead = (notificationId: number) => {
    setNotificationsState(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const menuItems = [
    { 
      id: isEditing ? 'editing' : 'edit-profile',
      icon: <PersonIcon />, 
      text: 'Editar Perfil', 
      action: handleEditProfile 
    },
    { 
      id: 'notifications',
      icon: (
        <Badge badgeContent={unreadCount} color="warning">
          <NotificationsIcon />
        </Badge>
      ), 
      text: 'Notificaciones', 
      action: () => handleMenuClick('notifications')
    },
    { 
      id: 'settings',
      icon: <SettingsIcon />, 
      text: 'Configuración', 
      action: () => handleMenuClick('settings')
    },
    { 
      id: 'logout',
      icon: <LogoutIcon />, 
      text: 'Cerrar Sesión', 
      action: () => console.log('Logout')
    },
  ]

  const getNotificationIcon = (type: string, isRead: boolean = true) => {
    const color = isRead ? getNotificationColor(type) : 'warning';
    switch (type) {
      case 'assignment': return <AssignmentIcon color={color as any} />  // Azul para TPs
      case 'group': return <GroupIcon color={color as any} />            // Verde para grupos
      case 'deadline': return <AssignmentIcon color={color as any} />    // TP para fechas límite
      case 'comment': return <GroupIcon color={color as any} />          // Grupo para comentarios
      case 'success': return <AssignmentIcon color={color as any} />     // TP para éxito
      default: return <AssignmentIcon color={color as any} />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'primary'  // Azul para TPs
      case 'group': return 'success'       // Verde para grupos
      case 'deadline': return 'primary'    // Azul para fechas límite (relacionado con TPs)
      case 'comment': return 'success'     // Verde para comentarios (relacionado con grupos)
      case 'success': return 'primary'     // Azul para éxito (relacionado con TPs)
      default: return 'primary'
    }
  }

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        // Modo edición
        <Box sx={{ display: 'flex', gap: 3, height: '100%', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
          {/* Columna 1: Foto y botón */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: 'primary.main',
                }}
              >
                {editedProfile.avatar}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  width: 36,
                  height: 36,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
                size="medium"
              >
                <PhotoCameraIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSaveProfile}
              size="medium"
              sx={{ minWidth: '140px' }}
            >
              Confirmar Cambios
            </Button>
          </Box>
          
          {/* Columna 2: Campos */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, mt: 2, mr: 2.2 }}>
            <TextField
              label="Nombre"
              value={editedProfile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              size="small"
              fullWidth
            />
            
            <TextField
              label="Email"
              value={editedProfile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              size="small"
              type="email"
              fullWidth
            />
            
            <TextField
              label="Carrera"
              value={editedProfile.career}
              onChange={(e) => handleInputChange('career', e.target.value)}
              size="small"
              fullWidth
            />
          </Box>
        </Box>
      )
    } else {
      return (
        // Modo visualización
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: '2rem',
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
            sx={{ mt: 1 }}
          />
        </Box>
      )
    }
  }

  const renderNotificationsContent = () => {
    return (
      <Box sx={{ p: 0, height: '280px' }}>
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
          {notificationsState.map((notification) => (
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
                  {getNotificationIcon(notification.type, notification.read)}
                </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <CircleIcon sx={{ fontSize: 8, color: 'warning.main' }} />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {notification.message}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={`Hace ${notification.time}`}
                        size="small"
                        variant="outlined"
                        color={!notification.read ? 'warning' : getNotificationColor(notification.type) as any}
                        sx={{ fontSize: '0.7rem', height: 20 }}
                      />
                                             {!notification.read && (
                         <IconButton
                           size="small"
                           onClick={() => handleMarkAsRead(notification.id)}
                           sx={{
                             backgroundColor: 'warning.main',
                             color: 'white',
                             width: 20,
                             height: 20,
                             '&:hover': {
                               backgroundColor: 'warning.dark',
                             },
                           }}
                         >
                           <CheckIcon sx={{ fontSize: 12 }} />
                         </IconButton>
                       )}
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </Box>
      </Box>
    )
  }

  const renderSettingsContent = () => {
    return (
      <Box sx={{ p: 3, height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <SettingsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Configuración
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Aquí podrás configurar las preferencias de tu cuenta, notificaciones y privacidad.
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }}>
          Próximamente
        </Button>
      </Box>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotificationsContent()
      case 'settings':
        return renderSettingsContent()
      default:
        return renderProfileContent()
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
        gap: { xs: 0.5, md: 2 },
        mb: 1
      }}>
        {/* Profile Card or Notifications */}
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 3, height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {renderContent()}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card sx={{ display: { xs: 'none', md: 'block' } }}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id || `menu-item-${index}`}>
                <ListItem 
                  onClick={item.action} 
                  sx={{ 
                    cursor: 'pointer', 
                    px: 3, 
                    py: 2,
                    backgroundColor: activeSection === item.id ? 'action.selected' : 'transparent',
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

        {/* Stats Cards - Desktop only */}
        <Box sx={{ 
          gridColumn: { xs: '1', md: '1 / -1' },
          display: { xs: 'none', md: 'grid' }, 
          gridTemplateColumns: 'repeat(3, 1fr)', 
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
            <React.Fragment key={item.id || `mobile-menu-item-${index}`}>
              <ListItem 
                onClick={item.action} 
                sx={{ 
                  cursor: 'pointer', 
                  px: 3, 
                  py: 2,
                  backgroundColor: activeSection === item.id ? 'action.selected' : 'transparent',
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

      {/* Stats Cards - Only visible on mobile */}
      <Box sx={{ 
        display: { xs: 'grid', md: 'none' }, 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 2,
        mt: 2
      }}>
        <Card sx={{ height: '140px' }}>
          <CardContent sx={{ textAlign: 'center', py: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AssignmentIcon color="primary" sx={{ fontSize: 24 }} />
              <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                {stats.completedAssignments}/{stats.totalAssignments}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              TPs Completados
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '140px' }}>
          <CardContent sx={{ textAlign: 'center', py: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <GroupIcon color="secondary" sx={{ fontSize: 24 }} />
              <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                {stats.activeGroups}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Grupos Activos
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ height: '140px' }}>
          <CardContent sx={{ textAlign: 'center', py: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SchoolIcon color="warning" sx={{ fontSize: 24 }} />
              <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                {stats.totalProgress}%
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Rendimiento
            </Typography>
          </CardContent>
        </Card>
      </Box>

    </Box>
  )
}
