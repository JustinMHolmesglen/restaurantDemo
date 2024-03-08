// version latest 9.34 pm 20.11.23

import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const Home = () => {
  return (
    <Container-fluid>
      
        <div id="hero-section">
          <h1>An Asian Experience, Restaurant of the new Millenium</h1>
          <p>For traditional Asian cultured meals, tried the rest, now try the best!</p>
          <Button href={"/review"} variant="dark">Review</Button>
        </div>
        <div className="row mb-3">
          <div className="col-md-3"><img src="/Food-salmon-pic.jpg" alt="Food-gallery-1" /></div>
          <div className="col-md-3"><img src="/Food-prawns-pic.jpg" alt="Food-gallery-2" /></div>
          <div className="col-md-3"><img src="/Food-rice.jpg" alt="Food-gallery-3" /></div>
          <div className="col-md-3"><img src="/seafood-soup.jpg" alt="Food-gallery-4" /></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3"><img src="/Food-banquet-pic.jpg" alt="Food-gallery-1" /></div>
          <div className="col-md-3"><img src="/Food-vegies-pic.jpg" alt="Food-gallery-2" /></div>
          <div className="col-md-3"><img src="/Food-spicy-noodles-pic.jpg" alt="Food-gallery-3" /></div>
          <div className="col-md-3"><img src="/Food-sushi-pic.jpg" alt="Food-gallery-4" /></div>
        </div>
         <div className="row mb-3">
          <div className="col-md-12 menu"><img src="/menu1.jpg" alt="Menu1" /></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12 menu"><img src="/menu2.jpg" alt="Menu2"/></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12 menu"><img src="/menu3.jpg" alt="Menu3" /></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><img src="/spice_pic.jpg" alt="Food-gallery-2" /></div>
          <div className="col-md-6"><img src="/prawns_pic.jpg" alt="Food-gallery-1"/></div>
        </div>
         <div className="row mb-3">
          <div className="col-md-12 menu"><img src="/menuSpecials.jpg" alt="Menu Specials" /></div>
        </div>
        <div id="call-to-action" className="mb-3" style={{display: "flex", flexDirection: "column"}}>
          <h3 style={{color: "#fff", textAlign: "center"}}>With the greatest reviewed restaurant in Clayton</h3>
          <p style={{color: "#fff", textAlign: "center"}}>Why not add your review to our others, we know you enjoyed your food and we pride ourself on the quality of our food!</p>
          <Button href={"/review"} style={{textAlign: "center", margin: "0 auto", display: "flex"}}variant="light">Review Now</Button>
        </div>
       
      
      
    </Container-fluid>
  )
}

export default Home
