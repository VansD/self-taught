import { FC } from "react";
import { MutatingDots } from "react-loader-spinner";
import styles from './layout/layout.module.scss';

export const Loader: FC = () => {
    return <div className={styles.loader}>
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
        />
    </div>
}