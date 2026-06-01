import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate, useParams } from '@tanstack/react-router'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useAccountResetPassword, type AccountResetPasswordMutationBody } from '@/http/generated/account/account'

export const Route = createFileRoute('/(public)/password/reset/$token')({
  component: RouteComponent,
})

const formSchema = z.object({
  email: z.email('Email inválido').min(1, 'O email é obrigatório'),
  password: z.string().min(1, 'A senha é obrigatória'),
  password_confirmation: z.string().min(1, 'A confirmação da senha é obrigatória')
}).refine((data) => data.password === data.password_confirmation, {
  message: 'As senhas não coincidem',
  path: ['password_confirmation'],
})

function RouteComponent() {
  const token = useParams({
    from: "/(public)/password/reset/$token",
    select: (params) => params.token
  })
  const navigate = useNavigate()
  const { mutateAsync } = useAccountResetPassword({
    mutation: {
      onSuccess({ message }) {
        alert(message)
        navigate({ to: "/login" })
      },
      onError(error) {
        alert(error.response?.data.message || "Houve um erro ao recuperar a senha")
      }
    }
  })
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<AccountResetPasswordMutationBody, "token">>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: Omit<AccountResetPasswordMutationBody, "token">) => {
    await mutateAsync({
      data: {
        ...data,
        token
      },
    })
  }

  return (
    <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Redefinir senha
        </Typography>
        <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
          Defina uma nova senha para acessar sua conta.
        </Typography>
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%'
          }}
        >
          <Stack spacing={2}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              {...register('email')}
              error={!!errors.email}
              autoComplete="new-password"
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              type="password"
              label="Nova senha"
              error={!!errors.password}
              {...register('password')}
              autoComplete="new-password"
              helperText={errors.password?.message}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirmar senha"
              autoComplete="new-password"
              error={!!errors.password_confirmation}
              {...register('password_confirmation')}
              helperText={errors.password_confirmation?.message}
            />
            <Button type="submit" fullWidth variant="contained" size="large" sx={{ py: 1.5 }}>
              Atualizar senha
            </Button>
          </Stack>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            Voltar para login
          </Link>
        </Typography>
      </Paper>
    </Container>
  )
}