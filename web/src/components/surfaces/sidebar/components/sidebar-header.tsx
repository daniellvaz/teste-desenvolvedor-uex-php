import type { Contact } from "@/http/generated/api.schemas";
import { Autocomplete, Box, Paper, Stack, TextField, Typography } from "@mui/material";

export interface SidebarHeaderProps {
  contacts?: Contact[];
  onSearchChange: (value: string) => void
}

export function SidebarHeader({ contacts, onSearchChange }: SidebarHeaderProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent', borderRadius: 0, flex: '0 0 auto' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Contatos</Typography>
        </Box>
        <Autocomplete
          fullWidth
          size="small"
          onChange={(_, value) => {
            if (!value) {
              onSearchChange("")
              return;
            }

            const [__, name] = value.label.split('|')

            onSearchChange(name)
          }}
          getOptionLabel={(option) => option.label}
          options={contacts?.map(contact => ({
            id: contact.id,
            label: `${contact.cpf} | ${contact.name}`,
          })) || []}
          renderInput={({ ...params }) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Filtrar por nome ou CPF..."
            />
          )}
        />
      </Stack>
    </Paper>
  )
}