import { useState } from "react";
import { Box } from "@mui/material";

import type { Contact } from "@/http/generated/api.schemas";
import { useContactListContacts } from "@/http/generated/contact/contact";

import { UserMenu } from "./components/user-menu";
import { ContactList } from "./components/contact-list";
import { SidebarHeader } from "./components/sidebar-header";
import { UpdateContactDrawer } from "./components/update-drawer";
import { DeleteContactDialog } from "./components/delete-contact-dialog";
import { DeleteAccountDialog } from "./components/delete-account-dialog";

export function Sidebar() {
  const [search, setSearch] = useState<string>("")

  const [contact, setContact] = useState<Contact>({} as Contact);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);

  const { data: contacts, isLoading } = useContactListContacts({
    name: search
  });

  const handleOpenUpdateDrawer = (data: Contact) => {
    setIsUpdateDrawerOpen(true);
    setContact(data);
  }

  const handleOpenDeleteAlert = (data: Contact) => {
    setIsDeleteAlertOpen(true);
    setContact(data);
  }

  const handleCloseDeleteAlert = () => {
    setIsDeleteAccountDialogOpen(false);
  }

  const handleOpenDeleteAccountDialog = () => {
    setIsDeleteAccountDialogOpen(true);
  }

  const handleCloseDeleteAccountDialog = () => {
    setIsDeleteAccountDialogOpen(false);
  }

  const handleSearchContact = (value: string) => {
    setSearch(value)
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
      <SidebarHeader
        contacts={contacts}
        onSearchChange={handleSearchContact}
      />
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        onOpenDeleteContactDialog={handleOpenDeleteAlert}
        onOpenUpdateContactDialog={handleOpenUpdateDrawer}
      />
      <UserMenu
        onOpenDeleteAccountDialog={handleOpenDeleteAccountDialog}
      />
      <UpdateContactDrawer
        contact={contact}
        open={isUpdateDrawerOpen}
        onClose={() => setIsUpdateDrawerOpen(false)}
      />
      <DeleteContactDialog
        contact={contact}
        open={isDeleteAlertOpen}
        onClose={handleCloseDeleteAccountDialog}
      />
      <DeleteAccountDialog
        onClose={handleCloseDeleteAlert}
        open={isDeleteAccountDialogOpen}
      />
    </Box>
  )
}