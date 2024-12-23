import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  setLogout,
} from 'slices/authSlice';
import Link from 'next/dist/client/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import DarkModeButton from '../DarkModeButton/DarkModeButton';
import SearchBar from '../SearchBar/SearchBar';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";


export default function TopNav() {
  // const user = useSelector(selectCurrentUser)
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(setLogout());
    router.push('/login', undefined, { shallow: true });
  };

  return (
    <Navbar bg="primary" variant="light">
      <Container>
        <Navbar.Brand>
          <Link href="/" className={styles.brandNameLinkStyling}></Link>
        </Navbar.Brand>
        <Navbar.Text>
          <small></small>
        </Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <>
            {/* <SearchBar /> */}

            <DarkModeButton />

            {user && isAuthenticated ? (
              <Navbar.Text>
                <Link href={`/profile/${user.userdata.email}`} passHref>
                  <Button variant="light" className={styles.useProfileButton}>
                    {user.userdata.email}
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button
                    variant="light"
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Logout
                  </Button>
                </Link>
              </Navbar.Text>
            ) : (
              <Navbar.Text>
                <Link href="/login" passHref>
                  <Button variant="light" className={styles.loginButton}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="light" className={styles.signupButton}>
                    Signup
                  </Button>
                </Link>
              </Navbar.Text>
            )}
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
