import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

import { ethers } from 'ethers';
import ProductContract from './abis/ProductContract.json';

const provider = new ethers.providers.JsonRpcProvider(); // Use your Ethereum provider

function ProductApp() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const network = await provider.getNetwork();
      const contractAddress = ProductContract.networks[network.chainId].address;
      const contract = new ethers.Contract(
        contractAddress,
        ProductContract.abi,
        provider
      );

      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const manufacturerProducts = await contract.getProductsByManufacturer(
        account
      );

      setProducts(manufacturerProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async function publishProduct() {
    try {
      const signer = provider.getSigner();
      const contractAddress = ProductContract.networks[1].address;
      const contract = new ethers.Contract(
        contractAddress,
        ProductContract.abi,
        signer
      );

      await contract.publishProduct(name, imageUrl);
      setName('');
      setImageUrl('');

      // Reload products
      loadProducts();
    } catch (error) {
      console.error('Error publishing product:', error);
    }
  }

  return (
    <Container>
      <h1>Product App</h1>
      <Form>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={publishProduct}>
          Publish Product
        </Button>
      </Form>
      <hr />
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Card>
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductApp;
