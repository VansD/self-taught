import React from "react";
import { Form } from "react-final-form";
import { Button, FormGroup, Form as FormBootstrap } from "react-bootstrap";
import { authApi, useLoginMutation } from "../../services/AuthService";
import ILogin from "../../store/models/pages/Login";
import { setUser } from "../../store/reducers/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormGroupUI } from "../../components/controls/FormGroupUI";


export const Login = () => {

    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (model: ILogin) => {
        try {
            await login(model).unwrap()
                .then(user => {
                    dispatch(setUser(user))
                });

            navigate('/')
        } catch (err) {
            alert("Login Error!");
        }
    }


    return (
        <div className="login">
            <h3>Вход на Самоучка.ру</h3>
            <Form onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <FormBootstrap onSubmit={handleSubmit}>
                        <FormGroupUI name="email" type="email" placeholder="Введите email" label="Email" inline full/>
                        <FormGroupUI name="password" type="password" placeholder="Введите пароль" label="Пароль" inline full/>
                        <FormGroup>
                            <Button className="w-100" disabled={submitting} type="submit">Войти</Button>
                        </FormGroup>
                    </FormBootstrap>
                )}
            />
        </div>
    )
}