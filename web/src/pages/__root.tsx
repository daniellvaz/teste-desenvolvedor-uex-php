import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Outlet, createRootRoute } from '@tanstack/react-router'

import { AuthenticationProvider } from '@/contexts/auth'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthenticationProvider>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </AuthenticationProvider>
  )
}
