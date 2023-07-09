"use client"

import { Store } from '@prisma/client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
    Check, 
    ChevronsUpDown, 
    PlusCircle, 
    Store as StoreIcon 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
    Command,
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator 
} from '@/components/ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

/**
 * Renders a store switcher component.
 *
 * @param {Object} props - The props object containing className and items.
 * @return The rendered store switcher component.
 */
export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {

    // Custom hook to access the store modal
    const storeModal = useStoreModal()

    // Custom hook to access the current route parameters
    const params = useParams()

    // Custom hook to access the routing functionality
    const router = useRouter()

    // Format the items array to match the expected structure
    const formattedItems = items.map((item: Store) => ({
        label: item.name,
        value: item.id
    }))

    // Find the current store based on the params.storeId
    const currentStore = formattedItems.find((item) => item.value === params.storeId)

    // State to manage the open/closed state of the popover
    const [open, setOpen] = useState(false)

    /**
     * Handles the selection of a store.
     *
     * @param {Object} store - The store object containing the value and label.
     */
    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role='combobox'
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between group", className)}
                >
                    <StoreIcon className="w-4 h-4 mr-2" />
                    {currentStore?.label}
                    <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0 group-hover:opacity-100" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandList>
                        <CommandInput placeholder='Search Store...' />
                        <CommandEmpty>No Store Found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className='text-sm'
                                >
                                    <StoreIcon className="w-4 h-4 mr-2" />
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                                className='text-sm'
                            >
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
