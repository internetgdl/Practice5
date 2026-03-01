export interface User {
    id: number
    name: string
    hobbies: string
    created_at: string
}

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

/**
 * Validates the user form inputs.
 * Returns an error message string, or null if valid.
 */
export function validateUserInput(name: string, hobbies: string): string | null {
    if (!name.trim()) return 'Name is required.'
    if (!hobbies.trim()) return 'Hobbies are required.'
    return null
}

/**
 * Creates a new User via the API.
 */
export async function createUser(name: string, hobbies: string): Promise<User> {
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), hobbies: hobbies.trim() })
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
}

/**
 * Deletes a user via the API.
 */
export async function deleteUser(id: number): Promise<void> {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
}
