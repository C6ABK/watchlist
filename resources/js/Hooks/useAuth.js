import { usePage } from '@inertiajs/react';

export function useAuth() {
    const { auth } = usePage().props;
    
    return {
        user: auth.user,
        isAuthenticated: !!auth.user,
        isGuest: !auth.user,
    };
}