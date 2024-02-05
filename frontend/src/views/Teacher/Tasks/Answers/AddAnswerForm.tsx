import React, { FormEventHandler, MouseEventHandler, SetStateAction, useState } from "react";
import { Button, Col, FormGroup, Row, Form as FormBootstrap, FormCheck, FormLabel, FormControl } from "react-bootstrap"
import { FormGroupUI } from "../../../../components/controls/FormGroupUI";
import { IAnswer, ITask } from "../../../../store/models/ITask";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addAnswerForTask, setTask, updateAnswerForTask } from "../../../../store/reducers/teacher/TeacherSlice";
import { Field } from "react-final-form";

type AddAnswerFormProps = {
    answerId?: number | null;
    closeCallback: MouseEventHandler;
}

export const AddAnswerForm = ({ answerId, closeCallback }: AddAnswerFormProps) => {
    let { task } = useAppSelector(store => store.teacherReducer);
    const [text, setText] = useState<string>('');
    const [isRight, setIsRight] = useState<boolean>(false);
    const [imgUrl, setImgUrl] = useState<string>('');
    const dispatch = useAppDispatch();

    let lastAnswerId = task?.answers?.length || 0;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, action?: SetStateAction<any>) => {
        const target = event?.currentTarget;
        const value = target.type === 'switch' ? target.checked : target.value;
        const name = target.name as any;
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!task) {
            task = { answers: new Array<IAnswer>(), score: 0, text: '' } as ITask;
            dispatch(setTask(task));
        }
        if (answerId) {
            let answer = task?.answers?.find(answer => answer.id === answerId);
            if (answer) {
                answer = { text, isRight, imgUrl, id: answerId } as IAnswer;
                dispatch(updateAnswerForTask(answer))
            }
        } else {
            let answer = { text, isRight, imgUrl, id: ++lastAnswerId } as IAnswer;
            dispatch(addAnswerForTask(answer));
        }
        closeCallback(e);

    };

    return <React.Fragment>
        <FormGroup className="mb-3">
            <Row className="d-flex align-items-baseline">
                <Col md={3} sm={12}>
                    <FormLabel>Текст</FormLabel>
                </Col>
                <Col md={9} sm={12}>
                    <FormControl type="input" placeholder="Введите текст" defaultValue={text} onChange={(e) => setText(e.currentTarget.value)} />
                </Col>
            </Row>
        </FormGroup>
        <FormGroup className="mb-3">
            <Row className="d-flex align-items-baseline">
                <Col md={3} sm={12}>
                    <FormLabel>Изображение</FormLabel>
                </Col>
                <Col md={9} sm={12}>
                    <FormControl type="file" placeholder="Выберите изображение" defaultValue={imgUrl} onChange={(e) => setImgUrl(e.currentTarget.value)} />
                </Col>
            </Row>
        </FormGroup>

        <FormCheck type="switch" label="Правильный ответ" name="isRight" onChange={() => setIsRight(!isRight)} />

        <FormGroup>
            <Row>
                <Col sm={12} className="d-flex justify-content-end">
                    <div className="">
                        <Button onClick={onSubmit} className="mr-2">Сохранить</Button>
                        <Button onClick={closeCallback} >Отмена</Button>
                    </div>
                </Col>
            </Row>
        </FormGroup>
    </React.Fragment>
}