import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ContactPage as ContactIcon,
  Assignment as TaskIcon,
  Folder as ProjectIcon,
  Rocket as RocketIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import DatabaseSetupGuide from '../components/DatabaseSetupGuide';

const Home = () => {
  const [dbStatus, setDbStatus] = useState('checking'); // 'checking', 'connected', 'error'
  const [stats, setStats] = useState(null);

  const checkDatabaseConnection = async () => {
    try {
      setDbStatus('checking');
      console.log('Checking database connection...');

      // Try to fetch health endpoint first
      const healthRes = await axios.get('/api/v1/health').catch(() => null);
      if (!healthRes) {
        throw new Error('Server not responding');
      }

      // Try to fetch some basic data to check if DB is set up
      const contactsRes = await axios.get('/api/v1/contact/list');
      const tasksRes = await axios.get('/api/v1/task/list').catch(() => ({ data: { data: [] } }));
      const projectsRes = await axios
        .get('/api/v1/project/list')
        .catch(() => ({ data: { data: [] } }));

      setStats({
        contacts: contactsRes.data.data?.length || 0,
        tasks: tasksRes.data.data?.length || 0,
        projects: projectsRes.data.data?.length || 0,
      });
      setDbStatus('connected');
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error);
      setDbStatus('error');
    }
  };

  useEffect(() => {
    checkDatabaseConnection();
  }, []);

  if (dbStatus === 'error') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <DatabaseSetupGuide onRetry={checkDatabaseConnection} />
      </Container>
    );
  }

  if (dbStatus === 'checking') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box textAlign="center" py={8}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Checking database connection...
          </Typography>
        </Box>
      </Container>
    );
  }

  const features = [
    {
      icon: <ContactIcon fontSize="large" color="primary" />,
      title: 'Contact Management',
      description: 'Manage your contacts with detailed information, company details, and notes.',
      link: '/contacts',
      count: stats?.contacts || 0,
      color: 'primary',
    },
    {
      icon: <TaskIcon fontSize="large" color="secondary" />,
      title: 'Task Management',
      description: 'Track tasks with priorities, status workflows, and team assignments.',
      link: '/tasks',
      count: stats?.tasks || 0,
      color: 'secondary',
    },
    {
      icon: <ProjectIcon fontSize="large" color="success" />,
      title: 'Project Management',
      description: 'Organize projects with team members, timelines, and progress tracking.',
      link: '/projects',
      count: stats?.projects || 0,
      color: 'success',
    },
  ];

  const techFeatures = [
    {
      icon: <CodeIcon />,
      title: 'Modern Stack',
      description:
        'React 19, Vite 6+, Express.js, PostgreSQL, and Prisma ORM with the latest best practices.',
    },
    {
      icon: <RocketIcon />,
      title: 'Developer Experience',
      description:
        'Hot reload, ESLint, Prettier, comprehensive scripts, and structured architecture.',
    },
    {
      icon: <SecurityIcon />,
      title: 'Production Ready',
      description:
        'Security middleware, input validation, error handling, and deployment configurations.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Modern Full-Stack Template
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A production-ready project management system built with React, Express, and PostgreSQL
        </Typography>

        {stats && (stats.contacts > 0 || stats.tasks > 0 || stats.projects > 0) && (
          <Alert severity="success" sx={{ mt: 2, mb: 2, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="body2">
              🎉 Database is set up with sample data! Explore the features below.
            </Typography>
          </Alert>
        )}

        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/contacts"
          sx={{ mt: 2, mr: 2 }}
        >
          Explore Features
        </Button>
        <Button
          variant="outlined"
          size="large"
          href="https://github.com/Avinava/simple-vite-react-express"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          View on GitHub
        </Button>
      </Box>

      {/* Feature Cards */}
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom mb={4}>
        What's Included
      </Typography>

      <Grid container spacing={4} mb={6}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Chip label={`${feature.count} items`} color={feature.color} size="small" />
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  component={RouterLink}
                  to={feature.link}
                  variant="outlined"
                  color={feature.color}
                >
                  Explore {feature.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Technical Features */}
      <Typography variant="h4" component="h2" textAlign="center" gutterBottom mb={4}>
        Technical Features
      </Typography>

      <Grid container spacing={4} mb={6}>
        {techFeatures.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {feature.icon}
                  <Typography variant="h6" component="h3" ml={1}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
