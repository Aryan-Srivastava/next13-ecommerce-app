'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

/**
 * Component for the main navigation.
 *
 * @param className - The class name for the component.
 * @param props - The HTML attributes for the component.
 * @returns The rendered component.
 */
export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    // Get the current pathname
    const pathname = usePathname()
    // Get the current params
    const params = useParams()

    // Define the routes
    const routes = [
        {
            href: `/${params?.storeId}`,
            label: 'Dashboard',
            active: pathname === `/${params?.storeId}`,
        },
        {
            href: `/${params?.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params?.storeId}/settings`,
        },
    ]

    // Render the component
    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6')}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        'text-sm font-medium transition-colors ml-5 hover:text-primary',
                        route.active
                            ? 'text-black dark:text-white'
                            : 'text-muted-foreground'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
