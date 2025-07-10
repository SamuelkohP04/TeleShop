import React, { useState } from "react";
import { Col, Row } from 'react-bootstrap'; 
import Card from 'react-bootstrap/Card';// ← All imports at top
// import "./Card.css";
import Button from 'react-bootstrap/Button';

interface Product {
  product: {
    title: string;
    Image: string;
    price: number;
    id: number;
  };
}

function ProductCard({ product: Product }) {
  const { title, Image, price, id } = Product;
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl 
      dark:bg-gray-950 ">
        <div className="flex-1 overflow-hidden">
        <img
          src={Image}
          alt="Product Image"
          width={600}
          height={600}
          className="w-full h-full object-cover"
          style={{ aspectRatio: "600/600", objectFit: "cover" }}
        />
        </div>
        <div className="p-4 space-y-2">
          <h4 className="text-xl font-semibold">{title}</h4>
          <h2 className="text-lg text-gray-700 dark:text-gray-300">{price}</h2>
          {/* <p className="text-gray-500 dark:text-gray-400">{developer.description}</p> */}

        </div>
      </div>
    </div>
  )
}

export default ProductCard;