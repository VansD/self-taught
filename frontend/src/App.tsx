import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { RoleUser } from './store/enums/RoleUser';
import { setUser } from './store/reducers/auth/AuthSlice';
import * as _ from "lodash";

const DefaultDashboard = React.lazy(() => import("./views/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const AdminDashboard = React.lazy(() => import("./views/Admin/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const TeacherDashboard = React.lazy(() => import("./views/Teacher/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const StudentDashboard = React.lazy(() => import("./views/Student/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || '{}');

  useEffect(() => {
    if (!_.isEmpty(user) )
      dispatch(setUser(user))
  }, [user]);

  return (<React.Fragment>
    {_.isEmpty(user) && <DefaultDashboard />}
    {user?.role == RoleUser.Admin && <AdminDashboard />}
    {user?.role == RoleUser.Teacher && <TeacherDashboard />}
    {user?.role == RoleUser.Student && <StudentDashboard />}
    
  </React.Fragment>)
}

export default App;
