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

export const Route = createFileRoute('/(public)/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4
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
        <Box component="form" noValidate sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
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
