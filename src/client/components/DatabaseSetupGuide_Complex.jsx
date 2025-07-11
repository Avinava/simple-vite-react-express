import React from 'react';
import {
  Alert,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  Storage as DatabaseIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

const DatabaseSetupGuide = ({ onRetry }) => {
  console.log('DatabaseSetupGuide rendering...');
  
  const steps = [
    {
      title: 'Copy Environment File',
      command: 'cp example.env .env',
      description: 'Create your environment configuration file',
    },
    {
      title: 'Configure Database URL',
      command: 'Edit .env file',
      description: 'Update DATABASE_URL with your PostgreSQL connection string',
      example: 'DATABASE_URL="postgresql://username:password@localhost:5432/dbname"',
    },
    {
      title: 'Setup Database',
      command: 'npm run db:setup',
      description: 'Run migrations and generate Prisma client',
    },
    {
      title: 'Seed Sample Data (Optional)',
      command: 'npm run db:seed',
      description: 'Add sample contacts, projects, and tasks for testing',
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <DatabaseIcon />
          Database Setup Required
        </Typography>
        <Typography variant="body2">
          It looks like your database isn't set up yet. Follow the steps below to get started.
        </Typography>
      </Alert>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <PlayIcon color="primary" />
          Quick Setup Guide
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          This template uses PostgreSQL with Prisma ORM. Follow these steps to set up your database:
        </Typography>

        <List>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemIcon>
                  <Chip label={index + 1} size="small" color="primary" sx={{ mt: 0.5 }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div" gutterBottom>
                      {step.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {step.description}
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          bgcolor: 'grey.50',
                          fontFamily: 'monospace',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <CodeIcon fontSize="small" color="action" />
                        <Typography variant="body2" component="code">
                          {step.command}
                        </Typography>
                      </Paper>
                      {step.example && (
                        <Box mt={1}>
                          <Typography variant="caption" color="text.secondary">
                            Example:
                          </Typography>
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 1,
                              bgcolor: 'grey.100',
                              fontFamily: 'monospace',
                              fontSize: '0.75rem',
                            }}
                          >
                            {step.example}
                          </Paper>
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < steps.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, bgcolor: 'primary.50' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <CheckIcon color="success" />
          What You'll Get
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          After setup, you'll have access to:
        </Typography>

        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="success" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Contact Management System" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="success" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Project Management with Team Assignment" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="success" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Task Management with Status Tracking" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="success" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sample Data for Testing" />
          </ListItem>
        </List>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={onRetry} startIcon={<DatabaseIcon />}>
            Check Database Connection
          </Button>
          <Button
            variant="outlined"
            href="https://www.postgresql.org/download/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PostgreSQL
          </Button>
        </Box>
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>Need help?</strong> Check the README.md file for detailed setup instructions or
          visit the project documentation.
        </Typography>
      </Alert>
    </Box>
  );
};

export default DatabaseSetupGuide;
