import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useNavigate } from 'react-router-dom';
import { HeaderWithButton } from '../../../components/controls/headerWithButtons/HeaderWithButton';
import { Loader } from '../../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Teacher } from '../../../paths';
import { useGetTasksMutation } from '../../../services/TeacherService';
import { ITaskListRequest } from '../../../store/models/ITask';
 import { setTasks, selectPageOnListTask, setDeletedTask, setNeedUpdateTasks } from '../../../store/reducers/teacher/TeacherSlice';
import { TaskList } from './TaskList';
// import { DeleteDialog } from './DeleteDialog';
// import { UserList } from './UserList';

const pageLimit = 2;

export const Tasks: React.FC = () => {

  const [getTasks, { isLoading }] = useGetTasksMutation();
  const { tasks, totalTasks, selectedPageOnListTask, needUpdateTasks } = useAppSelector(state => state.teacherReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async (page?: number) => {
      await selectPage(page ? page : selectedPageOnListTask)
    }

    tasks.length === 1 && selectedPageOnListTask > 1
      ? fetchTasks(selectedPageOnListTask - 1)
      : fetchTasks();

  }, [needUpdateTasks])

  const selectPage = async (page: number) => {
    dispatch(selectPageOnListTask(page));
    let model = { page, pageLimit } as ITaskListRequest;
    await getTasks(model).unwrap().then(tasksData => {
      dispatch(setTasks(tasksData.rows))
    })
  }

  const addTask = () => {
    navigate(Teacher.addTask)
  }

  return (
    <React.Fragment>
      <HeaderWithButton title="Список задач" size={3} buttonCallback={addTask} textButton="Добавить"/>
      {isLoading
        ? <Loader />
        : <React.Fragment>
          <TaskList tasks={tasks} />
          {totalTasks > pageLimit && <PaginationControl page={selectedPageOnListTask} total={totalTasks} limit={pageLimit} changePage={selectPage} />}
          {/* <DeleteDialog /> */}
        </React.Fragment>
      }
    </React.Fragment>
  );
}