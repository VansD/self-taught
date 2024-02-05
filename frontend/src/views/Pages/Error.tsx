import { useRouteError } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get('type');
  const error = useRouteError();
  return (errorType === "role"
    ? <div>Нет прав для просмотра данной страницы</div>
    : <div>
      Что-то пошло не так...
    </div>
  );
}

export default ErrorPage;