import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, Divider } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import StorageIcon from "@mui/icons-material/Storage";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import ApiIcon from "@mui/icons-material/Api";
import SchemaIcon from "@mui/icons-material/Schema";

const Home = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      title: "Contacts Management Demo",
      description: "Full CRUD application showcasing form handling, data persistence, and REST API integration",
      icon: <ContactsIcon sx={{ fontSize: 40 }} />,
      action: () => navigate("/contacts"),
      primary: true,
    },
    {
      title: "Modern Frontend Stack",
      description: "React 19, Vite, Material-UI, and React Router for robust client-side architecture",
      icon: <ArchitectureIcon sx={{ fontSize: 40 }} />,
      action: null,
    },
    {
      title: "Backend Infrastructure",
      description: "Express.js with Prisma ORM featuring structured routes and middleware patterns",
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      action: null,
    },
  ];

  const technicalFeatures = [
    {
      title: "Design Patterns",
      description: "Component composition, HOCs, custom hooks, and state management examples",
      icon: <SchemaIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "API Integration",
      description: "Axios interceptors, error handling, and RESTful endpoint organization",
      icon: <ApiIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Development Tools",
      description: "Hot reloading, debugging setup, and development/production configurations",
      icon: <IntegrationInstructionsIcon sx={{ fontSize: 40 }} />,
    },
  ];

  const renderFeatureCards = (features) => (
    <Grid container spacing={4}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={features.length === 3 ? 4 : 6} key={index}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: feature.primary ? 2 : 1,
              borderColor: feature.primary ? "primary.main" : "divider",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.default",
                transition: "0.3s",
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Box mb={2} color={feature.primary ? "primary.main" : "text.secondary"}>
                {feature.icon}
              </Box>
              <Typography gutterBottom variant="h5" component="h2">
                {feature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {feature.description}
              </Typography>
            </CardContent>
            {feature.action && (
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button variant={feature.primary ? "contained" : "outlined"} onClick={feature.action} size="large">
                  Explore Demo
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          simple-vite-react-express template
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A comprehensive starter kit demonstrating modern web development practices
        </Typography>
      </Box>

      {renderFeatureCards(mainFeatures)}

      <Box my={6}>
        <Divider />
        <Typography variant="h4" component="h2" textAlign="center" my={4}>
          Technical Demonstrations
        </Typography>
        {renderFeatureCards(technicalFeatures)}
      </Box>
    </Container>
  );
};

export default Home;
