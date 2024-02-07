import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useAppSelector } from "../../hooks/redux";
import styles from "./account.module.scss";

export const Profile = () => {
    const { user } = useAppSelector(state => state.auth);

    return <div className={styles.profile}>
        <FormGroup>
            <FormLabel>Фамилия: </FormLabel>
            <FormLabel>{user?.lastName}</FormLabel>
        </FormGroup>
        <FormGroup>
            <FormLabel>Имя: </FormLabel>
            <FormLabel>{user?.firstName}</FormLabel>
        </FormGroup>
        <FormGroup>
            <FormLabel>Отчество: </FormLabel>
            <FormLabel>{user?.middleName}</FormLabel>
        </FormGroup>

    </div>
}