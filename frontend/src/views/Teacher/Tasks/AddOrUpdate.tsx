import React, { useEffect } from "react";
import { Form } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Form as FormBootstrap, Row, Col } from "react-bootstrap";
import { useCreateTaskMutation, useUpdateTaskMutation, useGetTaskMutation, teacherApi } from "../../../services/TeacherService";
import { Teacher } from "../../../paths";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setTask } from "../../../store/reducers/teacher/TeacherSlice";
import { FormGroupUI } from "../../../components/controls/FormGroupUI";
import { Loader } from "../../../components/Loader";
import { IAnswer, ITask, TaskType } from "../../../store/models/ITask";
import { enumToSelectOptions } from "../../helpers/selectHelper";
import { Answers } from "./Answers/Answers";

export const AddOrUpdate = () => {
    const [createTask] = useCreateTaskMutation();
    const [getTask, { isLoading }] = useGetTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const taskId = Number(id);
    const { task } = useAppSelector(state => state.teacherReducer);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        const updateTaskFetch = async () => {
            await getTask(taskId).unwrap().then((res) => {
                dispatch(setTask(res));
            })
        }

        if (taskId)
            updateTaskFetch()

    }, []);

    const onSubmit = async (model: ITask) => {
        try {
            if (user)
                model.userId = user.id;
            model.answers = task?.answers || new Array<IAnswer>();
            if (!taskId) {
                await createTask(model).unwrap()
                    .then(() => {
                        navigate(Teacher.tasks)
                    });
            } else {
                model.id = taskId;
                await updateTask(model).unwrap()
                    .then(() => {
                        navigate(Teacher.tasks)
                    });
            }

            dispatch(teacherApi.util.resetApiState());
        } catch (err) {
            alert("Login Error!");
        }
    }

    const cancelEdit = () => {
        navigate(Teacher.tasks)
    }

    return <React.Fragment>
        <h1>{taskId ? "Редактирование" : "Добавление"} задачи</h1>
        {isLoading
            ? <Loader />
            : <Form onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <React.Fragment>
                        <FormBootstrap onSubmit={handleSubmit}>
                            <FormGroupUI name="title" label="Заголовок" placeholder="Введите заголовок" defaultValue={task?.title} inline />
                            <FormGroupUI name="taskType" label="Тип задачи" placeholder="Выберите" defaultValue={task?.taskType} inline type="select" selectOptions={enumToSelectOptions(TaskType)} />
                            <FormGroupUI name="text" label="Текст" placeholder="Введите текст задания" defaultValue={task?.text} inline type="textarea" />
                            <FormGroupUI name="score" label="Оценка" placeholder="Введите значение" defaultValue={task?.score.toString()} inline />
                            <FormGroupUI name="imgUrl" label="Изображение" placeholder="Выберите изображение" defaultValue={task?.imgUrl} inline type="file" />
                            <FormGroup className="mb-3">
                                <Answers answers={task?.answers} />
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                    <Col sm={12} className="d-flex justify-content-end">
                                        <Button type="submit">Сохранить</Button>
                                        <Button onClick={cancelEdit} >Отмена</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </FormBootstrap>
                    </React.Fragment>
                )}
            />
        }
    </React.Fragment>
}