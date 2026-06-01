import { useForm } from 'react-hook-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Box, Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'

import type { PostLoginBody } from '../../http/generated/api.schemas'
import { useAuthentication } from '@/contexts/auth'

export const Route = createFileRoute('/(public)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { signIn } = useAuthentication()
  const { register, handleSubmit } = useForm<PostLoginBody>();

  const onSubmit = async (data: PostLoginBody) => await signIn(data)

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Entrar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Faça login na sua conta para continuar.
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <TextField {...register('email')} label="Email" type="email" fullWidth />
          <TextField  {...register('password')} label="Senha" type="password" fullWidth />
        </Stack>

        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel control={<Checkbox />} label="Lembrar-me" />
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              Esqueceu a senha?
            </Typography>
          </Link>
        </Stack>

        <Button type="submit" variant="contained" color="primary" size="large">
          Entrar
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Ainda não tem uma conta?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Typography component="span" color="primary" sx={{ fontWeight: 700 }}>
              Registre-se
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}
