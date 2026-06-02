import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

export function SidebarHeader() {
  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent', borderRadius: 0, flex: '0 0 auto' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Contatos</Typography>
        </Box>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Filtrar por nome ou CPF..."
        />
      </Stack>
    </Paper>
  )
}