import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const TextBlock = ({ title, content }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" height="100%" p="30px">
      {/* TITLE */}
      <Typography variant="h5" fontWeight="600" sx={{ mb: "15px" }}>
        {title}
      </Typography>

      {/* CONTENT BOX */}
      <Box
        height="75%" // Use a percentage of the parent's height
        overflow="auto" // This makes the content scrollable if it overflows
        sx={{
          "&::-webkit-scrollbar": { // Optional: Style the scrollbar
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: colors.primary[400],
          },
          "&::-webkit-scrollbar-thumb": {
            background: colors.grey[600],
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: colors.grey[500],
          },
        }}
      >
        <Typography variant="body1" sx={{ color: colors.grey[200], lineHeight: "1.7" }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextBlock;