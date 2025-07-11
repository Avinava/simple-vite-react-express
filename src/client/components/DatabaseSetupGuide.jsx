import React from 'react';
import {
  Alert,
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  Storage as DatabaseIcon,
  Rocket as RocketIcon,
  CheckCircle as CheckIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

const DatabaseSetupGuide = ({ onRetry }) => {
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
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RocketIcon color="primary" />
          Quick Setup Guide
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          This template uses PostgreSQL with Prisma ORM. Follow these steps:
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>
            1. Copy Environment File
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace', mb: 2 }}>
            cp example.env .env
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            2. Configure Database URL
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Edit .env file and update DATABASE_URL:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace', mb: 2 }}>
            DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            3. Setup Database
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace', mb: 2 }}>
            npm run db:setup
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            4. Seed Sample Data (Optional)
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace', mb: 2 }}>
            npm run db:seed
          </Paper>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckIcon color="success" />
            What You'll Get
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Contact Management System<br/>
            • Project Management with Team Assignment<br/>
            • Task Management with Status Tracking<br/>
            • Sample Data for Testing
          </Typography>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={onRetry}
            startIcon={<DatabaseIcon />}
          >
            Check Database Connection
          </Button>
          <Button 
            variant="outlined" 
            href="https://www.postgresql.org/download/" 
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<DownloadIcon />}
          >
            Download PostgreSQL
          </Button>
        </Box>
      </Paper>

      <Alert severity="info">
        <Typography variant="body2">
          <strong>Need help?</strong> Check the README.md file for detailed setup instructions.
        </Typography>
      </Alert>
    </Box>
  );
};

export default DatabaseSetupGuide;