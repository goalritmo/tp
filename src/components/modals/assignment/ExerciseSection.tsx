
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Button,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Note as NoteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  SwapVert as SwapVertIcon,
  Add as AddIcon,
} from '@mui/icons-material'

interface Exercise {
  id: number
  name: string
  completed: boolean
  description: string
  links: { text: string; url: string }[]
  attachments: { name: string; url: string }[]
}

interface ExerciseSectionProps {
  section: {
    id: string
    name: string
    exercises: Exercise[]
  }
  isEditing: boolean
  isMoveMode: boolean
  expandedSections: Record<string, boolean>
  completedExercises: Set<number>
  onToggleSection: (sectionId: string) => void
  onToggleExercise: (exerciseId: number) => void
  onEditSection: (sectionId: string) => void
  onDeleteSection: (sectionId: string) => void
  onEditExercise: (exerciseId: number) => void
  onDeleteExercise: (exerciseId: number) => void
  onToggleExerciseCompletion: (exerciseId: number) => void
  onOpenNotes: (exerciseId: number) => void
  onOpenSectionNotes: (sectionId: string) => void
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void
  onAddExercise: (sectionId: string) => void
}

export default function ExerciseSection({
  section,
  isEditing,
  isMoveMode,
  expandedSections,
  completedExercises,
  onToggleSection,
  onToggleExercise,
  onEditSection,
  onDeleteSection,
  onEditExercise,
  onDeleteExercise,
  onToggleExerciseCompletion,
  onOpenNotes,
  onOpenSectionNotes,
  onMoveSection,
  onAddExercise,
}: ExerciseSectionProps) {
  const isExpanded = expandedSections[section.id] || false
  const completedCount = section.exercises.filter(ex => completedExercises.has(ex.id)).length
  const progress = section.exercises.length > 0 ? (completedCount / section.exercises.length) * 100 : 0

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success'
    if (progress >= 70) return 'warning'
    return 'primary'
  }

  return (
    <Box sx={{ mb: 2 }}>
      {/* Section Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderRadius: 1,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          cursor: isEditing && !isMoveMode ? 'pointer' : 'default',
          '&:hover': {
            backgroundColor: isEditing && !isMoveMode ? 'action.hover' : 'background.paper',
          },
        }}
        onClick={() => {
          if (isEditing && !isMoveMode) {
            onToggleSection(section.id)
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          {!isEditing && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onToggleSection(section.id)
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flex: 1 }}>
            {section.name}
          </Typography>

          {!isEditing && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onOpenSectionNotes(section.id)
              }}
            >
              <NoteIcon fontSize="small" />
            </IconButton>
          )}

          {isEditing && !isMoveMode && (
            <>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  onEditSection(section.id)
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteSection(section.id)
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}

          {isMoveMode && (
            <>
              <IconButton
                size="small"
                disabled={section.id === 'teoria'} // First section
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveSection(section.id, 'up')
                }}
              >
                <SwapVertIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                disabled={section.id === 'entrega'} // Last section
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveSection(section.id, 'down')
                }}
              >
                <SwapVertIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      {/* Section Progress */}
      <Box sx={{ mt: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {completedCount} de {section.exercises.length} ejercicios completados
          </Typography>
          <Chip
            label={`${Math.round(progress)}%`}
            size="small"
            color={getProgressColor(progress) as any}
            sx={{ ml: 1 }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={getProgressColor(progress) as any}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>

      {/* Exercises List */}
      <Collapse in={isExpanded || isEditing}>
        <List sx={{ pl: 2 }}>
          {section.exercises.map((exercise) => (
            <ListItem
              key={exercise.id}
              sx={{
                pl: 0,
                pr: 0,
                py: 0.5,
                cursor: isEditing ? 'default' : 'pointer',
                '&:hover': {
                  backgroundColor: isEditing ? 'transparent' : 'action.hover',
                },
              }}
              onClick={() => {
                if (!isEditing) {
                  onToggleExercise(exercise.id)
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleExerciseCompletion(exercise.id)
                  }}
                >
                  {completedExercises.has(exercise.id) ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <RadioButtonUncheckedIcon fontSize="small" />
                  )}
                </IconButton>
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      textDecoration: completedExercises.has(exercise.id) ? 'line-through' : 'none',
                      color: completedExercises.has(exercise.id) ? 'text.secondary' : 'text.primary',
                    }}
                  >
                    {exercise.name}
                  </Typography>
                }
              />

              {!isEditing && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenNotes(exercise.id)
                  }}
                >
                  <NoteIcon fontSize="small" />
                </IconButton>
              )}

              {isEditing && (
                <>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditExercise(exercise.id)
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteExercise(exercise.id)
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Add Exercise Button */}
      {isEditing && isExpanded && (
        <Box sx={{ mt: 1, pl: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => onAddExercise(section.id)}
            sx={{ textTransform: 'none' }}
          >
            Agregar Ejercicio
          </Button>
        </Box>
      )}
    </Box>
  )
}
