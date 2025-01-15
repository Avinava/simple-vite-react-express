import React from "react";
import { Toolbar, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          mb: 4,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link href="/" color="inherit" style={{ textDecoration: "none" }} sx={{ flexGrow: 8, textAlign: "left" }}>
            <Box display="flex" alignItems="center">
              <img height={40} src="/template-logo.png" alt="logo" />
              <Box ml={1}>simple-vite-react-express</Box>
            </Box>
          </Link>
          <Button component={RouterLink} to="/contacts" color="inherit">
            Contacts
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
