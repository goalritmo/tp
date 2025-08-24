// Progress color thresholds (universal across the app)
export const PROGRESS_COLORS = {
  SUCCESS: 100,
  WARNING: 70,
} as const

// Z-index values for modals (universal across the app)
export const Z_INDEX = {
  // AssignmentModal z-indexes
  ASSIGNMENT_MAIN: 10000,
  ASSIGNMENT_NESTED_1: 10001,
  ASSIGNMENT_NESTED_2: 10002,
  ASSIGNMENT_NESTED_3: 10003,
  ASSIGNMENT_NESTED_4: 10004,
  ASSIGNMENT_NESTED_5: 10005,
  ASSIGNMENT_NESTED_6: 10006,
  ASSIGNMENT_NESTED_7: 10007,
  ASSIGNMENT_NESTED_8: 10008,
  ASSIGNMENT_NESTED_9: 10009,
  // GroupModal z-indexes
  GROUP_MAIN: 15000,
  GROUP_NESTED: 16000,
  GROUP_SELECT_MENU: 17000,
} as const

// UI constants (universal across the app)
export const UI_CONSTANTS = {
  BORDER_RADIUS: 2,
  AVATAR_SIZE: 32,
  CHIP_FONT_SIZE: '0.7rem',
  SMALL_ICON_SIZE: 'small',
} as const
