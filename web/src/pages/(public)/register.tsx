import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { ArrowBack } from '@mui/icons-material'
import Typography from '@mui/material/Typography'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

import type { AccountRegisterBody } from '@/http/generated/api.schemas'
import { useAccountRegister } from '@/http/generated/account/account'


export const Route = createFileRoute('/(public)/register')({
  component: RouteComponent,
})

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email('Email inválido').min(1, 'O email é obrigatório'),
  password: z.string().min(1, 'A senha é obrigatória'),
  password_confirmation: z.string().min(1, 'A confirmação da senha é obrigatória')
}).refine((data) => data.password === data.password_confirmation, {
  message: 'As senhas não coincidem',
  path: ['password_confirmation'],
})

function RouteComponent() {
  const navigate = useNavigate()
  const { mutateAsync } = useAccountRegister({
    mutation: {
      onSuccess: () => {
        alert('Conta criada com sucesso! Agora você pode fazer login.');
        navigate({ to: '/login' })
      },
      onError: (error) => {
        alert(error.response?.data.message || 'Ocorreu um erro ao registrar a conta. Por favor, tente novamente.')
        console.error('Erro ao registrar:', error)
      }
    }
  })
  const { register, handleSubmit, formState: { errors } } = useForm<AccountRegisterBody>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: AccountRegisterBody) {
    await mutateAsync({
      data
    })
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
      <Box
        sx={{
          mt: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ArrowBack />
              <Typography variant="body2" color="textPrimary">
                Voltar para login
              </Typography>
            </Link>
          </Stack>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
        </Stack>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            id="name"
            label="Nome"
            required
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? 'O nome é obrigatório' : ''}
            {...register('name')}
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            {...register('email')}
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? 'O email é obrigatório' : ''}
          />

          <TextField
            required
            fullWidth
            id="password"
            label="Senha"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? 'A senha é obrigatória' : ''}
          />

          <TextField
            required
            fullWidth
            type="password"
            id="confirmPassword"
            label="Confirmação de senha"
            {...register('password_confirmation')}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation ? 'A confirmação da senha é obrigatória' : ''}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Criar conta
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
