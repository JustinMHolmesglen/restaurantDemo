import { useState } from "react"
import ProductsList from '../components/features/products/ProductsList'
import Container from "react-bootstrap/Container";

function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "product1", image: "https://placehold.co/100x100/darkblue/pink?font=roboto&text=Product" },
    { id: 2, name: "product2", image: "https://placehold.co/100x100/darkblue/pink?font=roboto&text=Product" },
    { id: 3, name: "product3", image: "https://placehold.co/100x100/darkblue/pink?font=roboto&text=Product" },
  ])

  function handleAddProduct(name){
    const newProduct = {
      id: crypto.randomUUID(),
      name: name,
      image: `https://placehold.co/100x100/pink/darkblue?font=montserrat&text=${name}!`
    }
    setProducts(currentProducts => {
      return [...currentProducts, newProduct]
    })
    console.log(`Add item ${name} to cart`);
  }

  function handleRemoveProduct(id) {
    const updatedProducts = products.filter(product => product.id !== id)
    setProducts(updatedProducts)
    console.log(`Removed item ${id} from cart`)
  }

  return (
    <Container>
      <ProductsList 
        onAddProduct={handleAddProduct}
        products={products} 
        onRemoveProduct={handleRemoveProduct} 
      />
       <div className="row mb-3">
          <div className="col-md-3"><img src="../../src/assets/Food-salmon-pic.jpg" alt="Food-gallery-1" /></div>
          <div className="col-md-3"><img src="../../src/assets/Food-prawns-pic.jpg" alt="Food-gallery-2" /></div>
          <div className="col-md-3"><img src="../../src/assets/Food-rice.jpg" alt="Food-gallery-3" /></div>
          <div className="col-md-3"><img src="../../src/assets/seafood-soup.jpg" alt="Food-gallery-4" /></div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3"><img src="../../src/assets/Food-banquet-pic.jpg" alt="Food-gallery-1" /></div>
          <div className="col-md-3"><img src="../../src/assets/Food-vegies-pic.jpg" alt="Food-gallery-2" /></div>
          <div className="col-md-3"><img src="../../src/assets/Food-spicy-noodles-pic.jpg" alt="Food-gallery-3" /></div>
          <div className="col-md-3"><img src="../../src/assets/Food-sushi-pic.jpg" alt="Food-gallery-4" /></div>
        </div>
    </Container>
  )
}

export default ProductsPage