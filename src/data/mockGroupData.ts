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
    name: 'Algoritmos & Chill',
    subject: 'Algoritmos I',
    members: [
      { id: 1, name: 'Juan Pérez', avatar: 'JP' },
      { id: 5, name: 'Laura Silva', avatar: 'LS' },
      { id: 6, name: 'Roberto Díaz', avatar: 'RD' },
    ],
    totalMembers: 3,
    activeAssignments: 1,
    groupProgress: 90,
  },
]
