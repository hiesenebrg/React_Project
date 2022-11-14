import styles from '../styles/navbar.module.css';
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
          <a href="/">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt=""
              className={styles.userDp}
            />
          </a>
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
              <link to ="/login">Log In</link>
            </li>
            <li>
              <a href="/">Register</a>
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
