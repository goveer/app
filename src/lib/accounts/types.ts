export type AccountType = 'personal' | 'team'

export interface TeamMember {
  user_id: string
  role: 'owner' | 'admin' | 'member'
}

export interface Account {
  id: string
  created_at: string
  owner_id: string
  type: AccountType
  name: string
  slug: string
  members?: TeamMember[]
} 