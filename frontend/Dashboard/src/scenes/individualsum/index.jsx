import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { getContactsData } from "../../services/apiService";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";

// --- CONTROL YOUR DATA SOURCE HERE ---
const USE_API = true; // Set to 'true' for live data, 'false' for mock data
// ------------------------------------

const IndiSum = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_API) {
      getContactsData().then(data => {
        setContacts(data);
        setLoading(false);
      });
    } else {
      setContacts(mockDataContacts);
      setLoading(false);
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // {
    //   field: "name",
    //   headerName: "Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "address",
      headerName: "Summary",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Summaries"
        subtitle="List of Relevant Individual Summaries for in-depth analysis"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          loading={loading}
          checkboxSelection
          rows={contacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default IndiSum;