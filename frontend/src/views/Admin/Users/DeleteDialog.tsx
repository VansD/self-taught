import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Admin } from "../../../paths";
import { useDeleteUserMutation } from "../../../services/AdminService";
import { setDeletedUser, setNeedUpdateUsers } from "../../../store/reducers/admin/AdminSlice";


export const DeleteDialog = () => {
    const { deletedUser, needUpdateUsers } = useAppSelector(state => state.adminReducer);
    const [deleteUser] = useDeleteUserMutation();
    const dispatch = useAppDispatch();
    const cancelDelete = () => {
        dispatch(setDeletedUser(null));
    }
    const handleDelete = () => {
        if (deletedUser?.id)
            deleteUser(deletedUser.id).unwrap().then(() => {
                dispatch(setNeedUpdateUsers(!needUpdateUsers))
                dispatch(setDeletedUser(null));
            })
    }

    return <Modal show={deletedUser !== null} centered>
        <Modal.Dialog>
            <Modal.Header closeButton onClick={cancelDelete}>
                <Modal.Title>Удалить пользователя?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Вы действительно хотите удалить пользователя {deletedUser?.lastName} {deletedUser?.firstName} {deletedUser?.middleName}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={cancelDelete}>Отмена</Button>
                <Button variant="primary" onClick={handleDelete}>Удалить</Button>
            </Modal.Footer>
        </Modal.Dialog>
    </Modal>
}


