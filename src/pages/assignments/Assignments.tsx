import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Add as AddIcon, Info as InfoIcon } from '@mui/icons-material'
import AssignmentModal from '../../components/modals/AssignmentModal'
import AddAssignmentModal from '../../components/modals/AddAssignmentModal'

export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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

  const handleCardClick = (assignment: any) => {
    setSelectedAssignment(assignment)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAssignment(null)
  }

  const handleAddAssignment = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
  }

  const handleSaveAssignment = (assignmentData: {
    name: string
    subject: string
    dueDate: string
    description: string
  }) => {
    // Aquí se guardaría en la base de datos
    console.log('Nuevo TP creado:', assignmentData)
    
    // Por ahora solo cerramos el modal
    // En el futuro, aquí se agregaría el nuevo TP a la lista
    setIsAddModalOpen(false)
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
          Mis TPs
        </Typography>
        <Tooltip 
          title="Aquí puedes ver todos tus trabajos prácticos, su progreso y ejercicios completados. Haz click en cualquier TP para ver más detalles."
          placement={isMobile ? "bottom" : "right"}
          arrow
        >
          <IconButton size="small" sx={{ color: 'primary.main', mt: { xs: 0.8, md: 1.5 } }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

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
          <Card 
            key={assignment.id} 
            sx={{ 
              height: '180px',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
            onClick={() => handleCardClick(assignment)}
          >
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
          onClick={handleAddAssignment}
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

      {/* Assignment Modal */}
      <AssignmentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        assignment={selectedAssignment}
      />

      {/* Add Assignment Modal */}
      <AddAssignmentModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveAssignment}
      />
    </Box>
  )
}
