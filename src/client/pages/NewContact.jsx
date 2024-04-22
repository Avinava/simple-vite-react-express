import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Typography, Grid, Box, Container, Card, CardContent } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  errorMessage: {
    color: "red",
    fontSize: "0.8rem",
  },
});

const NewContact = () => {
  const classes = useStyles();

  const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleContactSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/contact/create', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });
  
      toast.success('Contact created successfully');
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while creating the contact');
    }
  };

  return (
    <Container maxWidth="xl" component="main" sx={{ mt: 2 }}>
      <Box>
        <Card elevation={3}>
          <CardContent>
            <Box p={2}>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                }}
                validationSchema={ContactSchema}
                onSubmit={handleContactSubmit}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <Box display="flex" alignItems="center">
                          <Typography variant="h6" ml={1}>
                            New Contact
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Field
                          name="firstName"
                          as={TextField}
                          label="First Name"
                          required
                          fullWidth
                        />
                        <ErrorMessage
                          className={classes.errorMessage}
                          name="firstName"
                          component="div"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          name="lastName"
                          as={TextField}
                          label="Last Name"
                          required
                          fullWidth
                        />
                        <ErrorMessage
                          className={classes.errorMessage}
                          name="lastName"
                          component="div"
                        />
                      </Grid>
                      <Grid item>
                        <Field
                          name="email"
                          as={TextField}
                          label="Email"
                          required
                          fullWidth
                        />
                        <ErrorMessage
                          className={classes.errorMessage}
                          name="email"
                          component="div"
                        />
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" type="submit">
                          Create
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default NewContact;