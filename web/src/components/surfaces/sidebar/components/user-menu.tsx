import { useState, type MouseEvent } from "react";
import { Delete, Logout, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import { useAuthentication } from "@/contexts/auth";

export function UserMenu({ onOpenDeleteAccountDialog }: { onOpenDeleteAccountDialog: () => void }) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const { user, signOut } = useAuthentication()

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  }

  return (
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
              <MenuItem onClick={onOpenDeleteAccountDialog}>
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
  )
}