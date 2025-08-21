import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import MobileLayout from './components/layout/MobileLayout'
import DesktopLayout from './components/layout/DesktopLayout'
import Assignments from './pages/assignments/Assignments'
import Groups from './pages/groups/Groups'
import Profile from './pages/auth/Profile'

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isMobile ? (
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Assignments />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MobileLayout>
        ) : (
          <DesktopLayout>
            <Routes>
              <Route path="/" element={<Assignments />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </DesktopLayout>
        )}
      </Box>
    </Router>
  )
}

export default App
