import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userState);

  if (!user) return <Navigate to="/landing" />;

  return children;
};
