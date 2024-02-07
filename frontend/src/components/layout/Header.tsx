import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Pages, Account } from "../../paths";
import { authApi, useLogoutMutation } from "../../services/AuthService";
import { clearUser } from "../../store/reducers/auth/AuthSlice";
import styles from './layout.module.scss';

export const Header = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.auth);

    const handleLogout = async () => {
        await logout().unwrap().then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            clearUser();
            navigate(0);
        })
    }

    return (<div className={styles.header}>
        <div className={styles.header_content}>
            {/* todo: add logo */}
            <h1 onClick={() => navigate(Pages.root)}>Самоучка</h1>
            <div className={styles.header_content_login}>
                {!_.isEmpty(user) ?
                    <>
                        <a href={Account.profile}>{user.lastName} {user.firstName}</a>
                        <a href="#" onClick={handleLogout}>Выйти</a>
                    </>
                    : <>
                        <a href={Pages.login}>Вход</a>
                        <a href={Pages.register}>Регистрация</a>
                    </>
                }
            </div>
        </div>
    </div>);
}