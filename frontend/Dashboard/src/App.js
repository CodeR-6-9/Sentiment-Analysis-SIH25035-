import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import IndiSum from "./scenes/individualsum";
import Summary from "./scenes/summar";
import Wc from "./scenes/WordC";
import Pie from "./scenes/pie";
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    if (username && password) {
      console.log("Login attempt with:", username, password);
      setIsLoggedIn(true);
    } else {
      alert("Please enter a username and password.");
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : ( */}
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/individualsummaries" element={<IndiSum />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/wordcloud" element={<Wc />} />
              </Routes>
            </main>
          </div>
        {/* )} */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;