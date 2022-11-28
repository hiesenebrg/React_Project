import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import {useAuth} from '../hooks';
const Navbar = () => {
  const auth  = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.rightNav}>
        {auth.user && <div className={styles.user}>
          <Link to="/settings">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>{auth.user.name }</span>
        </div>}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ?(
              <>
            <li>
              <buton onClick={auth.logout} >Log Out</buton>
            </li>
            </>
            ):(<>
            <li>
              <Link to ="/login">Log In</Link>
            </li>
            <li>
              <Link to ="/register">Register</Link>
            </li>
            </>
            )}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
