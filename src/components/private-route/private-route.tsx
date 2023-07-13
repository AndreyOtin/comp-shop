import { Navigate } from 'react-router-dom';
import { AppRoute, UserStatus } from '../../consts/enum';
import { useAppSelector } from 'hooks/hooks';
import { selectUserStatus } from 'store/user-slice/user-slice';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const userStatus = useAppSelector(selectUserStatus);

  return userStatus === UserStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
};

export default PrivateRoute;
