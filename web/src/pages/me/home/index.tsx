import { useState } from 'react'
import { Container } from '@mui/material'

import { createFileRoute } from '@tanstack/react-router'

import { CreateContactDialog } from './-create-contact-dialog'

import { Sidebar } from '@/components/surfaces/sidebar'
import { Map } from '@/components/surfaces/map'
import { CoordinatesProvider } from '@/contexts/coordinates'


export const Route = createFileRoute('/me/home/')({
  component: RouteComponent
})

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true)

  return (
    <CoordinatesProvider>
      <Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex' }}>
        <Sidebar />
        <Map onOpenModal={handleOpenDialog} />

        <CreateContactDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </Container>
    </CoordinatesProvider>
  )
}
