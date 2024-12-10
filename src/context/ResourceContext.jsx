import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { endpoints } from "../config/api";

const ResourceContext = createContext(null);

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addResource = (newResource) => {
    setResources((prevResources) => [...prevResources, newResource]);
  };

  const fetchResources = async () => {
    if (resources.length > 0) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(endpoints.resources.base);
      setResources(response.data.resources);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      setError("Failed to load resources. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    resources,
    loading,
    error,
    fetchResources,
    addResource,
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (context === null) {
    throw new Error("useResources must be used within a ResourceProvider");
  }
  return context;
};
