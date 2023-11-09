// Categories.js
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axios-client";
import { Category } from "@/types/Product";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/categories");
        setCategories(response.data);
        console.log(categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Catégories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.id}
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
