'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router, pathname]);

    if (isUserLoading || !user) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
