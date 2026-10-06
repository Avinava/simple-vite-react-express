import { Component } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

/**
 * Catches render errors anywhere below it and shows a friendly fallback
 * instead of a blank page. Error boundaries must be class components.
 */
class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box textAlign="center" role="alert">
          <Typography variant="h4" component="h1" gutterBottom>
            Something went wrong
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            An unexpected error occurred. Try reloading the page.
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </Box>
      </Container>
    );
  }
}

export default ErrorBoundary;
