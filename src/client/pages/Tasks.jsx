import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Delete as DeleteIcon, Assignment as TaskIcon } from '@mui/icons-material';
import { useTasks } from '../hooks';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { CardGridSkeleton, EmptyState, ErrorState } from '../components/PageState';

const statusColors = {
  TODO: 'default',
  IN_PROGRESS: 'primary',
  REVIEW: 'warning',
  DONE: 'success',
};

const priorityColors = {
  LOW: 'success',
  MEDIUM: 'warning',
  HIGH: 'error',
  URGENT: 'error',
};

const STATUS_ACTIONS = [
  { status: 'TODO', label: 'To Do' },
  { status: 'IN_PROGRESS', label: 'In Progress' },
  { status: 'REVIEW', label: 'Review' },
  { status: 'DONE', label: 'Done', color: 'success' },
];

const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  return new Date(dateString).toLocaleDateString();
};

const Tasks = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Data access goes through the hook (hook -> service -> axios)
  const { tasks, isLoading, error, refresh, updateTaskStatus, deleteTask } = useTasks({
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
  });

  const handleConfirmDelete = async () => {
    const id = taskToDelete;
    setTaskToDelete(null);
    await deleteTask(id).catch(() => {}); // the API layer already shows an error toast
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          <TaskIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Tasks
        </Typography>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="REVIEW">Review</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="URGENT">Urgent</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <ErrorState message="Could not load tasks." onRetry={refresh} />}
      {isLoading && <CardGridSkeleton />}

      {/* Tasks Grid */}
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={task.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {task.title}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label={`Delete task ${task.title}`}
                      onClick={() => setTaskToDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                {task.description && (
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {task.description}
                  </Typography>
                )}

                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={task.status.replaceAll('_', ' ')}
                    color={statusColors[task.status]}
                    size="small"
                  />
                  <Chip
                    label={task.priority}
                    color={priorityColors[task.priority]}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  Due: {formatDate(task.dueDate)}
                </Typography>

                {task.assignee && (
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Assigned to: {task.assignee.firstName} {task.assignee.lastName}
                  </Typography>
                )}

                {task.project && (
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Project: {task.project.name}
                  </Typography>
                )}

                {/* Status Update Buttons */}
                <Box display="flex" gap={1} flexWrap="wrap">
                  {STATUS_ACTIONS.filter((action) => action.status !== task.status).map(
                    (action) => (
                      <Button
                        key={action.status}
                        size="small"
                        variant="outlined"
                        color={action.color}
                        onClick={() => updateTaskStatus(task.id, action.status).catch(() => {})}
                      >
                        {action.label}
                      </Button>
                    )
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {!isLoading && !error && tasks.length === 0 && (
        <EmptyState title="No tasks found">
          {statusFilter || priorityFilter
            ? 'Try clearing the filters.'
            : 'Run `npm run db:seed` for sample data, or POST to /api/v1/task/create.'}
        </EmptyState>
      )}

      <ConfirmationDialog
        open={taskToDelete !== null}
        title="Delete task?"
        message="This cannot be undone."
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default Tasks;
