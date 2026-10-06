import { useParams, Link as RouterLink } from 'react-router';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import { useContact } from '../hooks';
import PersonIcon from '@mui/icons-material/Person';
import { Email, Person, AccountCircle } from '@mui/icons-material';

const ContactDetail = () => {
  const { id } = useParams();
  const { contact, isLoading, error } = useContact(id);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="rounded" height={320} aria-label="Loading contact" />
      </Container>
    );
  }

  if (error || !contact) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" component={RouterLink} to="/contacts">
              All contacts
            </Button>
          }
        >
          Contact not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <PersonIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h4" component="h1" ml={2} fontWeight="medium">
              {contact.firstName} {contact.lastName}
            </Typography>
          </Box>

          {[
            {
              label: 'First Name',
              value: contact.firstName,
              icon: <Person sx={{ color: 'action.active' }} />,
            },
            {
              label: 'Last Name',
              value: contact.lastName,
              icon: <AccountCircle sx={{ color: 'action.active' }} />,
            },
            {
              label: 'Email',
              value: contact.email,
              icon: <Email sx={{ color: 'action.active' }} />,
            },
          ].map((field, index) => (
            <Box key={field.label} sx={{ mb: index !== 2 ? 3 : 0 }}>
              <Box display="flex" alignItems="center" mb={1}>
                {field.icon}
                <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
                  {field.label}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', ml: 4 }}>
                {field.value}
              </Typography>
              {index !== 2 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactDetail;
