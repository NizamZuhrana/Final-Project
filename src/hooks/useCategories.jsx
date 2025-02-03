// src/hooks/useCategories.js
import { useState } from "react";
import axios from "axios";

// API Base URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sport-categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setMessage("Failed to fetch categories.");
    }
  };

  // Create Category
  const createCategory = async (categoryName) => {
    if (!categoryName) return;
    try {
      await axios.post(`${BASE_URL}/sport-categories/create`, { name: categoryName });
      setMessage("Category created successfully!");
      fetchCategories();
    } catch (error) {
      setMessage("Failed to create category.");
    }
  };

  // Update Category
  const updateCategory = async (categoryId, categoryName) => {
    if (!categoryId || !categoryName) return;
    try {
      await axios.put(`${BASE_URL}/sport-categories/update/${categoryId}`, { name: categoryName });
      setMessage("Category updated successfully!");
      fetchCategories();
    } catch (error) {
      setMessage("Failed to update category.");
    }
  };

  // Delete Category
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${BASE_URL}/sport-categories/delete/${categoryId}`);
      setMessage("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      setMessage("Failed to delete category.");
    }
  };

  return {
    categories,
    message,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
