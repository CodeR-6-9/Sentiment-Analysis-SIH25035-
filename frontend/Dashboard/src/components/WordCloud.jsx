import { useTheme } from "@mui/material";
import ReactWordcloud from "react-wordcloud";
import { tokens } from "../theme";
import { mockWordCloudData as data } from "../data/mockData";

// Note: The 'react-wordcloud' library requires the data to have keys 'text' and 'value'.
// Your existing mockWordCloudData is already in the correct format!

const WordCloud = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Options for the word cloud
  const options = {
    colors: [
      colors.blueAccent[500],
      colors.greenAccent[500],
      colors.redAccent[500],
      colors.grey[300],
    ],
    fontFamily: "sans-serif",
    fontSizes: [20, 80], // Min and max font size
    fontWeight: "600",
    padding: 2,
    rotations: 2,
    rotationAngles: [0, 90], // Words will be either horizontal or vertical
    scale: "sqrt",
    spiral: "archimedean",
  };

  return <ReactWordcloud words={data} options={options} />;
};

export default WordCloud;