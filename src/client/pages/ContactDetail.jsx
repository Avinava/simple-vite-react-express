import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`/api/v1/contact/${id}`);
        setContact(response.data);
        console.log("ContactDetail.jsx: contact: ", response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="xl">
      <Card>
        <CardContent>
          <Box>
            <Box display="flex" alignItems="center">
              <PersonIcon />
              <Typography variant="h6" ml={1}>
                {contact.firstName} {contact.lastName}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
              >
                First Name
              </Typography>
              <Typography variant="subtitle1">{contact.firstName}</Typography>
            </Box>
            <Divider />

            <Box mt={3}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
              >
                Last Name
              </Typography>
              <Typography variant="subtitle1">{contact.lastName}</Typography>
            </Box>
            <Divider />

            <Box mt={3}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
              >
                Email
              </Typography>
              <Typography variant="subtitle1">{contact.email}</Typography>
            </Box>
            <Divider />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactDetail;
