import React from "react";
import { Form, Field } from "react-final-form";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { authApi, useRegisterMutation } from "../../services/AuthService";
import IRegister from "../../store/models/pages/Register";
import { setUser } from "../../store/reducers/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormGroupUI } from "../../components/controls/FormGroupUI";
import styles from "./pages.module.scss";

export const Register = () => {

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (model: IRegister) => {
        try {
            const user = await register(model).unwrap();
            dispatch(setUser(user));

            navigate('/')
        } catch (err) {
            alert("Login Error!");
        }
    }


    return (
        <div className={[styles.min_layout, styles.register].join(' ')}>
            <h3>Регистрация на Самоучка.ру</h3>
            <Form onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <FormGroupUI name="email" type="email" placeholder="Введите email" label="Email" inline full/>
                        <FormGroupUI name="password" type="password" placeholder="Введите пароль" label="Пароль" inline full/>
                        <FormGroupUI name="lastName" type="password" placeholder="Введите фамилию" label="Фамилия" inline full/>
                        <FormGroupUI name="firstName" placeholder="Введите имя" label="Имя" inline full/>
                        <FormGroupUI name="middleName" placeholder="Введите отчество" label="Отчество" inline full/>
                        <FormGroup>
                            <Button disabled={submitting} className="w-100" type="submit">Зарегистрироваться</Button>
                        </FormGroup>
                    </form>
                )}
            />
        </div>
    )
}