import { useState, useEffect, useRef } from 'react';
import Container from "react-bootstrap/Container";

import useAuth from '../../hooks/useAuth';
import productService from '../../services/productService';
import ProductsList from "../../components/features/products/ProductsList"
import TuLink from '../../components/common/TuLink';
import TuLoader from '../../components/common/TuLoader';

function SaleProductsPage() {
  // HOOK: CONTEXT FOR AUTH
  const { user } = useAuth();

  // PRODUCTS STATE
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // HOOK: ON-LOAD SIDE EFFECTS
  const effectRan = useRef(false);
  useEffect(() => {
    console.log("Effect Ran");
    if (effectRan.current === false) {
      fetchProducts();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
  }, []);

  // [5A] COMPONENT FUNCTION
  async function fetchProducts() {
    try {
      // TU API Request
      const response = await productService.getAllSale();

      // Access Object Properties to Find Data Array & Save to Variable 
      const data = await response.data;

      // SUCCESS: Output needs to override data state
      console.log(data);
      setData(data);

    } catch(err) {
      console.log(err?.response);
      setError(true); 
    }
  }

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center mt-4">
        <p>Error page</p>
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container className="text-center mt-4">
        <TuLoader />
      </Container>
    )
  }

  return (
    <Container className="text-center mt-4">
      <h1>Brooklyn Bouncers Kits &amp; Apparel</h1>
      <p>Get the official 2023/24 Brooklyn Bouncers's Kits, inspired by the iconic BB anniversary crest - celebrating its 20th anniversary</p>

      {/* Products Menu */}
      {<ProductsList products={data} />}
    </Container>
  )
}

export default SaleProductsPage