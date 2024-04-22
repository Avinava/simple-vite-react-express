import React, { useEffect, useState } from "react";
import { Paper, Container, Box, Grid, Typography, Slide } from "@mui/material";
import CallToAction from "../components/CallToAction";
import AppHeroIcon from "../components/AppHeroIcon";

const Home = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Container maxWidth="xl" component="main">
        <CallToAction
          heroIcon={AppHeroIcon}
          title="Welcome!"
          subtitle="Let's get started. To add a new deal, click on the button below."
          url="/new-deal"
          buttonName="Add Deal"
        />
      </Container>
    </Box>
  );
};

export default Home;
