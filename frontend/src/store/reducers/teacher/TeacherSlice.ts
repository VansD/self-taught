import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAnswer, ITask } from "../../models/ITask";

interface TeacherState {
  totalTasks: number,
  selectedPageOnListTask: number,
  deletedTask: ITask | null,
  needUpdateTasks: boolean,
  tasks: ITask[],
  task: ITask | null,
  taskAnswer: IAnswer | null
}

//todo: to teacherTaskSlice

const slice = createSlice({
  name: 'teacherTasks',
  initialState: { tasks: [], totalTasks: 0, selectedPageOnListTask: 1, deletedTask: null, needUpdateTasks: false, task: null, taskAnswer: null } as TeacherState,
  reducers: {
    setTasks: (
      state,
      { payload: tasks }: PayloadAction<ITask[]>
    ) => {
      state.tasks = tasks;
    },
    setTask: (
      state,
      { payload: task }: PayloadAction<ITask | null>
    ) => {
      state.task = task;
    },
    selectPageOnListTask: (
      state,
      {payload: selectedPage}: PayloadAction<number>
    ) => {
      state.selectedPageOnListTask = selectedPage;
    },
    setDeletedTask: (
      state,
      {payload: task}: PayloadAction<ITask | null>
    ) => {
      state.deletedTask = task;
    },
    setNeedUpdateTasks: (
      state,
      {payload: val}: PayloadAction<boolean>
    ) => {
      state.needUpdateTasks = val;
    },
    updateAnswerForTask: (
      state,
      {payload: answer}: PayloadAction<IAnswer>
    ) => {
      if (state.task && state.task.answers)
        state.task.answers[answer.id] = answer;
    },
    addAnswerForTask: (
      state,
      {payload: answer}: PayloadAction<IAnswer>
    ) => {
      if (state.task)
        state.task.answers.push(answer);
    },
    setAnswerTask: (
      state,
      {payload: answer}: PayloadAction<IAnswer | null>
    ) => {
        state.taskAnswer = answer;
    }
  }
});

export const { setTask, setTasks, selectPageOnListTask, setDeletedTask, setNeedUpdateTasks, updateAnswerForTask, addAnswerForTask } = slice.actions;

export default slice.reducer;