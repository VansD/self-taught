import React, { FC } from "react";
import { ITask } from "../../../store/models/ITask";
import { Task } from "./Task";

type TaskListProps = {
    tasks: ITask[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
    return <React.Fragment>{tasks.length > 0
        ? tasks.map(task => <Task key={task.id} task={task} />)
        : <span>Нет данных</span>}
    </React.Fragment>
}