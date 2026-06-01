import { type ChangeEvent, type FormEvent, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

export const Route = createFileRoute('/(public)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }

    alert(`Registrado: ${form.name} (${form.email})`)
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
            <ArrowBack />
            <Link to="/login" style={{ textDecoration: 'none' }}>
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
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            id="name"
            name="name"
            label="Nome"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            id="password"
            name="password"
            label="Senha"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmação de senha"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Criar conta
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
