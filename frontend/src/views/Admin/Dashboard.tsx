import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Admin, Pages } from '../../paths';

export const Dashboard: React.FC = () => {
  const location = useNavigate();

  return (
    <React.Fragment>
      <h1>Admin Dashboard</h1>
      <NavLink to={Admin.users}>Список пользователей</NavLink>
    </React.Fragment>
  );
}