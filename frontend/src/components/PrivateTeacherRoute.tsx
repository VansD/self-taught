import _ from "lodash";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Pages } from "../paths";
import { RoleUser } from "../store/enums/RoleUser";

const ProtectedTeacherRoute = () => {
  const location = useLocation();
  const { user } = useAppSelector(store => store.auth)

  if (_.isEmpty(user)) return <Navigate to={Pages.login} state={{ from: location }} />;

  return user?.role !== RoleUser.Teacher
    ? <Navigate to={Pages.errorRole} />
    : <Outlet />;
};

export default ProtectedTeacherRoute;