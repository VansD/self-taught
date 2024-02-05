import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Pages } from "../paths";
import { RoleUser } from "../store/enums/RoleUser";
import _ from "lodash";

const ProtectedAdminRoute = () => {
  const location = useLocation();
  const { user } = useAppSelector(store => store.auth)

  if (_.isEmpty(user)) return <Navigate to={Pages.login} state={{ from: location }} />;

  return user?.role !== RoleUser.Admin
    ? <Navigate to={Pages.errorRole} />
    : <Outlet />;
};

export default ProtectedAdminRoute;