import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;




// import { ResponsivePie } from "@nivo/pie";
// import { tokens } from "../theme";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react"; // Import React hooks
// import { Box, Typography } from "@mui/material"; // For loading message

// const PieChart = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   // 1. Create state for your data and loading status
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 2. Fetch data when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // IMPORTANT: Replace with your actual API endpoint
//         const response = await fetch("http://127.0.0.1:5000/sentiment");
//         const apiData = await response.json();
//         setData(apiData); // Update state with API data
//       } catch (error) {
//         console.error("Error fetching pie chart data:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchData();
//   }, []); // Empty array ensures this runs only once

//   // 3. Show a loading message while fetching
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//         <Typography>Loading Sentiment...</Typography>
//       </Box>
//     );
//   }

//   // Your original ResponsivePie component, now using the fetched data
//   return (
//     <ResponsivePie
//       data={data} // Using the state variable 'data' here
//       theme={{
//         axis: {
//           domain: { line: { stroke: colors.grey[100] } },
//           legend: { text: { fill: colors.grey[100] } },
//           ticks: {
//             line: { stroke: colors.grey[100], strokeWidth: 1 },
//             text: { fill: colors.grey[100] },
//           },
//         },
//         legends: { text: { fill: colors.grey[100] } },
//       }}
//       margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//       innerRadius={0.5}
//       padAngle={0.7}
//       cornerRadius={3}
//       activeOuterRadiusOffset={8}
//       borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
//       arcLinkLabelsSkipAngle={10}
//       arcLinkLabelsTextColor={colors.grey[100]}
//       arcLinkLabelsThickness={2}
//       arcLinkLabelsColor={{ from: "color" }}
//       enableArcLabels={false}
//       arcLabelsRadiusOffset={0.4}
//       arcLabelsSkipAngle={7}
//       arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
//       defs={[
//         {
//           id: "dots",
//           type: "patternDots",
//           background: "inherit",
//           color: "rgba(255, 255, 255, 0.3)",
//           size: 4,
//           padding: 1,
//           stagger: true,
//         },
//         {
//           id: "lines",
//           type: "patternLines",
//           background: "inherit",
//           color: "rgba(255, 255, 255, 0.3)",
//           rotation: -45,
//           lineWidth: 6,
//           spacing: 10,
//         },
//       ]}
//       legends={[
//         {
//           anchor: "bottom",
//           direction: "row",
//           justify: false,
//           translateX: 0,
//           translateY: 56,
//           itemsSpacing: 0,
//           itemWidth: 100,
//           itemHeight: 18,
//           itemTextColor: "#999",
//           itemDirection: "left-to-right",
//           itemOpacity: 1,
//           symbolSize: 18,
//           symbolShape: "circle",
//           effects: [{ on: "hover", style: { itemTextColor: "#fff" } }],
//         },
//       ]}
//     />
//   );
// };

// export default PieChart;