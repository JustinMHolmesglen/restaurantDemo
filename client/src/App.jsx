// Import npm packages
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';
import { RiShoppingCartFill } from "react-icons/ri";

// Import pages 
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Menu from './pages/Menu';
import Dish from './pages/Dish';
import Enquiries from './components/layout/Footer'
//import Dishes from './pages/Dishes';
import DishEntryEdit from './pages/DishEntryEdit';
import ProductsMenu from './pages/product/ProductsMenu';
import AddProduct from './pages/product/AddProduct';


// Import components

import Dashboard from './pages/Menu';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './pages/Login';
import Signup from './pages/SignUp';
// import PrivateRoutes from './components/layout/PrivateRoutes';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Create Apollo Client
const client = new ApolloClient({
  uri: "http://10.210.153.173:3000/",
  cache: new InMemoryCache(),
});

const App = () => {
  const [user,setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    saveTokenToSessionStorage(user);
  }

  const handleLogout = () => {
    client.clearStore();
    sessionStorage.removeItem("user");
    setUser(null);
  }

  function saveTokenToSessionStorage(user){
    console.log(user)
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  const getUserFromSessionStorage = () => {
    try{
      const userString = sessionStorage.getItem("user");
      console.log(userString)
      const user = JSON.parse(userString);
      console.log(user)
      return user;
    } catch (error) {
      sessionStorage.setItem("user", "");
      return null;
    }
  }

  useEffect(() => {
    const user = getUserFromSessionStorage();
    if ( user ) {
      setUser(user);
    }
  }, []);

  function ProtectedRoute({component: Component, ...rest}) {
    const user = getUserFromSessionStorage();
    console.log(user)
    if(!user) {
      return <Navigate to="/login" replace />;
    }
    return <Component {...rest} user={user} />;
  }

  

  return (
    
    <BrowserRouter>     
        <ApolloProvider client={client}>
          <Container className="min-width">
          <div>
            <ToastContainer 
            style={{ textAlign: "center" }}
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
            theme="colored"
          />
            <Header user={user} onLogout={handleLogout} />
            
          <Routes>
            
              <Route index path='/' element={<Home/>} />
              {/* <Route path="/MenuPage" element={<Menu/>} /> */}
              {/* <Route path="github" element={<GithubMenu/>} /> */} 
              {/* AUTH */}
              <Route path="/menu" element={<ProtectedRoute component={Menu} user={user} />} />
              <Route element={<ProtectedRoute />} >    
                  <Route path="add" element={<AddProduct />} />
                </Route>
              <Route path="/login" element={<Login onLogin={handleLogin}/>} />
              <Route path="/signup" element={<Signup onLogin={handleLogin}/>} />
            
            <Route
              path="/review"
              element={<ProtectedRoute component={Dish} user={user} />}
            />
             {/* <Route
              path="/review"
              element={<ProtectedRoute component={Dish} user={user} />}
            /> */}
            {/* Protected Journal Entry Edit Route */}
            <Route
              path="/review/edit/:dishId"
              element={
                <ProtectedRoute component={DishEntryEdit} user={user} />
              }
            />
             <Route
              path="/enquiries/:enquiryId"
              element={
                <ProtectedRoute component={Enquiries} user={user} />
              }
            />
              <Route path="*" element={<NotFound/>} />
          </Routes>
          <Footer user={user}/>
          </div>
          </Container>
        </ApolloProvider>
        
      </BrowserRouter>  
        
   // set up routes for all pages that I want and test all those first - protect - logged in
  );
}

export default App;
