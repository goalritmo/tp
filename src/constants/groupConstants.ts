// Group privacy options
export const GROUP_PRIVACY = {
  PUBLIC: 'Público',
  PRIVATE: 'Privado',
} as const

// Group member roles
export const GROUP_ROLES = {
  ADMIN: 'Administrador',
  MEMBER: 'Miembro',
  MODERATOR: 'Moderador',
} as const

// Default group values
export const GROUP_DEFAULTS = {
  CODE: 'GRP-ABC123',
  MAX_MEMBERS: 10,
  MAX_AVATAR_GROUP: 6,
  AVATAR_SIZE: 32,
} as const

// Group actions
export const GROUP_ACTIONS = {
  EDIT: 'Editar',
  DELETE: 'Eliminar',
  LEAVE: 'Salir',
  INVITE: 'Invitar',
} as const
