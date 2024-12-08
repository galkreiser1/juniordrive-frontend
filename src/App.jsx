import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar/navbar";
import Referal from "./components/Referal/Referal";
import SignUp from "./components/SignUp/SignUp";
import ResourcesTable from "./components/ResourcesTable/ResourcesTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import About from "./components/About/about";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <ChakraProvider>
          <Router>
            <AuthProvider>
              <Box minH="100vh" display="flex" flexDir="column">
                <Navbar />
                <Box flex="1">
                  <Routes>
                    <Route path="/referal" element={<Referal />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/resources" element={<ResourcesTable />} />
                    <Route path="/" element={<About />} />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </AuthProvider>
          </Router>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
