import { useRouteError } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import styles from "./pages.module.scss"

const ErrorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get('type');
  const error = useRouteError();
  return (errorType === "role"
    ? <div className={[styles.min_layout, styles.error].join(' ')}>Нет прав для просмотра данной страницы</div>
    : <div className={[styles.min_layout, styles.error].join(' ')}>Что-то пошло не так...</div>
  );
}

export default ErrorPage;