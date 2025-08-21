# 📚 TP - Gestión Colaborativa de Trabajos Prácticos

Una aplicación web que permite a estudiantes universitarios organizar sus trabajos prácticos, formar grupos de estudio y colaborar en tiempo real para mantener el ritmo de aprendizaje.

**Dominio:** [tp.goalritmo.com](https://tp.goalritmo.com)

## 🎯 Objetivo

Permitir a los estudiantes registrar TPs, marcar ejercicios y ver el progreso propio y del grupo, fomentando la colaboración y el trabajo al mismo ritmo.

## 🚀 MVP - Funcionalidades Indispensables

### 🔑 Autenticación Básica
- Registro/login con Google
- Perfil mínimo: nombre, materia/carrera

### 📂 Gestión de TPs
- Crear TP con nombre, materia y fecha de entrega
- Crear ejercicios dentro del TP
- Marcar ejercicios como completados

### 👥 Grupos de Estudio
- Crear grupo por TP o materia
- Invitar compañeros mediante link o código
- Ver progreso individual dentro del grupo
- Barra de progreso global del grupo

### 📊 Progreso & Visualización
- % de avance de cada TP (individual y grupal)
- Listado de ejercicios completados y pendientes

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Material UI (MUI)** - Componentes de UI
- **React Router** - Navegación
- **React Query** - Gestión de estado del servidor
- **React Context** - Gestión de estado global

### Backend
- **Supabase** - Backend as a Service
  - Autenticación (Google, email)
  - Base de datos PostgreSQL
  - Realtime subscriptions
  - Storage para archivos

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint + Prettier** - Linting y formateo
- **Vitest** - Testing

## 📋 Paso a Paso Técnico

### 1. Configuración Inicial del Proyecto

```bash
# Crear proyecto con Vite
npm create vite@latest tp -- --template react-ts

# Navegar al directorio
cd tp

# Instalar dependencias base
npm install

# Instalar dependencias adicionales
npm install @supabase/supabase-js
npm install react-router-dom
npm install @tanstack/react-query
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-date-pickers
npm install dayjs
npm install react-hook-form @hookform/resolvers zod
npm install clsx

# Instalar dependencias de desarrollo
npm install -D @types/node
npm install -D eslint prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### 2. Configuración de Material UI

```bash
# Material UI ya está configurado con las dependencias instaladas
# No se requiere configuración adicional
```

### 3. Configuración de Supabase

1. Crear cuenta en [supabase.com](https://supabase.com)
2. Crear nuevo proyecto llamado "tp-goalritmo"
3. Configurar autenticación con Google OAuth
4. Crear las tablas de la base de datos

### 4. Estructura de Base de Datos

```sql
-- Tabla de usuarios (extendida de auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  career TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

-- Tabla de comentarios
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Estructura de Carpetas

```
src/
├── components/
│   ├── ui/           # Componentes base (Button, Input, etc.)
│   ├── auth/         # Componentes de autenticación
│   ├── assignments/  # Componentes de TPs
│   ├── groups/       # Componentes de grupos
│   └── layout/       # Componentes de layout
├── hooks/
│   ├── useAuth.ts
│   ├── usePracticalWorks.ts
│   ├── useGroups.ts
│   └── useSupabase.ts
├── lib/
│   ├── supabase.ts   # Configuración de Supabase
│   ├── utils.ts      # Utilidades generales
│   └── validations.ts # Esquemas de validación
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── assignments/
│   └── groups/
├── contexts/
│   ├── AuthContext.tsx
│   ├── UIContext.tsx
│   └── index.ts
├── types/
│   └── index.ts
└── App.tsx
```

### 6. Configuración de Variables de Entorno

Crear archivo `.env.local`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

### 7. Implementación por Fases

#### Fase 1: Autenticación y Perfil (Semana 1)
- [ ] Configurar Supabase Auth
- [ ] Crear componentes de login/registro
- [ ] Implementar perfil de usuario
- [ ] Protección de rutas

#### Fase 2: Gestión de Assignments (Semana 2)
- [ ] CRUD de assignments
- [ ] Gestión de ejercicios
- [ ] Marcado de progreso
- [ ] Dashboard principal

#### Fase 3: Grupos de Estudio (Semana 3)
- [ ] Creación de grupos
- [ ] Sistema de invitaciones
- [ ] Visualización de progreso grupal
- [ ] Comentarios en ejercicios

#### Fase 4: Mejoras y Testing (Semana 4)
- [ ] Optimizaciones de UI/UX
- [ ] Testing de componentes
- [ ] Deploy a producción
- [ ] Documentación final

## 🎨 Diseño y UX

### Tema de Material UI
- **Primario**: Azul (#1976d2)
- **Secundario**: Verde (#2e7d32)
- **Acento**: Naranja (#ed6c02)
- **Neutro**: Gris (#757575)

### Componentes UI
- Botones Material (Button, IconButton)
- Cards Material (Card, CardContent, CardActions)
- Progress bars (LinearProgress, CircularProgress)
- Modales (Dialog, DialogTitle, DialogContent)
- Tooltips y Snackbars
- DataGrid para tablas
- DatePickers para fechas

## 📱 Responsive Design

La aplicación debe funcionar perfectamente en:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deploy

### Opciones de Hosting
1. **Vercel** (recomendado para React)
   - Configurar dominio personalizado: `tp.goalritmo.com`
2. **Netlify**
3. **Firebase Hosting**

### Pasos para Deploy
1. Build del proyecto: `npm run build`
2. Configurar variables de entorno en el hosting
3. Configurar dominio personalizado: `tp.goalritmo.com`
4. Deploy automático desde GitHub

## 📊 Métricas de Éxito

- Usuarios activos por semana
- TPs completados
- Participación en grupos
- Tiempo promedio de finalización de TPs

## 🔮 Funcionalidades Futuras

- Chat en tiempo real
- Gamificación (rankings, badges)
- Integración con Google Drive/Notion
- Modo offline
- Notificaciones push
- Estadísticas avanzadas

## 📦 Componentes Material UI Principales

### Navegación
- `AppBar` - Barra superior
- `Drawer` - Menú lateral
- `BottomNavigation` - Navegación móvil

### Formularios
- `TextField` - Campos de texto
- `Select` - Selectores
- `DatePicker` - Selector de fechas
- `Checkbox` - Casillas de verificación

### Datos
- `DataGrid` - Tablas de datos
- `Card` - Tarjetas de información
- `List` - Listas
- `Table` - Tablas simples

### Feedback
- `Snackbar` - Notificaciones
- `Dialog` - Modales
- `Progress` - Barras de progreso
- `Alert` - Alertas

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.