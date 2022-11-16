import { useEffect, useState } from "react";
import {  Navigate, Route, Routes } from "react-router-dom";
import { getPosts } from "../api";
import { useAuth } from "../hooks";
import { Home, Login ,Settings,Signup, UserProfile } from "../pages";
import "../styles/home.module.css";
import { Loader, Navbar } from "./";



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
          {/* private route is not working so will fix later */}
          {/* <PrivateRoute exact path="/user.:userId" element={<UserProfile/>} /> */}
          {/* <PrivateRoute exact path="/settings" element={<Settings/>} /> */}
          
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Signup/>} />
          <Route element={<page404/>} />

        </Routes>
      
    </div>
  );
}

export default App;