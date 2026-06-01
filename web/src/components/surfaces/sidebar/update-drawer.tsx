import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { queryClient } from "@/libs/react-query";
import { useCoordinates } from "@/contexts/coordinates";

import type { Contact } from "@/http/generated/api.schemas";
import { getContactListContactsQueryKey, useContactUpdateContact, type ContactUpdateContactMutationBody } from "@/http/generated/contact/contact";
import { addressSearchAddress, getAddressSearchAddressQueryKey } from "@/http/generated/address/address";


export interface UpdateContactDialogProps {
  open: boolean;
  contact: Contact;
  onClose: () => void;
}

export function UpdateContactDrawer({ open = false, onClose, contact }: UpdateContactDialogProps) {
  const { coordinates } = useCoordinates()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactUpdateContactMutationBody>();
  const { mutateAsync } = useContactUpdateContact({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getContactListContactsQueryKey() });

        onClose();
        reset();
      },
      onError: (error) => {
        alert(error.response?.data.message || "Ocorreu um erro ao atualizar o contato");
      }
    }
  })

  const onSubmit = async (data: ContactUpdateContactMutationBody) => {
    await mutateAsync({
      contact: contact.id,
      data
    });
  }

  const handleSearchAddress = async (zipcode: string) => {
    if (zipcode.length < 8) return; {
      const result = await queryClient.fetchQuery({
        queryKey: getAddressSearchAddressQueryKey({ cep: zipcode }),
        queryFn: () => addressSearchAddress({ cep: zipcode }),
      });

      reset({
        city: result.data.city,
        state: result.data.state,
        street: result.data.street,
        neighborhood: result.data.neighborhood,
      })

      return;
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        name: contact.name,
        cpf: contact.cpf,
        phone: contact.phone,
        zipcode: contact.zipcode,
        street: contact.street,
        number: contact.number,
        neighborhood: contact.neighborhood,
        city: contact.city,
        state: contact.state,
        complement: contact.complement,
        latitude: Number(contact.latitude),
        longitude: Number(contact.longitude),
      })
    }
  }, [open, reset, contact, coordinates])

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Novo Contato</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 2 }}>
          <Typography>
            Dados Pessoais
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              label="Nome"
              {...register("name", { required: "O nome é obrigatório" })}
              variant="outlined"
            />
            <Stack spacing={2} direction="row">
              <TextField
                fullWidth
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                label="CPF"
                {...register("cpf", { required: "O CPF é obrigatório" })}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Telefone"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone", { required: "O telefone é obrigatório" })}
                variant="outlined"
              />
            </Stack>
          </Stack>
          <Divider />
          <Typography>
            Endereço
          </Typography>
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              label="CEP"
              variant="outlined"
              sx={{ maxWidth: 200 }}
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
              {...register("zipcode", {
                required: "O CEP é obrigatório",
                onChange: (e) => handleSearchAddress(e.target.value)
              })}
            />
            <TextField
              fullWidth
              label="Rua"
              variant="outlined"
              error={!!errors.street}
              helperText={errors.street?.message}
              {...register("street", {
                required: "A rua é obrigatória",
              })}
            />
            <TextField
              fullWidth
              label="Número"
              variant="outlined"
              sx={{ maxWidth: 100 }}
              error={!!errors.number}
              helperText={errors.number?.message}
              {...register("number", { required: "O número é obrigatório" })}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              label="Bairro"
              variant="outlined"
              error={!!errors.neighborhood}
              helperText={errors.neighborhood?.message}
              {...register("neighborhood", { required: "O bairro é obrigatório" })}

            />
            <TextField
              fullWidth
              label="Cidade"
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city?.message}
              {...register("city", { required: "A cidade é obrigatória" })}
            />
            <TextField
              fullWidth
              label="Estado"
              variant="outlined"
              sx={{ maxWidth: 150 }}
              error={!!errors.state}
              helperText={errors.state?.message}
              {...register("state", { required: "O estado é obrigatório" })}

            />
          </Stack>
          <TextField
            fullWidth
            label="Complemento"
            {...register("complement")}
            variant="outlined"
          />
          <Divider />
          <Typography>
            Localização
          </Typography>
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              label="Latitude"
              variant="outlined"
              defaultValue={coordinates.latitude}
              {...register("latitude", { required: "A latitude é obrigatória" })}
            />
            <TextField
              fullWidth
              label="Longitude"
              variant="outlined"
              defaultValue={coordinates.longitude}
              {...register("longitude", { required: "A longitude é obrigatória", })}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" type="submit">
          Atualizar
        </Button>
      </DialogActions>
    </Drawer>
  )
}