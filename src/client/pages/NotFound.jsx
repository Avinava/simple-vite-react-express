import React from "react";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import AppHeroIcon from "../components/AppHeroIcon";

const NotFound = () => {
  return (
    <Container maxWidth="xl">
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="50vh"
          >
            <AppHeroIcon />
            <SentimentVeryDissatisfiedIcon style={{ fontSize: 100 }} />
            <Typography variant="h4" align="center">
              404
            </Typography>
            <Typography variant="subtitle1" align="center">
              The page you're looking for cannot be found.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFound;
