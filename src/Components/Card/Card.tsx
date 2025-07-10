import React, { useState } from "react";
import { Col, Row } from 'react-bootstrap'; 
import Card from 'react-bootstrap/Card';// ← All imports at top
import "./Card.css";

interface Product {
  product: {
    title: string;
    Image: string;
    price: number;
    id: number;
  };
}


function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;