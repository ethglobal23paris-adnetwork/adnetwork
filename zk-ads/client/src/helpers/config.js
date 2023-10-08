const isLocalhost = window.location.hostname === "localhost";
export const BACKEND_URL = isLocalhost
  ? "http://localhost:8000/"
  : "https://api.zkads.xyz";
