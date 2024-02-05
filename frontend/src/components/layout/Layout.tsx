import React from "react";
import styles from './layout.module.scss';
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
    const { user } = useAppSelector(state => state.auth);
    return (<div className={styles.app}>
        <Header/>
        <div className={styles.content}>
            <Outlet />
        </div>
        <Footer />
    </div>);
}