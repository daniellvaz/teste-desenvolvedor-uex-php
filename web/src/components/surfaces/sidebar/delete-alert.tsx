import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { useContactDeleteContact } from "@/http/generated/delete-contact/delete-contact";
import { queryClient } from "@/libs/react-query";
import { getContactListContactsQueryKey } from "@/http/generated/list-contacts/list-contacts";
import type { Contact, ContactDeleteContactBody } from "@/http/generated/api.schemas";

export interface DeleteAlertProps {
  open: boolean;
  contact: Contact;
  onClose: () => void;
}

export function DeleteAlert({ open = false, onClose, contact }: DeleteAlertProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const { mutateAsync, isPending } = useContactDeleteContact({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getContactListContactsQueryKey() });
        setPassword("");
        setError("");
        onClose();
      },
      onError: (error: unknown) => {
        const anyError = error as Record<string, unknown>;
        const responseData = anyError?.response as Record<string, unknown>;
        const passwordErrors = (responseData?.data as Record<string, unknown>)?.errors as Record<string, unknown>;
        const errorMessage = (passwordErrors?.password as string[])?.[0] ||
          (responseData?.data as Record<string, unknown>)?.message ||
          "Ocorreu um erro ao deletar o contato";
        setError(String(errorMessage));
      },
    },
  });

  const handleDelete = async () => {
    if (!password) {
      setError("A senha é obrigatória");
      return;
    }

    try {
      const data: ContactDeleteContactBody = { password };
      await mutateAsync({
        contact: contact.id,
        data,
      });
    } catch {
      // Error is handled in onError callback
    }
  };

  const handleClose = () => {
    if (!isPending) {
      setPassword("");
      setError("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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

          <TextField
            type="password"
            label="Senha"
            placeholder="Digite sua senha para confirmar"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            disabled={isPending}
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
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
