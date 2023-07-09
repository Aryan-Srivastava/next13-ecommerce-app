import { UserButton, auth } from '@clerk/nextjs'

import { MainNav } from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

const Navbar = async () => {
    // Get the user ID from the authentication module
    const { userId } = auth()

    // Redirect to the sign-in page if the user ID is not available
    if (!userId) {
        redirect("/sign-in")
    }

    // Fetch the stores from prisma associated with the user ID
    const stores = await prismadb.store.findMany({
        where: { userId: userId }
    })

    // Render the navigation bar
    return (
        <div className='border-b'>
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher
                    items={stores}
                />
                <MainNav className="mx-6" />
                <div className="flex items-center ml-auto space-x-4">
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar