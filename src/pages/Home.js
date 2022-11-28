import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect ,  } from "react";
import styles from "../styles/home.module.css";
import { getPosts } from '../api';
import { Loader, Comment  , FriendsList, CreatePost} from "../components";
import { useAuth, usePosts } from "../hooks";

const Home = () => {
const auth = useAuth();
const posts = usePosts();
  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div  className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost/>
    {posts.data.map((post) => (
      <div className={styles.postWrapper} key={`post-${post._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
              alt="user-pic"
            />
             <div>
                <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    // we will grabe thisstae using useLoacation hook in userProfile Page
                    state: {
                      user: post.user,
                    },
                  }}
                className={styles.postAuthor}
              >
                {post.user.name}
              </Link>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000994_agjCws4sP5BRmvWCaALly7z3tXZGxuXO.jpg"
                alt="likes-icon"
              />
              <span>{post.likes.length}</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://t4.ftcdn.net/jpg/03/08/43/19/240_F_308431972_g5fuiXwgOZpDCMFQougq13hgSaQVHVro.jpg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </div>
      </div>
      
    ))}
    
  </div>
  {auth.user && <FriendsList/>}
  </div>
  
);
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;


