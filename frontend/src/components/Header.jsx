import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FileText, User, Menu as MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/icon/Prancheta4.png"

export function Header({ onChangeTab }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          {/* Logo + Nome */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              marginLeft: "-15%",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: "50%",
                backgroundImage: `url(${Logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // border: "2px solid #6366F1",
              }}
            />
            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1.2em",
                background: "linear-gradient(to right, #6366F1, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stage Maker
            </Typography>
          </Box>

          {/* Navegação Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "-82%",
              gap: 4,
            }}
          >
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Home
            </Typography>
            <Typography
              component={Link}
              to="/sobre"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Sobre
            </Typography>
          </Box>

          {/* Menu Mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/sobre">
                Sobre
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/auth/login">
                Entrar
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/auth/signup">
                Cadastrar
              </MenuItem>
            </Menu>
          </Box>

          {/* Botões Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
              marginRight: "-20%"
            }}
          >
            <Button
              component={Link}
              to="/auth/login"
              variant="outlined"
              size="small"
              startIcon={<User size={16} style={{ verticalAlign: "middle" }} />}
              sx={{
                textTransform: "none",
                borderColor: "#e5e7eb",
                color: "#505050",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#535050ff",
                  color: "#ffffffff",
                  transition: ".6s",
                },
                "&:active": {
                  transform: "scale(.5)",
                },
              }}
              onClick={() => onChangeTab("login")}
            >
              Entrar
            </Button>

            <Button
              disableElevation
              component={Link}
              to="/auth/signup"
              variant="contained"
              size="small"
              startIcon={<FileText size={15} style={{ verticalAlign: "middle" }} />}
              onClick={() => onChangeTab("signup")}
              sx={{
                textTransform: "none",
                backgroundColor: "#535050ff",
                color: "#ffffffff",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#e5e7eb",
                  backgroundColor: "#ffffffff",
                  color: "#585757ff",
                  transition: ".6s",
                },
                "&:active": {
                  transform: "scale(.5)",
                },
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
