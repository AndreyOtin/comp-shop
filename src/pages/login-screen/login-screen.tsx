import Button from 'common-ui/button/button';
import Breadcrumbs from 'components/breadcrumbs/breadcrumbs';
import styles from './login-screen.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { loginUser, registerUser, selectUserStatus } from 'store/user-slice/user-slice';
import { toast } from 'react-toastify';
import { Link, Navigate, useLocation, useMatch } from 'react-router-dom';
import { AppRoute, UserStatus } from 'consts/enum';
import clsx from 'clsx';

function LoginScreen() {
  const dispatch = useAppDispatch();
  const isRegisterPath = !!useMatch(AppRoute.Register);
  const userStatus = useAppSelector(selectUserStatus);
  const location = useLocation();

  const handleSubmint: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    const elements = evt.currentTarget.elements;
    const email = elements.namedItem('email') as HTMLInputElement;
    const password = elements.namedItem('password') as HTMLInputElement;
    const fn = isRegisterPath ? registerUser : loginUser;
    const action = await dispatch(fn({ email: email.value, password: password.value }));

    if (fn.rejected.match(action)) {
      toast(action.error.message, { toastId: action.meta.requestId });
    }
  };

  if (userStatus === UserStatus.Auth) {
    return location.state ? <Navigate to={location.state} /> : <Navigate to={AppRoute.Root} />;
  }

  return (
    <main className={styles.login}>
      <div className={styles.container}>
        <Breadcrumbs className={styles.breadcrumps} />
        <h1 className={styles.title}>Customer Login</h1>
        <div className={styles.content}>
          <div className={clsx(styles.leftColumn, isRegisterPath && styles.register)}>
            <form onSubmit={handleSubmint} className={styles.registerForm} action="">
              <h2>Registered Customers</h2>
              <p>If you have an account, sign in with your email address.</p>
              <div className={styles.group}>
                <label htmlFor="">
                  Email<sup style={{ color: 'red' }}>*</sup>
                </label>
                <input type="text" placeholder="Your name" name="email" />
              </div>
              <div className={styles.group}>
                <label htmlFor="">
                  Password<sup style={{ color: 'red' }}>*</sup>
                </label>
                <input type="password" placeholder="Your password" name="password" />
              </div>
              <Button isFilled>{isRegisterPath ? 'Register' : 'Sign in'}</Button>
            </form>
          </div>

          {isRegisterPath || (
            <div className={styles.rigthColumn}>
              <div className={styles.signInContent}>
                <h2>New Customer?</h2>
                <p>Creating an account has many benefits:</p>
                <ul>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
                <Button state={location.state} as={Link} to={AppRoute.Register} isFilled>
                  Create an account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default LoginScreen;
