# 🚀 Paso a Paso Técnico - TP

**Dominio:** [tp.goalritmo.com](https://tp.goalritmo.com)

## 📋 Checklist de Inicio

### ✅ Preparación del Entorno
- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] Editor de código
- [ ] Cuenta en Supabase

### ✅ Configuración Inicial

#### 1. Crear el Proyecto Base

```bash
# Crear proyecto con Vite
npm create vite@latest tp -- --template react-ts

# Navegar al directorio
cd tp

# Instalar dependencias base
npm install
```

#### 2. Instalar Dependencias Principales

```bash
# Backend y autenticación
npm install @supabase/supabase-js

# Routing
npm install react-router-dom

# Gestión de estado
npm install @tanstack/react-query

# UI y utilidades
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-date-pickers
npm install dayjs
npm install react-hook-form @hookform/resolvers zod
npm install clsx

# Dependencias de desarrollo
npm install -D @types/node
npm install -D eslint prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

#### 3. Configurar Material UI

Crear `src/theme/index.ts`:

```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});
```

Editar `src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { theme } from './theme'
import { AuthProvider, UIProvider } from './contexts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
```

Editar `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

#### 4. Configurar Supabase

1. **Crear proyecto en Supabase:**
   - Ir a [supabase.com](https://supabase.com)
   - Crear cuenta y nuevo proyecto llamado "tp-goalritmo"
   - Guardar URL y anon key

2. **Crear archivo `.env.local`:**
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

3. **Configurar autenticación:**
   - En Supabase Dashboard → Authentication → Settings
   - Habilitar Google OAuth
   - Configurar redirect URLs

#### 5. Crear Estructura de Carpetas

```bash
mkdir -p src/{components/{ui,auth,assignments,groups,layout},hooks,lib,pages/{auth,dashboard,assignments,groups},contexts,types,theme}
```

#### 6. Configurar Base de Datos

Ejecutar en Supabase SQL Editor:

```sql
-- Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  career TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tabla de materias
CREATE TABLE subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de trabajos prácticos
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject_id UUID REFERENCES subjects(id),
  due_date DATE,
  description TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tabla de ejercicios
CREATE TABLE exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de grupos de estudio
CREATE TABLE study_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject_id UUID REFERENCES subjects(id),
  assignment_id UUID REFERENCES assignments(id),
  invite_code TEXT UNIQUE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de miembros del grupo
CREATE TABLE group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Tabla de progreso de ejercicios
CREATE TABLE exercise_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(exercise_id, user_id)
);

CREATE TRIGGER update_exercise_progress_updated_at BEFORE UPDATE ON exercise_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tabla de comentarios
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para subjects (lectura pública)
CREATE POLICY "Anyone can view subjects" ON subjects FOR SELECT USING (true);

-- Políticas para assignments
CREATE POLICY "Users can view assignments" ON assignments FOR SELECT USING (true);
CREATE POLICY "Users can create assignments" ON assignments FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own assignments" ON assignments FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete own assignments" ON assignments FOR DELETE USING (auth.uid() = created_by);

-- Políticas para exercises
CREATE POLICY "Users can view exercises" ON exercises FOR SELECT USING (true);
CREATE POLICY "Users can create exercises" ON exercises FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM assignments 
    WHERE id = assignment_id AND created_by = auth.uid()
  )
);
CREATE POLICY "Users can update exercises" ON exercises FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM assignments 
    WHERE id = assignment_id AND created_by = auth.uid()
  )
);
CREATE POLICY "Users can delete exercises" ON exercises FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM assignments 
    WHERE id = assignment_id AND created_by = auth.uid()
  )
);

-- Políticas para study_groups
CREATE POLICY "Users can view study groups" ON study_groups FOR SELECT USING (true);
CREATE POLICY "Users can create study groups" ON study_groups FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own study groups" ON study_groups FOR UPDATE USING (auth.uid() = created_by);

-- Políticas para group_members
CREATE POLICY "Users can view group members" ON group_members FOR SELECT USING (true);
CREATE POLICY "Users can join groups" ON group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave groups" ON group_members FOR DELETE USING (auth.uid() = user_id);

-- Políticas para exercise_progress
CREATE POLICY "Users can view exercise progress" ON exercise_progress FOR SELECT USING (true);
CREATE POLICY "Users can update own exercise progress" ON exercise_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exercise progress" ON exercise_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para comments
CREATE POLICY "Users can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);
```

#### 7. Configurar Cliente de Supabase

Crear `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de la base de datos
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          career: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          career?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          career?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          code: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string | null
          created_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          name: string
          subject_id: string | null
          due_date: string | null
          description: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subject_id?: string | null
          due_date?: string | null
          description?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject_id?: string | null
          due_date?: string | null
          description?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      exercises: {
        Row: {
          id: string
          practical_work_id: string
          title: string
          description: string | null
          difficulty: 'easy' | 'medium' | 'hard' | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          practical_work_id: string
          title: string
          description?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          practical_work_id?: string
          title?: string
          description?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          order_index?: number
          created_at?: string
        }
      }
      study_groups: {
        Row: {
          id: string
          name: string
          subject_id: string | null
          practical_work_id: string | null
          invite_code: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          subject_id?: string | null
          practical_work_id?: string | null
          invite_code?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject_id?: string | null
          practical_work_id?: string | null
          invite_code?: string | null
          created_by?: string
          created_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role?: 'admin' | 'member'
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: 'admin' | 'member'
          joined_at?: string
        }
      }
      exercise_progress: {
        Row: {
          id: string
          exercise_id: string
          user_id: string
          completed: boolean
          completed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exercise_id: string
          user_id: string
          completed?: boolean
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exercise_id?: string
          user_id?: string
          completed?: boolean
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          exercise_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          exercise_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          exercise_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
}
```

#### 8. Configurar Tipos Globales

Crear `src/types/index.ts`:

```typescript
import type { Database } from '../lib/supabase'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Subject = Database['public']['Tables']['subjects']['Row']
export type Assignment = Database['public']['Tables']['assignments']['Row']
export type Exercise = Database['public']['Tables']['exercises']['Row']
export type StudyGroup = Database['public']['Tables']['study_groups']['Row']
export type GroupMember = Database['public']['Tables']['group_members']['Row']
export type ExerciseProgress = Database['public']['Tables']['exercise_progress']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']

export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertSubject = Database['public']['Tables']['subjects']['Insert']
export type InsertAssignment = Database['public']['Tables']['assignments']['Insert']
export type InsertExercise = Database['public']['Tables']['exercises']['Insert']
export type InsertStudyGroup = Database['public']['Tables']['study_groups']['Insert']
export type InsertGroupMember = Database['public']['Tables']['group_members']['Insert']
export type InsertExerciseProgress = Database['public']['Tables']['exercise_progress']['Insert']
export type InsertComment = Database['public']['Tables']['comments']['Insert']

export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateSubject = Database['public']['Tables']['subjects']['Update']
export type UpdateAssignment = Database['public']['Tables']['assignments']['Update']
export type UpdateExercise = Database['public']['Tables']['exercises']['Update']
export type UpdateStudyGroup = Database['public']['Tables']['study_groups']['Update']
export type UpdateGroupMember = Database['public']['Tables']['group_members']['Update']
export type UpdateExerciseProgress = Database['public']['Tables']['exercise_progress']['Update']
export type UpdateComment = Database['public']['Tables']['comments']['Update']
```

#### 9. Configurar Utilidades

Crear `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export function formatDate(date: string | Date) {
  return dayjs(date).format('DD [de] MMMM [de] YYYY')
}

export function formatDateShort(date: string | Date) {
  return dayjs(date).format('DD MMM')
}

export function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}
```

#### 10. Configurar Contexts

Crear `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
    })

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signUp(email: string, password: string, name: string) {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    // Crear perfil después del registro
    if (user) {
      await updateProfile({ name })
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) throw new Error('No user logged in')

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates })

    if (error) throw error

    // Actualizar estado local
    setProfile(prev => prev ? { ...prev, ...updates } : null)
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

Crear `src/contexts/UIContext.tsx`:

```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UIContextType {
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  snackbar: {
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning' | 'info'
  }
  showSnackbar: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void
  hideSnackbar: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as const
  })

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setSnackbar({ open: true, message, severity })
  }

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const value = {
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    snackbar,
    showSnackbar,
    hideSnackbar
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
```

Crear `src/contexts/index.ts`:

```typescript
export { AuthProvider, useAuth } from './AuthContext'
export { UIProvider, useUI } from './UIContext'
```

#### 11. Configurar Validaciones

Crear `src/lib/validations.ts`:

```typescript
import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  career: z.string().optional(),
})

