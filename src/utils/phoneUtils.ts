export interface Phone {
    id: number;
    name: string;
    phoneNumber: string;
    created_at: string;
}

export function validatePhoneInput(name: string, phoneNumber: string): string | null {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!phoneNumber.trim()) {
        return 'Phone number is required';
    }
    const cleanPhone = phoneNumber.replace(/[\s-()]/g, '');
    if (!/^\+?[\d]{7,15}$/.test(cleanPhone)) {
        return 'Please enter a valid phone number (7-15 digits, optional + prefix)';
    }
    return null;
}
