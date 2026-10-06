import { Alert, Box, Button, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';

/**
 * Placeholder cards shown while a list page loads.
 * @param {{count?: number}} props
 */
export function CardGridSkeleton({ count = 6 }) {
  return (
    <Grid container spacing={3} aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="rounded" height={24} width={120} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

/**
 * Inline error with an optional retry button.
 * @param {{message: string, onRetry?: Function}} props
 */
export function ErrorState({ message, onRetry }) {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        )
      }
    >
      {message}
    </Alert>
  );
}

/**
 * Centered empty-state message.
 * @param {{title: string, children?: import('react').ReactNode}} props
 */
export function EmptyState({ title, children }) {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      {children && (
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      )}
    </Box>
  );
}
