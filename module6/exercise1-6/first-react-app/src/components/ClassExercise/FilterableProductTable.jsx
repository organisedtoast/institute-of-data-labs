import { useState } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <h2>Man Utd Official Merchandise Store</h2>

      <p>Type in the search box to filter products by name. Check the box to only show products in stock.</p>

      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

// Sample data for the product table
const PRODUCTS = [
  {category: "Jerseys", price: "$185", stocked: true, name: "Sesko Home Jersey 2025/26"},
  {category: "Jerseys", price: "$185", stocked: true, name: "Bruno Away Jersey 2025/26"},
  {category: "Jerseys", price: "$185", stocked: false, name: "Casemiro Third Jersey 2025/26"},
  {category: "Training Wear", price: "$95", stocked: true, name: "Man Utd Training Jacket"},
  {category: "Training Wear", price: "$85", stocked: false, name: "Man Utd Training Pants"},
  {category: "Accessories", price: "$45", stocked: true, name: "Man Utd Club Socks"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
