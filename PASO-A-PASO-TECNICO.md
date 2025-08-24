# 🚀 Paso a Paso Técnico - TP

**Dominio:** [tp.goalritmo.com](https://tp.goalritmo.com)

## 📋 Estado Actual del Proyecto

### ✅ Estructura de Archivos Actualizada

```
tp/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── modals/
│   │       ├── assignment/
│   │       │   ├── ExerciseSection.tsx
│   │       │   ├── ConfirmationModals.tsx
│   │       │   ├── EditExerciseModal.tsx
│   │       │   ├── mockData.ts
│   │       │   ├── types.ts
│   │       │   ├── utils.ts
│   │       │   ├── index.ts
│   │       │   └── hooks/
│   │       ├── AssignmentModal.tsx
│   │       ├── GroupModal.tsx
│   │       ├── AddTPOptionsModal.tsx
│   │       ├── AddAssignmentModal.tsx
│   │       ├── AddGroupModal.tsx
│   │       └── AddGroupOptionsModal.tsx
│   ├── constants/
│   │   ├── appConstants.ts
│   │   ├── assignmentConstants.ts
│   │   └── groupConstants.ts
│   ├── data/
│   │   └── mockGroupData.ts
│   ├── types/
│   │   └── group.ts
│   ├── pages/
│   │   ├── auth/
│   │   ├── assignments/
│   │   └── groups/
│   ├── theme/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PASO-A-PASO-TECNICO.md
```

### ✅ Refactorización Completada

#### **1. Centralización de Tipos**
- **Archivo:** `src/types/group.ts`
- **Contenido:** Interfaces `Group` y `GroupMember`
- **Beneficio:** Reutilización y consistencia de tipos

#### **2. Constantes Organizadas**
- **`src/constants/appConstants.ts`:** Constantes universales (PROGRESS_COLORS, Z_INDEX, UI_CONSTANTS)
- **`src/constants/assignmentConstants.ts`:** Constantes específicas de assignments
- **`src/constants/groupConstants.ts`:** Constantes específicas de grupos

#### **3. Datos Mock Centralizados**
- **`src/data/mockGroupData.ts`:** Datos mock de grupos
- **`src/components/modals/assignment/mockData.ts`:** Datos mock específicos del modal de assignment

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
    fontFamily: '"Helvetica", "Inter", "Roboto", "Arial", sans-serif',
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
  font-family: 'Helvetica', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

#### 4. Crear Estructura de Constantes

Crear `src/constants/appConstants.ts`:

```typescript
export const PROGRESS_COLORS = {
  SUCCESS: 100,
  WARNING: 70,
} as const;

export const Z_INDEX = {
  ASSIGNMENT_MAIN: 10000,
  ASSIGNMENT_NESTED_1: 10001,
  ASSIGNMENT_NESTED_2: 10002,
  ASSIGNMENT_NESTED_3: 10003,
  GROUP_MAIN: 15000,
  GROUP_NESTED: 16000,
  GROUP_SELECT_MENU: 17000,
} as const;

export const UI_CONSTANTS = {
  BORDER_RADIUS: 2,
  AVATAR_SIZE: 32,
  CHIP_FONT_SIZE: '0.7rem',
  SMALL_ICON_SIZE: 'small',
} as const;
```

Crear `src/constants/assignmentConstants.ts`:

```typescript
export const ASSIGNMENT_STATUS = {
  IN_PROGRESS: 'En progreso',
  COMPLETED: 'Completado',
  PAUSED: 'Pausado',
  DELETED: 'Borrar',
} as const;

export const ASSIGNMENT_TYPES = {
  TP: 'TP',
  PRACTICE: 'Práctica',
  EXAM: 'Examen',
} as const;

export const ASSIGNMENT_SECTIONS = {
  EXERCISES: 'Ejercicios',
  NOTES: 'Notas',
  RESOURCES: 'Recursos',
} as const;

export const ASSIGNMENT_DEFAULTS = {
  DEADLINE: '15 de Marzo, 2025',
  PROGRESS_PERCENTAGE: 75,
  EXERCISES_COMPLETED: '6 de 8 ejercicios',
  TOTAL_EXERCISES: 8,
} as const;
```

Crear `src/constants/groupConstants.ts`:

```typescript
export const GROUP_PRIVACY = {
  PUBLIC: 'Público',
  PRIVATE: 'Privado',
} as const;

export const GROUP_ROLES = {
  ADMIN: 'Administrador',
  MEMBER: 'Miembro',
} as const;

export const GROUP_DEFAULTS = {
  CODE: 'GRP-ABC123',
  MAX_MEMBERS: 10,
  MAX_AVATAR_GROUP: 6,
  AVATAR_SIZE: 32,
} as const;

export const GROUP_ACTIONS = {
  EDIT: 'Editar',
  DELETE: 'Eliminar',
  LEAVE: 'Salir',
} as const;
```

#### 5. Crear Tipos Centralizados

Crear `src/types/group.ts`:

```typescript
export interface GroupMember {
  id: number
  name: string
  avatar: string
  role?: string
}

export interface Group {
  id: number
  name: string
  subject: string
  members: GroupMember[]
  totalMembers: number
  activeAssignments: number
  groupProgress: number
}
```

#### 6. Crear Datos Mock Centralizados

Crear `src/data/mockGroupData.ts`:

```typescript
import type { Group } from '../types/group'

export const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Los Algoritmos del Apocalipsis',
    subject: 'Algoritmos I',
    members: [
      { id: 1, name: 'Juan Pérez', avatar: 'JP' },
      { id: 2, name: 'María García', avatar: 'MG' },
      { id: 3, name: 'Carlos López', avatar: 'CL' },
      { id: 4, name: 'Ana Martínez', avatar: 'AM' },
    ],
    totalMembers: 4,
    activeAssignments: 2,
    groupProgress: 75,
  },
  {
    id: 2,
    name: 'Programadores Unidos',
    subject: 'Algoritmos I',
    members: [
      { id: 5, name: 'Luis Rodríguez', avatar: 'LR' },
      { id: 6, name: 'Sofía Torres', avatar: 'ST' },
    ],
    totalMembers: 2,
    activeAssignments: 1,
    groupProgress: 45,
  },
]
```

#### 7. Configurar Supabase

1. **Crear proyecto en Supabase:**
   - Ir a [supabase.com](https://supabase.com)
   - Crear cuenta y nuevo proyecto llamado "tp-goalritmo"
   - Guardar URL y anon key

2. **Crear archivo `.env.local`:**
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

## 🏗️ Arquitectura del Proyecto

### **Patrones de Diseño Implementados**

#### **1. Separación de Responsabilidades**
- **Modales:** Cada modal tiene su propia responsabilidad específica
- **AssignmentModal:** Gestión de detalles de TP y ejercicios
- **GroupModal:** Gestión de grupos y miembros
- **AddModals:** Creación de nuevos elementos

#### **2. Centralización de Datos**
- **Tipos:** Definidos en `src/types/`
- **Constantes:** Organizadas por dominio en `src/constants/`
- **Mock Data:** Centralizado en `src/data/`

#### **3. Gestión de Estado**
- **Local State:** `useState` para estado específico de componentes
- **Modal State:** Estados independientes para cada modal
- **Form State:** Estados para formularios de creación/edición

### **Estructura de Componentes**

#### **Modales Principales**
1. **AssignmentModal:** Modal complejo con múltiples vistas
   - Vista de secciones y ejercicios
   - Modo de edición
   - Gestión de notas y recursos
   - Edición de nombre del TP

2. **GroupModal:** Modal para gestión de grupos
   - Vista de TPs activos
   - Gestión de miembros
   - Edición de grupo
   - Código de grupo

3. **AddModals:** Modales de creación
   - AddAssignmentModal
   - AddGroupModal
   - AddTPOptionsModal

#### **Componentes de Assignment**
- **ExerciseSection:** Sección de ejercicios
- **EditExerciseModal:** Edición de ejercicios
- **ConfirmationModals:** Modales de confirmación

## 🔧 Funcionalidades Implementadas

### **AssignmentModal**
- ✅ Visualización de secciones y ejercicios
- ✅ Modo de edición con reordenamiento
- ✅ Edición de nombre del TP
- ✅ Gestión de notas y recursos
- ✅ Confirmación de eliminación
- ✅ Compartir en grupos

### **GroupModal**
- ✅ Visualización de TPs activos
- ✅ Gestión de miembros
- ✅ Edición de nombre del grupo
- ✅ Código de grupo para compartir
- ✅ Cambio de estado de TPs
- ✅ Eliminación de miembros

### **AddModals**
- ✅ Creación de assignments
- ✅ Creación de grupos
- ✅ Opciones para agregar TPs

## 🚀 Comandos de Desarrollo

### **Desarrollo**
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

### **Testing**
```bash
# Ejecutar tests
npm run test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

### **Linting y Formateo**
```bash
# Linting
npm run lint

# Formateo
npm run format

# Linting con auto-fix
npm run lint:fix
```

## 📝 Próximos Pasos

### **Fase 1: Backend Integration**
- [ ] Configurar Supabase completamente
- [ ] Implementar autenticación
- [ ] Crear tablas de base de datos
- [ ] Conectar modales con backend

### **Fase 2: Funcionalidades Avanzadas**
- [ ] Sistema de notificaciones
- [ ] Historial de cambios
- [ ] Búsqueda y filtros
- [ ] Exportación de datos

### **Fase 3: Optimización**
- [ ] Lazy loading de componentes
- [ ] Optimización de rendimiento
- [ ] Testing completo
- [ ] Documentación de API

## 🔍 Debugging y Troubleshooting

### **Problemas Comunes**

#### **1. Errores de TypeScript**
```bash
# Verificar tipos
npx tsc --noEmit

# Limpiar cache
rm -rf node_modules/.cache
```

#### **2. Errores de Build**
```bash
# Limpiar build
rm -rf dist

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### **3. Problemas de Z-Index**
- Verificar constantes en `appConstants.ts`
- Asegurar que modales anidados tengan z-index mayor

### **Logs de Desarrollo**
```typescript
// Agregar logs para debugging
console.log('Estado actual:', { isEditing, isEditingName, selectedTP })
```

## 📚 Recursos y Referencias

### **Documentación**
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query)
- [Supabase](https://supabase.com/docs)

### **Patrones de Código**
- **Gestión de Estado:** useState para estado local
- **Modales:** Dialog de Material-UI
- **Formularios:** react-hook-form con validación
- **Tipos:** TypeScript interfaces

### **Convenciones**
- **Nombres de archivos:** PascalCase para componentes
- **Nombres de variables:** camelCase
- **Constantes:** UPPER_SNAKE_CASE
- **Tipos:** PascalCase con sufijo descriptivo
