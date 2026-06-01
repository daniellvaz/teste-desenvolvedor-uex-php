import { Delete, Edit, Logout, MoreVert } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";

import { useAuthentication } from "@/contexts/auth";

import { useCoordinates } from "@/contexts/coordinates";
import { UpdateContactDrawer } from "./update-drawer";
import { DeleteAlert } from "./delete-alert";
import { useState, type MouseEvent } from "react";
import type { Contact } from "@/http/generated/api.schemas";
import { useAccountDeleteAccount } from "@/http/generated/account/account";
import { useContactListContacts } from "@/http/generated/contact/contact";
import { useNavigate } from "@tanstack/react-router";

export function Sidebar() {
  const navigate = useNavigate()
  const { setCoordinates } = useCoordinates()
  const { user, signOut } = useAuthentication()
  const { mutateAsync: deleteAccount } = useAccountDeleteAccount({
    mutation: {
      onSuccess() {
        navigate({ to: "/login" })
      },
      onError(error) {
        alert(error.response?.data.message)
      }
    }
  })
  const { data: contacts, isLoading } = useContactListContacts();

  const [contact, setContact] = useState<Contact>({} as Contact);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);

  const handleOpenUpdateDrawer = (data: Contact) => {
    setIsUpdateDrawerOpen(true);
    setContact(data);
  }

  const handleOpenDeleteAlert = (data: Contact) => {
    setIsDeleteAlertOpen(true);
    setContact(data);
  }

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  }

  const handleOpenDeleteAccountDialog = () => {
    setIsDeleteAccountDialogOpen(true);
    handleCloseMenu();
  }

  const handleCloseDeleteAccountDialog = () => {
    setIsDeleteAccountDialogOpen(false);
  }

  const handleConfirmDeleteAccount = async () => {
    setIsDeleteAccountDialogOpen(false);
    await deleteAccount()
  }

  return (
    <Box
      sx={{
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent', borderRadius: 0, flex: '0 0 auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Contatos</Typography>
          </Box>
          <TextField
            placeholder="Filtrar por nome ou CPF..."
            size="small"
            variant="outlined"
            fullWidth
          />
        </Stack>
      </Paper>
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
                  <IconButton size="small" color="primary" onClick={() => handleOpenUpdateDrawer(contact)}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleOpenDeleteAlert(contact)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>

      <Box sx={{ flex: '0 0 auto', borderTop: '1px solid #e0e0e0' }}>
        <Divider />
        <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent', borderRadius: 0 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2">{user?.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {user?.email}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleOpenMenu}>
                <MoreVert fontSize="small" />
              </IconButton>
              <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={handleOpenDeleteAccountDialog}>
                  <ListItemIcon>
                    <Delete fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Deletar conta</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
            <Button
              fullWidth
              variant="outlined"
              onClick={signOut}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Stack>
        </Paper>
      </Box>

      <UpdateContactDrawer open={isUpdateDrawerOpen} onClose={() => setIsUpdateDrawerOpen(false)} contact={contact} />
      <DeleteAlert open={isDeleteAlertOpen} onClose={() => setIsDeleteAlertOpen(false)} contact={contact} />
      <Dialog open={isDeleteAccountDialogOpen} onClose={handleCloseDeleteAccountDialog}>
        <DialogTitle>Deletar conta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAccountDialog}>Cancelar</Button>
          <Button color="error" onClick={handleConfirmDeleteAccount}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}