import styles from "./tasks.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from "react-router-dom";
import { Teacher } from "../../../paths";
import { useAppDispatch } from "../../../hooks/redux";
import { setDeletedTask } from "../../../store/reducers/teacher/TeacherSlice";
import { ITask } from "../../../store/models/ITask";

type TaskProps = {
    task: ITask
}

export const Task = ({ task }: TaskProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const deleteTask = (task: ITask) => {
        dispatch(setDeletedTask(task))
    }

    return <article className={styles.task}>
        <div className={styles.task_info}>
            <h4>{task.title}</h4>
            <span>{task.text}</span>
        </div>
        <div className={styles.task_control}>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(Teacher.editTask(task.id) )}/>
            <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteTask(task)}/>
        </div>
    </article>
}

