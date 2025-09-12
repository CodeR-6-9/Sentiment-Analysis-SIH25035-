import { Box } from "@mui/material";
import Header from "../../components/Header";
import TextBlock from "../../components/TextBlock";
import { mockTextBlockContent } from "../../data/mockData"; // 1. Import your data

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Summary" subtitle="Detailed Analysis Report" />
      <Box height="75vh">
        {/* 2. Pass the data as props */}
        <TextBlock 
          title="Analysis Details" 
          content={mockTextBlockContent} 
        />
      </Box>
    </Box>
  );
};

export default Bar;