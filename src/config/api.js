const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    logout: `${API_URL}/api/auth/logout`,
    status: `${API_URL}/api/auth/status`,
  },
  referers: {
    base: `${API_URL}/api/referers`,
    byEmail: (email) => `${API_URL}/api/referers/referer/${email}`,
    byCompany: (company) => `${API_URL}/api/referers/${company}`,
    delete: (email) => `${API_URL}/api/referers/${email}`,
  },
  companies: {
    base: `${API_URL}/api/company`,
  },
  resources: {
    base: `${API_URL}/api/resources`,
    withFile: `${API_URL}/api/resources/with-file`,
  },
};
