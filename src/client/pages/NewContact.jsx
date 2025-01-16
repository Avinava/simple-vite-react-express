import React from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { TextField, Button, Typography, Grid, Box, Container, Card, CardContent } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { AccountCircle, Email, Person, PersonAdd, SaveAlt } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: theme.palette.error.main,
    fontSize: "0.75rem",
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(1.5),
  },
}));

const NewContact = () => {
  const theme = useTheme();
  const classes = useStyles(); // Add this line to use the styles

  const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleContactSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/api/v1/contact/create", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });

      toast.success("Contact created successfully");
      resetForm(); // Reset form after successful creation
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while creating the contact");
    }
  };

  return (
    <Container maxWidth="md" component="main" sx={{ py: 4 }}>
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <PersonAdd sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="medium">
              New Contact
            </Typography>
          </Box>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={handleContactSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      as={TextField}
                      label="First Name"
                      required
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />,
                      }}
                    />
                    <ErrorMessage className={classes.errorMessage} name="firstName" component="div" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      as={TextField}
                      label="Last Name"
                      required
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: <AccountCircle sx={{ mr: 1, color: "action.active" }} />,
                      }}
                    />
                    <ErrorMessage className={classes.errorMessage} name="lastName" component="div" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      required
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
                      }}
                    />
                    <ErrorMessage className={classes.errorMessage} name="email" component="div" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      size="large"
                      disabled={isSubmitting}
                      startIcon={<SaveAlt />}
                      sx={{
                        mt: 2,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                      }}
                    >
                      Create Contact
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewContact;
