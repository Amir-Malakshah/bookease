export type JwtPayload = {
    userId: string
    email: string
    role: 'ADMIN' | 'USER'
  }