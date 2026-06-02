import z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

import { useAccountDeleteAccount, type AccountDeleteAccountMutationBody } from "@/http/generated/account/account";
import { useNavigate } from "@tanstack/react-router";

const formSchema = z.object({
  password: z.string("A senha é obrigatória").min(6, "Insira pelo menos 6 digitos")
})

export interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteAccountDialog({ open, onClose }: DeleteAccountDialogProps) {
  const navigate = useNavigate()
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
  const { register, handleSubmit, formState: { errors } } = useForm<AccountDeleteAccountMutationBody>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: AccountDeleteAccountMutationBody) => {
    await deleteAccount({
      data
    })
  }

  return (
    <Dialog
      component="form"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Deletar conta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.
        </DialogContentText>
        <TextField
          fullWidth
          label="Senha"
          sx={{ mt: 2 }}
          type="password"
          variant="outlined"
          placeholder="Digite sua senha para confirmar"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          type="submit"
          color="error"
          startIcon={<Delete fontSize="small" />}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}
