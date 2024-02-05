import { IUser } from "../../../store/models/IUser";
import styles from "./users.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from "react-router-dom";
import { Admin } from "../../../paths";
import { useAppDispatch } from "../../../hooks/redux";
import { setDeletedUser } from "../../../store/reducers/admin/AdminSlice";

type UserProps = {
    user: IUser
}

export const UserInfo = ({ user }: UserProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const deleteUser = (user: IUser) => {
        dispatch(setDeletedUser(user))
    }

    return <article className={styles.user}>
        <div className={styles.user_info}>
            <span>{user.lastName}</span>
            <span>{user.firstName}</span>
            <span>{user.middleName}</span>
        </div>
        <div className={styles.user_control}>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(Admin.editUser(user.id) )}/>
            <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteUser(user)}/>
        </div>
    </article>
}

