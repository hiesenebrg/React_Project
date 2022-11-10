import PropTypes  from "prop-types";

import styles from "../styles/home.module.css";

const Home = ({posts}) => {
  return (
    <div className="posts-list">
      <div className={styles.PostWrapper}>
        <div className={styles.PostHeader}>
          <div className={styles.Avatar}>
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-pic"
            />
            <div>
              <span className="post-author"> Adarsh Singh</span>
              <span className="post-time"> a minute ago</span>
            </div>
          </div>
          <div className={styles.PostContent}>Post Content</div>
          <div className={styles.PostActions}>
            <div className={styles.PostLike}>
              <img
                src="httlps://image.flaticon.com/svg/1077/1077035.svg"
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.PostCommentsIcon}>
              <img
                src="httlps://image.flaticon.com/svg/1077/1077035.svg"
                alt="comments-icon"
              />

              <span>2</span>
            </div>
          </div>
          <div className={styles.PostCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>
          <div className={styles.PostCommentsList}>
            <div className={styles.PostCommentItem}>
              <div className={styles.PostCommentHeader}>
                <span className={styles.PostCommentAuthor}>Bill</span>
                <span className={styles.PostCommentTime}>a minute ago</span>
                <span className={styles.PostCommentLike}>22</span>
              </div>
              <div className={styles.PostCommentContent}>Random comment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// so here we are forcing the posts to be an array using proptypes
// Home.PropTypes = {
//     posts :PropTypes.array.isRequired,
// };

export default Home;