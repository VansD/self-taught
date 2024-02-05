import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../models/ITask";
import { IUser, IUserListResponse } from "../../models/IUser";

interface AdminState {
  users: IUser[],
  totalUsers: number,
  user: IUser | null,
  selectedPageOnListUser: number,
  deletedUser: IUser | null,
  needUpdateUsers: boolean,
  tasks: ITask[],
}

const slice = createSlice({
  name: 'admin',
  initialState: { users: [], tasks: [], totalUsers: 0, user: null, selectedPageOnListUser: 1, deletedUser: null, needUpdateUsers: false } as AdminState,
  reducers: {
    setUsers: (
      state,
      { payload: users }: PayloadAction<IUserListResponse>
    ) => {
      state.users = users.rows;
      state.totalUsers = users.count;
    },
    setUser: (
      state,
      { payload: user}: PayloadAction<IUser>
    ) => {
      state.user = user;
    },
    selectPageOnListUser: (
      state,
      {payload: selectedPage}: PayloadAction<number>
    ) => {
      state.selectedPageOnListUser = selectedPage;
    },
    setDeletedUser: (
      state,
      {payload: user}: PayloadAction<IUser | null>
    ) => {
      state.deletedUser = user;
    },
    setNeedUpdateUsers: (
      state,
      {payload: val}: PayloadAction<boolean>
    ) => {
      state.needUpdateUsers = val;
    },
    setTasks: (
      state,
      { payload: { tasks } }: PayloadAction<{ tasks: ITask[] }>
    ) => {
      state.tasks = tasks;
    }
  }
});

export const { setUsers, setTasks, setUser, selectPageOnListUser, setDeletedUser, setNeedUpdateUsers } = slice.actions;

export default slice.reducer;