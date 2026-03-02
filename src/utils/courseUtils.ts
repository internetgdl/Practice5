export interface Course {
    id: number
    name: string
    description: string
    created_at: string
}

export async function fetchCourses(): Promise<Course[]> {
    const res = await fetch('/api/courses');
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
}

/**
 * Validates the course form inputs.
 * Returns an error message string, or null if valid.
 */
export function validateCourseInput(name: string, description: string): string | null {
    if (!name.trim()) return 'Course name is required.'
    if (!description.trim()) return 'Course description is required.'
    return null
}

/**
 * Creates a new Course via the API.
 */
export async function createCourse(name: string, description: string): Promise<Course> {
    const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim() })
    });
    if (!res.ok) throw new Error('Failed to create course');
    return res.json();
}

/**
 * Deletes a course via the API.
 */
export async function deleteCourse(id: number): Promise<void> {
    const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete course');
}
