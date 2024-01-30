import * as styles from "./Layout.css"
import Header from './Header'
import Footer from './Footer'
import app from '../../App'
import { Outlet } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';
import useAuth from '../../hooks/useAuth'



function Layout() {
  return (
    <div className={styles.app}>
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
        {/* <Header user={user} onLogout={handleLogout}/>
            <div className={styles.appContent}>
                <Outlet />
            </div> */}
        <Footer/>
    </div>
  )
}

export default Layout