import { useContext, useState, useEffect, useRef } from "react";
import jwt from "jwt-decode";
import { getPosts } from "../api";
import { AuthContext , PostsContext } from "../providers";
import {
  login as userLogin,
  register,
  editProfile,
  fetchUserFriends,
} from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../utils";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // this is changes because before wehn we refresh the friend list is going on the page so in order to show
    // or send the friend data every time when the page is refrshed
    
    // we have made getuser function because we need await while fetching user friends
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        let friends = [];

        if (response.success) {
          friends = response.data.friends;
        }

        setUser({
          ...user,
          friends,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log("response", response);
    if (response.success) {
      setUser(response.data.user);
      // always set  the new session cookie while upadting the userProfile
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }else {
      const newFriends = user.friends.filter(
        (f) => f.to_user._id !== friend.to_user._id
      );
  
      setUser({
        ...user,
        friends: newFriends,
      });
    }
  };


  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostToState = () => {};

  return {
    data: posts,
    loading,
    addPostToState,
  };
};
