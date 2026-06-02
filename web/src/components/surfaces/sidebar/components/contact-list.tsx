import { useCoordinates } from "@/contexts/coordinates";
import type { Contact } from "@/http/generated/api.schemas";
import type { ContactListContactsQueryResult } from "@/http/generated/contact/contact";
import { Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, List, ListItemButton, ListItemText, Typography } from "@mui/material";

export interface ContactListProps {
  isLoading: boolean;
  contacts?: ContactListContactsQueryResult;
  onOpenUpdateContactDialog: (contact: Contact) => void;
  onOpenDeleteContactDialog: (contact: Contact) => void;
}

export function ContactList({ contacts, isLoading, onOpenUpdateContactDialog, onOpenDeleteContactDialog }: ContactListProps) {
  const { setCoordinates } = useCoordinates()

  return (
    <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress />
        </Box>
      ) : !contacts || contacts.length === 0 ? (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ p: 2 }}>
          Nenhum contato por aqui.
          Clique com o botão direito no mapa para começar
        </Typography>
      ) : (
        <List disablePadding>
          {contacts.map((contact) => (
            <ListItemButton
              key={contact.id}
              onClick={() => setCoordinates({
                latitude: parseFloat(contact.latitude!),
                longitude: parseFloat(contact.longitude!),
              })}
              sx={{
                py: 1.5,
                borderBottom: '1px solid #e0e0e0',
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ListItemText
                primary={contact.name}
                secondary={contact.phone}
              />
              <Box sx={{ display: 'flex', gap: 0.5 }} onClick={(e) => e.stopPropagation()}>
                <IconButton size="small" color="primary" onClick={() => onOpenUpdateContactDialog(contact)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => onOpenDeleteContactDialog(contact)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  )
}