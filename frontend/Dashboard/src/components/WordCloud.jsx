import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ReactWordcloud from "react-wordcloud";
import { tokens } from "../theme";
import { getWordCloudData } from "../services/apiService";
import { mockWordCloudData } from "../data/mockData";


const USE_API = true; //'false' for mock data


const WordCloud = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_API) {
      getWordCloudData().then(data => {
        setWords(data);
        setLoading(false);
      });
    } else {
      setWords(mockWordCloudData);
      setLoading(false);
    }
  }, []);

  const options = {
    colors: [
      colors.blueAccent[500],
      colors.greenAccent[500],
      colors.redAccent[500],
      colors.grey[300],
    ],
    fontFamily: "sans-serif",
    fontSizes: [20, 80],
    fontWeight: "600",
    padding: 2,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography>Loading Word Cloud...</Typography>
      </Box>
    );
  }

  return <ReactWordcloud words={words} options={options} />;
};

export default WordCloud;