import { Box } from "@mui/material";
import Header from "../../components/Header";
import WordCloud from "../../components/WordCloud";

const Wc = () => {
  return (
    <Box m="20px">
      <Header title="Word Cloud"/>
      <Box height="75vh">
        <WordCloud />
      </Box>
    </Box>
  );
};

export default Wc;
