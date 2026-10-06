import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Avatar,
  AvatarGroup,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Delete as DeleteIcon,
  Folder as ProjectIcon,
  People as PeopleIcon,
  Assignment as TaskIcon,
} from '@mui/icons-material';
import { useProjects } from '../hooks';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { CardGridSkeleton, EmptyState, ErrorState } from '../components/PageState';

const statusColors = {
  active: 'success',
  planning: 'warning',
  completed: 'primary',
  on_hold: 'default',
};

const Projects = () => {
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Data access goes through the hook (hook -> service -> axios)
  const { projects, isLoading, error, refresh, deleteProject } = useProjects();

  const handleConfirmDelete = async () => {
    const id = projectToDelete;
    setProjectToDelete(null);
    await deleteProject(id).catch(() => {}); // the API layer already shows an error toast
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const calculateProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.status === 'DONE').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          <ProjectIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Projects
        </Typography>
      </Box>

      {error && <ErrorState message="Could not load projects." onRetry={refresh} />}
      {isLoading && <CardGridSkeleton />}

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {project.name}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label={`Delete project ${project.name}`}
                      onClick={() => setProjectToDelete(project.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                {project.description && (
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {project.description}
                  </Typography>
                )}

                <Box mb={2}>
                  <Chip
                    label={project.status.replaceAll('_', ' ').toUpperCase()}
                    color={statusColors[project.status] || 'default'}
                    size="small"
                  />
                </Box>

                {/* Project Stats */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TaskIcon fontSize="small" />
                    <Typography variant="body2">{project._count?.tasks || 0} tasks</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PeopleIcon fontSize="small" />
                    <Typography variant="body2">{project._count?.members || 0} members</Typography>
                  </Box>
                </Box>

                {/* Progress Bar */}
                {project.tasks && project.tasks.length > 0 && (
                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">{calculateProgress(project.tasks)}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={calculateProgress(project.tasks)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}

                {/* Team Members */}
                {project.members && project.members.length > 0 && (
                  <Box mb={2}>
                    <Typography variant="body2" mb={1}>
                      Team
                    </Typography>
                    <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                      {project.members.map((member) => (
                        <Avatar
                          key={member.id}
                          sx={{ width: 32, height: 32, fontSize: '0.875rem' }}
                          title={`${member.contact.firstName} ${member.contact.lastName} (${member.role})`}
                        >
                          {getInitials(member.contact.firstName, member.contact.lastName)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                )}

                {/* Dates */}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Start: {formatDate(project.startDate)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    End: {formatDate(project.endDate)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isLoading && !error && projects.length === 0 && (
        <EmptyState title="No projects found">
          Run `npm run db:seed` for sample data, or POST to /api/v1/project/create.
        </EmptyState>
      )}

      <ConfirmationDialog
        open={projectToDelete !== null}
        title="Delete project?"
        message="This cannot be undone and removes the project's memberships."
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default Projects;
