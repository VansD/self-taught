import React from "react";
import styles from './layout.module.scss';
import { Outlet } from "react-router-dom";

export const LayoutMin = () => {
    return (<div className={styles.app}>
        <Outlet />
    </div>);
}