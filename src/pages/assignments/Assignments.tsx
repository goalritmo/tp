import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material'

export default function Assignments() {

  // Mock data - esto vendrá de los contexts más adelante
  const assignments = [
    {
      id: 1,
      name: 'TP 0 - Práctico',
      subject: 'Algoritmos I',
      dueDate: '2025-08-28',
      progress: 100,
      exercises: 5,
      completedExercises: 5,
    },
    {
      id: 2,
      name: 'TP 0 - Laboratorio',
      subject: 'Algoritmos I',
      dueDate: '2025-09-03',
      progress: 60,
      exercises: 8,
      completedExercises: 5,
    },
  ]

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success'
    if (progress >= 70) return 'warning'
    return 'primary'
  }

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
        Mis TPs
      </Typography>

      {/* Assignments Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          lg: 'repeat(3, 1fr)' 
        }, 
        gap: 2,
        justifyContent: 'center'
      }}>
        {assignments.map((assignment) => (
          <Card key={assignment.id} sx={{ height: '180px' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" component="div" gutterBottom noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%', width: '100%' }}>
                    {assignment.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    {assignment.subject}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`${assignment.progress}%`}
                      color={getProgressColor(assignment.progress)}
                      size="small"
                    />
                    <Chip 
                      label={`${assignment.completedExercises}/${assignment.exercises} ejercicios`}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Box>
                <IconButton size="small" color="primary">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Progress Bar */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flex: 1, mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={assignment.progress} 
                    color={getProgressColor(assignment.progress)}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              </Box>

              {/* Due Date */}
              <Typography variant="caption" color="text.secondary">
                Fecha límite: {new Date(new Date(assignment.dueDate).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('es-AR')}
              </Typography>
            </CardContent>
          </Card>
        ))}
        
        {/* Add Assignment Card */}
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
          onClick={() => console.log('Add new assignment')}
        >
          <Box sx={{ textAlign: 'center' }}>
            <AddIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h6" color="primary">
              Agregar TP
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crear nuevo trabajo práctico
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
