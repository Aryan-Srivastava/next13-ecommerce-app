"use client"

import { useEffect } from 'react'

import { useStoreModal } from '@/hooks/use-store-modal'

const SetupPage = () => {

  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if(!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <main className="p-4">

    </main>
  )
}

export default SetupPage