export const assignmentSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  subject_id: z.string().uuid().optional(),
  due_date: z.string().optional(),
  description: z.string().optional(),
})

export const exerciseSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
})

export const studyGroupSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  subject_id: z.string().uuid().optional(),
  assignment_id: z.string().uuid().optional(),
})

export const commentSchema = z.object({
  content: z.string().min(1, "El comentario no puede estar vacío"),
})
```

## 🎯 Próximos Pasos

Una vez completada esta configuración inicial, puedes comenzar con:

1. **Fase 1: Autenticación** - Implementar login/registro
2. **Fase 2: Dashboard** - Crear la página principal
3. **Fase 3: TPs** - Gestión de trabajos prácticos
4. **Fase 4: Grupos** - Sistema de grupos de estudio

#### 12. Ejemplo de Uso de Contexts

Crear `src/components/auth/LoginForm.tsx`:

```typescript
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'
import { useUI } from '../../contexts/UIContext'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { signIn } = useAuth()
  const { showSnackbar } = useUI()
  const [error, setError] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('')
      await signIn(data.email, data.password)
      showSnackbar('¡Inicio de sesión exitoso!', 'success')
    } catch (err) {
      setError('Credenciales inválidas')
      showSnackbar('Error al iniciar sesión', 'error')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </Box>
  )
}
```

## 🎯 Próximos Pasos

Una vez completada esta configuración inicial, puedes comenzar con:

1. **Fase 1: Autenticación** - Implementar login/registro
2. **Fase 2: Dashboard** - Crear la página principal
3. **Fase 3: Assignments** - Gestión de assignments
4. **Fase 4: Grupos** - Sistema de grupos de estudio

¿Listo para comenzar? ¡Empecemos con la Fase 1! 🚀
