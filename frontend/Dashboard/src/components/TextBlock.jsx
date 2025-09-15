import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { getTextBlockContent } from "../services/apiService";
import { mockTextBlockContent } from "../data/mockData";

const USE_API = true; //'false' for mock data


const TextBlock = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_API) {
      getTextBlockContent().then(data => {
        setContent(data);
        setLoading(false);
      });
    } else {
      setContent(mockTextBlockContent);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box p="30px">
        <Typography variant="h3" fontWeight="600" sx={{ mb: "30px" }}>
          {title}
        </Typography>
        <Typography>Loading Summary...</Typography>
      </Box>
    );
  }

  return (
    <Box width="100%" height="100%" p="30px">
      <Typography variant="h3" fontWeight="600" sx={{ mb: "30px" }}>
        {title}
      </Typography>

      <Box
        height="75%"
        overflow="auto"
        sx={{
          "&::-webkit-scrollbar": {
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
        <Typography variant="h5" sx={{ color: colors.grey[200], lineHeight: "1.7" }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextBlock;