import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";
import { queryClient } from "@/libs/react-query";

import type { Contact } from "@/http/generated/api.schemas";
import { getContactListContactsQueryKey, useContactDeleteContact } from "@/http/generated/contact/contact";


export interface DeleteContactDialogProps {
  open: boolean;
  contact: Contact;
  onClose: () => void;
}

export function DeleteContactDialog({ open = false, onClose, contact }: DeleteContactDialogProps) {
  const [error, setError] = useState<string>("");
  const { mutateAsync, isPending } = useContactDeleteContact({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getContactListContactsQueryKey() });
        setError("");
        onClose();
      },
      onError: (error: unknown) => {
        const anyError = error as Record<string, unknown>;
        const responseData = anyError?.response as Record<string, unknown>;
        const errorMessage = (responseData?.data as Record<string, unknown>)?.message ||
          "Ocorreu um erro ao deletar o contato";
        setError(String(errorMessage));
      },
    },
  });

  const handleDelete = async () => {
    await mutateAsync({ contact: contact.id });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Deletar Contato</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 2 }}>
          <Alert severity="warning">
            Tem certeza que deseja deletar o contato <strong>{contact.name}</strong>? Esta ação é irreversível.
          </Alert>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {/* No password required to delete a contact */}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isPending}
          sx={{
            position: "relative",
          }}
        >
          {isPending ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} />
              Deletando...
            </Box>
          ) : (
            "Deletar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
