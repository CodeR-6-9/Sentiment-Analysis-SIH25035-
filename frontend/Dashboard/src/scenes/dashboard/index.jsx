import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { getPieData, submitReview, getTextBlockContent } from "../../services/apiService";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Header from "../../components/Header";
import TextBlock from "../../components/TextBlock";
import StatBox from "../../components/StatBox";
import WordCloud from "../../components/WordCloud";
import PieChart from "../../components/PieChart";
import StorageIcon from '@mui/icons-material/Storage';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State management
  const [pieData, setPieData] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [summaryText, setSummaryText] = useState("Loading analysis summary...");

  // Fetch pie data and summary on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPieData();
        setPieData(data);
        
        // Fetch summary text
        const summary = await getTextBlockContent();
        setSummaryText(summary);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate dynamic metrics from pieData
  const totalReviews = pieData.reduce((sum, item) => sum + item.value, 0);
  const favorCount = pieData.find((item) => item.id === "favor")?.value || 0;
  const opposeCount = pieData.find((item) => item.id === "oppose")?.value || 0;

  // Handle review submission
  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      alert("Please enter a review");
      return;
    }

    try {
      await submitReview(reviewText);
      setReviewText("");
      // Re-fetch pie data to update dashboard
      const updatedData = await getPieData();
      setPieData(updatedData);
      
      // Re-fetch summary text to update with new review
      const updatedSummary = await getTextBlockContent();
      setSummaryText(updatedSummary);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* REVIEW SUBMISSION FORM */}
      <Box
        backgroundColor={colors.primary[400]}
        p="20px"
        borderRadius="4px"
        mt="20px"
        mb="20px"
      >
        <Typography variant="h5" fontWeight="600" mb="15px">
          Submit a Legal Review
        </Typography>
        <Box display="flex" gap="10px">
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter your legal review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: colors.grey[100],
                "& fieldset": {
                  borderColor: colors.grey[300],
                },
                "&:hover fieldset": {
                  borderColor: colors.blueAccent[500],
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.blueAccent[500],
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubmitReview}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontWeight: "bold",
              padding: "15px 30px",
              alignSelf: "flex-end",
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalReviews.toLocaleString()}
            subtitle="Review Received"
            progress="0.75"
            increase="+14%"
            icon={
              <StorageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={favorCount.toLocaleString()}
            subtitle="In-favour"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={opposeCount.toLocaleString()}
            subtitle="In-oppose"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonRemoveIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Sentiments
          </Typography>
          <Box
            height="250px"
            mt="25px"
          >
            <PieChart data={pieData} />
          </Box>
        </Box>
        
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Word Cloud
          </Typography>
          <Box height="200px">
            <WordCloud />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <TextBlock
            title="Comprehensive Analysis Summary"
            content={summaryText}
          />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;