import React from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  useTheme,
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material'

interface DesktopLayoutProps {
  children: React.ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()

  const menuItems = [
    { text: 'TPs', icon: <AssignmentIcon />, path: '/' },
    { text: 'Grupos', icon: <GroupIcon />, path: '/groups' },
    { text: 'Perfil', icon: <PersonIcon />, path: '/profile' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ 
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
          maxWidth: '1000px',
          mx: 'auto',
          width: '80%'
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 3, md: 7 },
          mt: 8, // Space for fixed AppBar
          maxWidth: '1000px',
          mx: 'auto',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
