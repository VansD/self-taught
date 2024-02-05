import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../models/ITask";
import { IUser } from "../../models/IUser";

interface AdminState {
  users: IUser[],
  tasks: ITask[],
}

const slice = createSlice({
  name: 'student',
  initialState: { users: [], tasks: [] } as AdminState,
  reducers: {
    setUsers: (
      state,
      { payload: { users } }: PayloadAction<{ users: IUser[] }>
    ) => {
      state.users = users;
    },
    setTasks: (
      state,
      { payload: { tasks } }: PayloadAction<{ tasks: ITask[] }>
    ) => {
      state.tasks = tasks
    }
  }
});

export const { setUsers, setTasks } = slice.actions;

export default slice.reducer;