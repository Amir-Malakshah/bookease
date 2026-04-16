import type { Request, Response } from 'express'
import { getUserById, loginUser, registerUser } from './auth.service.js'

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required',
      })
    }

    const user = await registerUser({ name, email, password })

    return res.status(201).json({
      message: 'User registered successfully',
      user,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Registration failed'

    return res.status(400).json({ message })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const result = await loginUser({ email, password })

    return res.status(200).json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed'

    return res.status(401).json({ message })
  }
}

export async function me(req: Request, res: Response) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch {
    return res.status(500).json({ message: 'Failed to load user' })
  }
}