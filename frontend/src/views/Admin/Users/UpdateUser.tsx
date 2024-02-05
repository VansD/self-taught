import React, { useEffect } from "react";
import { IUser } from "../../../store/models/IUser";
import { Form, Field } from "react-final-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, FormGroup, Form as FormBootstrap, Row, Col } from "react-bootstrap";
import { useGetUserMutation, useUpdateUserMutation } from "../../../services/AdminService";
import { Admin, Pages } from "../../../paths";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUser } from "../../../store/reducers/admin/AdminSlice";
import { FormGroupUI } from "../../../components/controls/FormGroupUI";
import { Loader } from "../../../components/Loader";

export const UpdateUser = () => {

    const [updateUser] = useUpdateUserMutation();
    const [getUser, { isLoading }] = useGetUserMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = Number(id);
    const { user } = useAppSelector(state => state.adminReducer)

    useEffect(() => {
        const updateUserFetch = async () => {
            await getUser(userId).unwrap().then((res) => {
                dispatch(setUser(res));
            })
        }

        if (userId)
            updateUserFetch()

    }, [])

    const onSubmit = async (model: IUser) => {
        try {
            model.id = userId;
            await updateUser(model).unwrap()
                .then(() => {
                    navigate(Admin.users)
                });
        } catch (err) {
            alert("Login Error!");
        }
    }

    const cancelEdit = () => {
        navigate(Admin.users)
    }

    return <React.Fragment>
        <h1>Редактирования пользователя</h1>
        {isLoading
            ? <Loader />
            : user
                ? <Form onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <React.Fragment>
                            <FormBootstrap onSubmit={handleSubmit}>
                                <FormGroupUI name="lastName" label="Фамилия" placeholder="Введите фамилию" defaultValue={user.lastName} />
                                <FormGroupUI name="firstName" label="Имя" placeholder="Введите имя" defaultValue={user.firstName} />
                                <FormGroupUI name="middleName" label="Отчество" placeholder="Введите отчество" defaultValue={user.middleName} />
                                <FormGroup>
                                    <Row className="d-flex justify-content-end">
                                        <Col md={2} sm={12}>
                                            <Button type="submit" className="mr-2">Сохранить</Button>
                                        </Col>
                                        <Col  md={2} sm={12}>
                                            <Button onClick={cancelEdit} className="">Отмена</Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </FormBootstrap>
                        </React.Fragment>
                    )}
                />
                : <div>Пользователь не найден</div>}
    </React.Fragment>
}