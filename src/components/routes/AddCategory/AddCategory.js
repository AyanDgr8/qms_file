// src/components/routes/Sidebar/AddCategory/AddCategory.js

import React, { useState } from "react";
import "./AddCategory.css";

const AddCategory = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [words, setWords] = useState([""]);
  const [categories, setCategories] = useState([]);

  // Handle adding a new word input field
  const handleAddWord = () => {
    setWords([...words, ""]);
  };

  // Handle removing a word input field
  const handleRemoveWord = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  // Handle word input change
  const handleWordChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  // Handle category name change
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle adding the entire category
  const handleAddCategory = () => {
    if (categoryName && words.length > 0) {
      const newCategory = { name: categoryName, words };
      setCategories([...categories, newCategory]);
      onAddCategory(newCategory); // Notify parent component
      // Reset form
      setCategoryName("");
      setWords([""]);
    }
  };

  // Handle removing the entire category
  const handleRemoveCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    onAddCategory(updatedCategories); // Notify parent component
  };

  return (
    <div className="add-category-container">
      <h3 className="add-headi">Add New Category</h3>
      
      {/* Category Name Input */}
      <input
        type="text"
        placeholder="Enter category name"
        value={categoryName}
        onChange={handleCategoryNameChange}
        className="form-control inp-boxes"
      />

      {/* Word Inputs */}
      <h4 className="add-subheadi">Add Words</h4>
      {words.map((word, index) => (
        <div key={index} className="wordd-input-group">
          <input
            type="text"
            value={word}
            onChange={(e) => handleWordChange(index, e.target.value)}
            placeholder={`Word ${index + 1}`}
            className="form-control inpt-box"
          />
          <img 
            src="./uploads/trash.svg"
            className="trash"
            alt="trash"
            onClick={() => handleRemoveWord(index)}
          />
        </div>
      ))}

      {/* Add Word Button */}
      <button type="button" className="btnn addmore" onClick={handleAddWord}>
        + Add Word
      </button>

      {/* Add Category Button */}
      <button type="button" className="btnn addcate" onClick={handleAddCategory}>
        Save Category
      </button>

      {/* Display Added Categories */}
      <h4 className="added-cate">Added Categories</h4>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <strong>{category.name}</strong>
            <ul className="word-list">
              {category.words.map((word, i) => (
                <li key={i} className="word-item">{word}</li>
              ))}
            </ul>
            <img 
              src="./uploads/trash.svg"
              className="trash"
              alt="trash"
              onClick={() => handleRemoveCategory(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCategory;
