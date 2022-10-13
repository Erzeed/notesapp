import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import {getUserLogged} from "../utils/data-api"
const Protected = ({ children }) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    handleError();
  }, [error]);
  const handleError = async () => {
    const data = await getUserLogged();
    setError(data.error);
  }
  if (error) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
