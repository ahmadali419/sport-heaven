import { Box, Button, Grid, Section } from "@radix-ui/themes";
import React from "react";
import ProductCard from "../components/productCard"; // Correct the import statement

const HeroSection = () => {
    return (
        <div>
             <Box
  style={{ backgroundColor: "var(--gray-a2)", borderRadius: "var(--radius-3)", overflow: "hidden" }}
>
  {/* <Sliders />  */}
  <div className="row">

    <div className="xl:col-span-5 2xl:col-span-7 border  ">
    <div
      className="product-card"
      style={{
        /* Your inline CSS styles here */
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        marginTop:'10px'
      }}
    >
      <h3 style={{ textAlign:'center',marginTop:'10px',marginBottom:'10px',fontSize:'27px' }}><b>Latest Products</b></h3>
      <ProductCard/>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
    <a href="/products">View All Products</a>
  </p>
      </div>
    <div
      className="product-card"
      style={{
        /* Your inline CSS styles here */
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        marginTop:'10px'
      }}
    >
      <h3 style={{ textAlign:'center',marginTop:'10px',marginBottom:'10px',fontSize:'27px' }}><b>Featured Products</b></h3>
      <ProductCard/>
      </div>
    </div>
    <div className="xl:col-span-5 2xl:col-span-7 border  ">
    <div
      className="product-card"
      style={{
        /* Your inline CSS styles here */
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3 style={{ textAlign:'center',marginTop:'10px',marginBottom:'10px',fontSize:'27px' }}><b>About Us</b></h3>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</p>
      {/* <ProductCard/> */}
      </div>
    </div>
  </div>
</Box>
        </div>
    );
};

export default HeroSection;
