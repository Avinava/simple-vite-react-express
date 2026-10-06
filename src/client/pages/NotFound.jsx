import { Container, Card, CardContent, Typography, Box, Button } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link as RouterLink } from 'react-router';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
            minHeight="40vh"
          >
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100 }} color="action" />
            <Typography variant="h4" component="h1" align="center">
              404
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary">
              The page you&apos;re looking for cannot be found.
            </Typography>
            <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
              Back home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFound;
