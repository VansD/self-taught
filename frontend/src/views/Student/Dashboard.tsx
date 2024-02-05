import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { useGetUsersQuery } from '../../services/AdminService';
import { setUsers } from '../../store/reducers/admin/AdminSlice';

export const Dashboard: React.FC = () => {
  const { users } = useAppSelector(state => state.adminReducer)

  const dispatch = useAppDispatch();
  //const [data, { isLoading }] = useGetUsersQuery();


  useEffect(() => {
    const getUsersData = async () => {
      // await getUsers().unwrap().then(res => {
      //   dispatch(setUsers({ users: res }))
      // });
    };

    getUsersData();

  }, [users])
  return (
    <React.Fragment>
      <h1>Student Dashboard</h1>
    </React.Fragment>
  );
}