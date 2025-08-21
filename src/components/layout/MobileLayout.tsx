import React from 'react'
import { Box, AppBar, Toolbar, Button } from '@mui/material'
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

  const menuItems = [
    { text: 'TPs', icon: <AssignmentIcon />, path: '/' },
    { text: 'Grupos', icon: <GroupIcon />, path: '/groups' },
    { text: 'Perfil', icon: <PersonIcon />, path: '/profile' },
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
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  textTransform: 'none',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
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
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
