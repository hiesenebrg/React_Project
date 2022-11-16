import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useLocation } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const location = useLocation();
  console.log('location', location);
  // it is grabing the user state from the home page
  // also it is sused for basically supoose someone copied the profile page url
  // then he or she can access that page but it prevents from it because if someone copied the url
// and paste in another tab then it gives error because our user stae is still be empty 
  const { user = {} } = location.state;


  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
