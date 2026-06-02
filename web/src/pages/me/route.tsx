import { useAuthentication } from '@/contexts/auth'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/me')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { token, user } = useAuthentication()

  useEffect(() => {
    if (!token || !user) {
      navigate({ to: "/login" })
    }
  }, [navigate, token, user])

  return <Outlet />
}
