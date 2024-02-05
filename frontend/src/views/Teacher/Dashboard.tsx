import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Teacher } from '../../paths';

export const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <h1>Teacher Dashboard</h1>
      <NavLink to={Teacher.tasks}>Список задач</NavLink>
    </React.Fragment>
  );
}