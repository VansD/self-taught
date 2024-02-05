import React, { FC } from "react";
import { IUser } from "../../../store/models/IUser";
import { UserInfo } from "./UserInfo";

type UserListProps = {
    users: IUser[]
}

export const UserList = ({ users }: UserListProps) => {
    return <React.Fragment>
        {users.map(user => <UserInfo key={user.id} user={user} />)}
    </React.Fragment>
}