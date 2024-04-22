import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CallToAction from "../components/CallToAction";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { toast } from "react-toastify";
import AppHeroIcon from "../components/AppHeroIcon";
import AppLoading from "../components/AppLoading";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/v1/contact/list");
        setContacts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = (id) => {
    setContactToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteContact = async () => {
    try {
      await axios.delete(`/api/v1/contact/${contactToDelete}`);
      setContacts(contacts.filter((contact) => contact.id !== contactToDelete));
      setDeleteDialogOpen(false);
      toast.success("Contact deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the contact");
    }
  };

  return (
    <Container maxWidth="xl" component="main" sx={{ mt: 2 }}>
      {isLoading ? (
        <AppLoading />
      ) : contacts.length === 0 ? (
        <>
          <CallToAction
            heroIcon={AppHeroIcon}
            title="Welcome!"
            subtitle="Let's get started. To add a new contact, click on the button below."
            url="/new-contact"
            buttonName="Add Contact"
          />
        </>
      ) : (
        <Box>
          <Box display="flex" justifyContent="flex-end" marginBottom={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/new-contact"
              startIcon={<AddCircleOutlineIcon />}
            >
              New Contact
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={10}>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell width={80}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      <IconButton component={Link} to={`/contact/${contact.id}`}>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteContact(contact.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteContact}
        title="Confirm Delete"
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />
    </Container>
  );
};

export default Contacts;