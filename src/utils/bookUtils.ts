export interface Book {
    id: number;
    title: string;
    pages: number;
    descripcion: string;
    created_at: string;
}

export function validateBookInput(title: string, pages: number, descripcion: string): string | null {
    if (!title.trim()) {
        return 'Title is required';
    }
    if (pages <= 0) {
        return 'Pages must be greater than 0';
    }
    if (!descripcion.trim()) {
        return 'Description is required';
    }
    return null;
}
