import React from "react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CallToAction = ({ heroIcon: HeroIcon, icon: Icon = AddCircleOutlineIcon, title, subtitle, url, buttonName }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      bgcolor: "background.paper",
      boxShadow: 3,
      transition: "0.3s",
      "&:hover": {
        boxShadow: 6,
        bgcolor: "background.default",
      },
    }}
  >
    <CardContent>
      <Grid container direction="column" alignItems="center" spacing={2}>
        {HeroIcon && (
          <Grid item>
            <HeroIcon sx={{ fontSize: 50 }} />
          </Grid>
        )}
        <Grid item>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{subtitle}</Typography>
        </Grid>
        {url && (
          <Grid item>
            <Button variant="contained" color="primary" component={Link} to={url} startIcon={<Icon />}>
              {buttonName}
            </Button>
          </Grid>
        )}
      </Grid>
    </CardContent>
  </Card>
);

export default CallToAction;
