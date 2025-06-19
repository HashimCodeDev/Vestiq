import { renderHook, waitFor } from '@testing-library/react'
import { useUserInfo } from '../useUserInfo'
import { onAuthStateChanged } from 'firebase/auth'

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}))

const mockOnAuthStateChanged = onAuthStateChanged as jest.MockedFunction<typeof onAuthStateChanged>

describe('useUserInfo Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns initial loading state', () => {
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      // Don't call callback immediately to simulate loading
      return jest.fn() // unsubscribe function
    })

    const { result } = renderHook(() => useUserInfo())

    expect(result.current.loading).toBe(true)
    expect(result.current.displayName).toBe(null)
    expect(result.current.photoURL).toBe(null)
    expect(result.current.email).toBe(null)
  })

  it('returns user info when user is authenticated', async () => {
    const mockUser = {
      displayName: 'John Doe',
      photoURL: 'https://example.com/photo.jpg',
      email: 'john@example.com',
    }

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      // Simulate user being authenticated
      setTimeout(() => callback(mockUser as any), 0)
      return jest.fn() // unsubscribe function
    })

    const { result } = renderHook(() => useUserInfo())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.displayName).toBe('John Doe')
    expect(result.current.photoURL).toBe('https://example.com/photo.jpg')
    expect(result.current.email).toBe('john@example.com')
  })

  it('returns null values when user is not authenticated', async () => {
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      // Simulate no user
      setTimeout(() => callback(null), 0)
      return jest.fn() // unsubscribe function
    })

    const { result } = renderHook(() => useUserInfo())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.displayName).toBe(null)
    expect(result.current.photoURL).toBe(null)
    expect(result.current.email).toBe(null)
  })

  it('handles user with partial information', async () => {
    const mockUser = {
      displayName: null,
      photoURL: null,
      email: 'user@example.com',
    }

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      setTimeout(() => callback(mockUser as any), 0)
      return jest.fn() // unsubscribe function
    })

    const { result } = renderHook(() => useUserInfo())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.displayName).toBe(null)
    expect(result.current.photoURL).toBe(null)
    expect(result.current.email).toBe('user@example.com')
  })

  it('cleans up subscription on unmount', () => {
    const mockUnsubscribe = jest.fn()
    mockOnAuthStateChanged.mockReturnValue(mockUnsubscribe)

    const { unmount } = renderHook(() => useUserInfo())

    unmount()

    expect(mockUnsubscribe).toHaveBeenCalled()
  })

  it('handles auth state changes', async () => {
    let authCallback: ((user: any) => void) | null = null

    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      authCallback = callback
      return jest.fn() // unsubscribe function
    })

    const { result } = renderHook(() => useUserInfo())

    // Initially loading
    expect(result.current.loading).toBe(true)

    // Simulate user login
    const mockUser = {
      displayName: 'Jane Doe',
      photoURL: 'https://example.com/jane.jpg',
      email: 'jane@example.com',
    }

    if (authCallback) {
      authCallback(mockUser)
    }

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.displayName).toBe('Jane Doe')
    expect(result.current.email).toBe('jane@example.com')

    // Simulate user logout
    if (authCallback) {
      authCallback(null)
    }

    await waitFor(() => {
      expect(result.current.displayName).toBe(null)
      expect(result.current.email).toBe(null)
    })
  })
})
