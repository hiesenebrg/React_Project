import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getPosts } from "../api";
import { Home } from "../pages";
import "../styles/home.module.css";
import { Loader } from "./";
function App() {
  const [posts, setposts] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setposts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (Loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Home posts={posts} />
    </div>
  );
}

export default App;
