import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Login = ({ onLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    onLogin(username, password);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ p: 2 }} // Add some padding on the outer container for small screens
    >
      {/* --- MODIFIED THIS BOX --- */}
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        p="40px" // 1. Reduced padding for better spacing
        borderRadius="8px"
        backgroundColor={colors.primary[500]}
        boxShadow={3}
        width="100%"     // 2. Ensure it takes full width on small screens
        maxWidth="450px" // 3. Set a max-width for large screens
      >
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLoginClick}
          sx={{
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;