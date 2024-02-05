import React, { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";
import styles from "./header.module.scss"

type Props = {
    create?: boolean;
    size: 1 | 2 | 3 | 4 | 5 | 6;
    title: string;
    textButton: string;
    buttonCallback: MouseEventHandler;
}

export const HeaderWithButton = ({ create, size, title, textButton, buttonCallback }: Props) => {

    return <React.Fragment>
        <div className={[styles.header, styles[`h_${size}`]].join(' ')}>
            <span>{title}</span>
            <span><Button onClick={buttonCallback}>{textButton}</Button></span>
        </div>

    </React.Fragment>
}