import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
    params: {
        storeId: string
    }
}

/**
 * Renders the dashboard page component.
 * 
 * @param {DashboardPageProps} props - The component props.
 * @returns The rendered component.
*/
const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    // Find the store with the given id
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    // Render the component
    return (
        <div>
            Active Store: {store?.name}
        </div>
    );
}

export default DashboardPage
