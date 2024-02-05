import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

export const Dashboard: React.FC = () => {
  const { users } = useAppSelector(state => state.adminReducer)
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  useEffect(() => {
  }, [users])
  return (
    <React.Fragment>
      <h1>Добро пожаловать на Самоучка.ру!</h1>
    </React.Fragment>
  );
}