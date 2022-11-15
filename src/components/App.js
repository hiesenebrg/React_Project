import { useEffect, useState } from "react";
import {  Navigate, Route, Routes } from "react-router-dom";
import { getPosts } from "../api";
import { useAuth } from "../hooks";
import { Home, Login ,Settings,Signup } from "../pages";
import "../styles/home.module.css";
import { Loader, Navbar } from "./";

const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>UserInfo</h1>;
};

const page404 = () => {
    return <h1>404 - Not Found</h1>;
  };
// here children isbasically whatever inbetween PrivateRoute Component
  function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
  
    return (
      <Route
        {...rest}
        render={() => {
          if (auth.user) {
            return children;
          }
  
          return <Navigate to="/login" />;
        }}
      />
    );
  }
  


function App() {
    const auth = useAuth();
    const [posts, setposts] = useState([]);
    const [Loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await getPosts();
//       if (response.success) {
//         setposts(response.data.posts);
//       }
//       setLoading(false);
//     };

//     fetchPosts();
//   }, []);

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      
        <Routes>
          <Route exact path="/" element={<Home posts={[]}/>} />
          <Route exact path="/about" element={<About/>} />
          <PrivateRoute exact path="/settings" element={<Settings/>} />
          <Route exact path="user" element={<UserInfo/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Signup/>} />
          <Route element={<page404/>} />

        </Routes>
      
    </div>
  );
}

export default App;