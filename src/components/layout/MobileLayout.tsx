import React from 'react'
import { Box, AppBar, Toolbar, Button, Badge } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material'

interface MobileLayoutProps {
  children: React.ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // Mock notifications count - esto vendrá de un context más adelante
  const unreadNotifications = 2

  const menuItems = [
    { text: 'TPs', icon: <AssignmentIcon />, path: '/' },
    { text: 'Grupos', icon: <GroupIcon />, path: '/groups' },
    { 
      text: unreadNotifications > 0 ? (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          Perfil
          <Badge 
            badgeContent={unreadNotifications} 
            color="warning"
            sx={{
              position: 'absolute',
              top: -8,
              right: -12,
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                minWidth: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          >
            <Box sx={{ width: 0, height: 0 }} />
          </Badge>
        </Box>
      ) : 'Perfil', 
      icon: <PersonIcon />, 
      path: '/profile' 
    },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ 
          justifyContent: 'center',
          px: 2,
        }}>
          {/* Navigation Menu */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item, index) => (
              <Button
                key={typeof item.text === 'string' ? item.text : `menu-item-${index}`}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  textTransform: 'none',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

            {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: 'env(safe-area-inset-top)',
          mt: 8, // Space for fixed AppBar
          mb: 6, // Space for footer
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          py: 2,
          backgroundColor: '#fff',
          zIndex: 9999,
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Box
          component="a"
          href="https://moovimiento.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#1976d2',
            textDecoration: 'none',
            fontSize: '0.9rem',
            '&:hover': {
              color: '#ed6c02', // Naranja warning
            },
            transition: 'color 0.2s ease',
          }}
        >
          ⚡ Powered by Moovimiento
        </Box>
      </Box>
    </Box>
  )
}
