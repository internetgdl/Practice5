import { validateUserInput, createUser, deleteUser, fetchUsers } from '../utils/userUtils'

const globalFetch = globalThis as any;
globalFetch.fetch = jest.fn()

describe('validateUserInput', () => {
    it('returns null when both fields are filled', () => {
        expect(validateUserInput('Ana', 'coding')).toBeNull()
    })

    it('returns an error when name is empty', () => {
        expect(validateUserInput('', 'coding')).toBe('Name is required.')
    })

    it('returns an error when hobbies is empty', () => {
        expect(validateUserInput('Ana', '')).toBe('Hobbies are required.')
    })

    it('returns an error when name is only whitespace', () => {
        expect(validateUserInput('   ', 'coding')).toBe('Name is required.')
    })

    it('returns an error when hobbies is only whitespace', () => {
        expect(validateUserInput('Ana', '   ')).toBe('Hobbies are required.')
    })
})

describe('createUser', () => {
    beforeEach(() => {
        (globalFetch.fetch as jest.Mock).mockClear()
    })

    it('makes a POST request to create a user and trims inputs', async () => {
        const mockResponse = { id: 1, name: 'Ana', hobbies: 'coding', created_at: '2026-03-01T00:00:00.000Z' }
            ; (globalFetch.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockResponse
            })

        const user = await createUser('  Ana  ', '  coding  ')

        expect(globalFetch.fetch).toHaveBeenCalledWith('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Ana', hobbies: 'coding' })
        })
        expect(user).toEqual(mockResponse)
    })

    it('throws an error if the request fails', async () => {
        ; (globalFetch.fetch as jest.Mock).mockResolvedValue({ ok: false })

        await expect(createUser('Ana', 'coding')).rejects.toThrow('Failed to create user')
    })
})

describe('deleteUser', () => {
    beforeEach(() => {
        (globalFetch.fetch as jest.Mock).mockClear()
    })

    it('makes a DELETE request to remove a user', async () => {
        ; (globalFetch.fetch as jest.Mock).mockResolvedValue({ ok: true })

        await deleteUser(2)

        expect(globalFetch.fetch).toHaveBeenCalledWith('/api/users/2', { method: 'DELETE' })
    })

    it('throws an error if the request fails', async () => {
        ; (globalFetch.fetch as jest.Mock).mockResolvedValue({ ok: false })

        await expect(deleteUser(2)).rejects.toThrow('Failed to delete user')
    })
})

describe('fetchUsers', () => {
    beforeEach(() => {
        (globalFetch.fetch as jest.Mock).mockClear()
    })

    it('makes a GET request to fetch users', async () => {
        const mockUsers = [{ id: 1, name: 'Ana', hobbies: 'coding' }]
            ; (globalFetch.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockUsers
            })

        const users = await fetchUsers()

        expect(globalFetch.fetch).toHaveBeenCalledWith('/api/users')
        expect(users).toEqual(mockUsers)
    })

    it('throws an error if the request fails', async () => {
        ; (globalFetch.fetch as jest.Mock).mockResolvedValue({ ok: false })

        await expect(fetchUsers()).rejects.toThrow('Failed to fetch users')
    })
})
