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
