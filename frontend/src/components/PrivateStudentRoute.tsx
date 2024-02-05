import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Pages } from "../paths";
import { RoleUser } from "../store/enums/RoleUser";

const ProtectedStudentRoute = () => {
  const navigate = useNavigate();
  const { user, authToken } = useAppSelector(store => store.auth);

  if (!authToken) return <Navigate to={Pages.login} />;

  if (user?.role !== RoleUser.Student) 
    navigate(-1);
  
  return <Outlet />;
};

export default ProtectedStudentRoute;