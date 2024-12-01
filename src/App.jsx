import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/navbar";
import Referal from "./components/Referal/Referal";
import SignUp from "./components/SignUp/SignUp";
import ResourcesTable from "./components/ResourcesTable/ResourcesTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <ChakraProvider>
          <Router>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/referal" element={<Referal />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/resources" element={<ResourcesTable />} />
                <Route path="/" element={<Referal />} />
              </Routes>
            </AuthProvider>
          </Router>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
