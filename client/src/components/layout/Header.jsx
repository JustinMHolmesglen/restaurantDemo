// Import Bootstrap modules
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import * as styles from "./Header.css";
import { IconContext } from "react-icons";
import { RiShoppingCartFill } from "react-icons/ri";
// import useAuth from '../../hooks/useAuth'


  
  // const {user, logout} = useAuth();
  function Header({ user, onLogout }) {


  return (
    <Navbar className={styles.navbar} sticky="top" bg='black' variant='dark' expand="lg">
      <Container>
        <Navbar.Brand className={styles.brandLink} as={Link} to='/' >
          <img className={styles.logo} src='/seafood-soup.jpg' alt="TasteOfAsia logo"/>
          <div className={styles.logoTextBox}>
            <span className={styles.brand}>Taste of Asia</span>
            <span className={styles.brandSub}>The Restaurant for Today</span>
          </div>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {/* <Nav className='me-auto d-flex'> */}
                
            {/* <Nav.Link className={styles.navLink} as={Link} to='/'>Home</Nav.Link> */}
            {/* <Nav.Link className={styles.navLink} as={Link} to='/store/dish'>Reviews</Nav.Link>
            <Nav.Link className={styles.navLink} as={Link} to='/store/menu'>Menu</Nav.Link> */}
            
           
            {/* </Nav> */}
            {/* <Nav>
            
            
            {user && <Nav.Link className={styles.navLink} as={Link} to="/dashboard">Dashboard</Nav.Link>}
            {user && <button style={{ background: "yellow" }}onClick={() => logout()}>Logout</button>}
            
       
          </Nav> */}
          <Nav className="ms-auto align-items-center d-flex flex-column">
      {/* Rendering the Journal title */}
      {/* <div className="d-flex">
        <Link to="/Restaurant" className="text-decoration-none">
          <h1 className="display-3 text-black bold p-0 m-0">Our Restaurant</h1>
        </Link>
      </div> */}
      {/* Rendering the navigation links */}
      <div className="d-flex">
        {/* Rendering the Journal link */}
        <Link to="/" className="nav-link background-hover px-3">
          HOME
          
        </Link>
        <Link to="/review" className="nav-link background-hover px-3">
          REVIEW
          
        </Link>
        {/* <Link to="/menu" className="nav-link background-hover px-3">
          MENU
          <i className="bi bi-journal-bookmark-fill ms-2"></i>
        </Link> */}
        {/* Rendering the user profile and logout links if the user is logged in */}
        {user ? (
          <>
            <Link to="profile" className="nav-link background-hover px-3">
              {user.username.toUpperCase()}
              
            </Link>
            {/* <Link to="dishes" className="nav-link background-hover px-3">
              Dish
              <i className="bi bi-person-badge ms-2"></i>
            </Link> */}

            <button onClick={onLogout} className="background-hover px-3">
              LOGOUT
              
            </button>
          </>
        ) : (
          // Rendering the sign up and login links if the user is not logged in
          <>
            <Link to="signup" className="nav-link background-hover px-3">
              SIGNUP
              
            </Link>
            <Link to="login" className="nav-link background-hover px-3">
              LOGIN
              
            </Link>
          </>
        )}
      </div>
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  }; 


export default Header;
