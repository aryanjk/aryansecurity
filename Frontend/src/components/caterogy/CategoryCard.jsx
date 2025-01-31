import React, { useState } from "react";
import "./CategoryCard.css"; // Make sure to create and import this CSS file

const CategoryCard = ({ categoryInformation, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      className='card category-card border-0 p-0 shadow-lg h-100 w-100 row d-flex rounded'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Handle click
    >
      <div className='col-12 h-100 p-0 m-0 rounded'>
        <img
          src={`http://localhost:5500/category/${categoryInformation.categoryImage}`}
          className='card-img-top h-100 w-100 rounded object-fit-cover'
          alt={categoryInformation.categoryName}
        />
      </div>
      <div
        className={`overlay col-6 h-100 border d-flex justify-content-lg-center align-items-center flex-column ${
          isHovered ? "d-block" : "d-none"
        }`}
      >
        <h5 className='card-title'>{categoryInformation.categoryName}</h5>
        <p className='card-text text-center'>
          {categoryInformation.categoryDescription.slice(0, 40)}...
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
