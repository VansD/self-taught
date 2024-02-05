import React, { useEffect, useRef, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Loader } from '../../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useGetUsersMutation } from '../../../services/AdminService';
import { IUserListRequest } from '../../../store/models/IUser';
import { setUsers, selectPageOnListUser, setDeletedUser, setNeedUpdateUsers } from '../../../store/reducers/admin/AdminSlice';
import { DeleteDialog } from './DeleteDialog';
import { UserList } from './UserList';

const pageLimit = 2;

export const Users: React.FC = () => {

  const [getUsers, { isLoading }] = useGetUsersMutation();
  const { users, totalUsers, selectedPageOnListUser, needUpdateUsers } = useAppSelector(state => state.adminReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async (page?: number) => {
      await selectPage(page ? page : selectedPageOnListUser)
    }

    users.length === 1 && selectedPageOnListUser > 1
      ? fetchUsers(selectedPageOnListUser - 1)
      : fetchUsers();

  }, [needUpdateUsers])

  const selectPage = async (page: number) => {
    dispatch(selectPageOnListUser(page));
    let model = { page, pageLimit } as IUserListRequest;
    await getUsers(model).unwrap().then(usersData => {
      dispatch(setUsers(usersData))
    })
  }

  return (
    <React.Fragment>
      <h1>Список пользователей</h1>
      {isLoading
        ? <Loader />
        : <React.Fragment>
          <UserList users={users} />
          {totalUsers > pageLimit && <PaginationControl page={selectedPageOnListUser} total={totalUsers} limit={pageLimit} changePage={selectPage} />}
          <DeleteDialog />
        </React.Fragment>
      }
    </React.Fragment>
  );
}