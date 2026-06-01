import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useAccountForgotPassword, type AccountForgotPasswordMutationBody } from '@/http/generated/account/account';



export const Route = createFileRoute('/(public)/forgot-password')({
  component: RouteComponent,
})

const formSchema = z.object({
  email: z.email('Email inválido').min(1, 'O email é obrigatório'),
})

function RouteComponent() {
  const { mutateAsync } = useAccountForgotPassword({
    mutation: {
      onSuccess({ message }) {
        alert(message)
      },
      onError(error) {
        alert(error.response?.data.message)
      }
    }
  })
  const { register, handleSubmit, formState: { errors } } = useForm<AccountForgotPasswordMutationBody>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: AccountForgotPasswordMutationBody) => {
    await mutateAsync({
      data
    })
  }

  return (
    <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Recuperar senha
        </Typography>
        <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
          Informe o e-mail da sua conta para <br />
          receber instruções de recuperação.
        </Typography>
        <Box
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            width: '100%',
            maxWidth: 400
          }}
        >
          <TextField
            required
            fullWidth
            id="email"
            autoFocus
            label="E-mail"
            margin="normal"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1 }}>
            Enviar instruções
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link to="/login" >
              Voltar para login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
