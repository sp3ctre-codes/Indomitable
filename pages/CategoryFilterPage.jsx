import React from "react";
import { useParams } from "react-router-dom";
import CategoryPage from "./CategoryPage";

function CategoryFilterPage({
  products,
  favorites,
  onAddToFavorites,
}) {
  const { section, category } = useParams();

  const formattedCategory = category
    .replace(/-/g, " ")
    .toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSection =
      product.gender?.toLowerCase() === section.toLowerCase();

    const matchesCategory =
      product.category?.toLowerCase() === formattedCategory;

    return matchesSection && matchesCategory;
  });

  const pageTitle =
    section.charAt(0).toUpperCase() +
    section.slice(1) +
    " - " +
    formattedCategory.charAt(0).toUpperCase() +
    formattedCategory.slice(1);

  return (
    <CategoryPage
      title={pageTitle}
      products={filteredProducts}
      favorites={favorites}
      onAddToFavorites={onAddToFavorites}
    />
  );
}

export default CategoryFilterPage;
