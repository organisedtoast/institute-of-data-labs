# Component Split Plan

## File Structure

```
src/components/ClassExercise/
├── FilterableProductTable.jsx    (Level 1 - Parent component + sample data + App export)
├── SearchBar.jsx                 (Level 2 - Search input + checkbox)
├── ProductTable.jsx              (Level 3 - Table structure with filtering logic)
├── ProductCategoryRow.jsx        (Level 4 - Category header row)
└── ProductRow.jsx                (Level 4 - Individual product row)
```

---

## Component Breakdown

| Level | Component              | File                       | Props                                                      | Responsibilities                                                      |
|:-----:|------------------------|----------------------------|------------------------------------------------------------|-----------------------------------------------------------------------|
| 1     | `FilterableProductTable` | `FilterableProductTable.jsx` | `{ products }`                                             | State (`filterText`, `inStockOnly`), renders `SearchBar` + `ProductTable`, holds `PRODUCTS` data |

| 2     | `SearchBar`            | `SearchBar.jsx`            | `{ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }` | Form with text input + checkbox, triggers parent callbacks |

| 3     | `ProductTable`         | `ProductTable.jsx`         | `{ products, filterText, inStockOnly }`                    | Filtering logic, builds rows, renders `<table>` with child components |

| 4     | `ProductCategoryRow`   | `ProductCategoryRow.jsx`   | `{ category }`                                             | Renders `<tr><th colSpan="2">{category}</th></tr>` |

| 4     | `ProductRow`           | `ProductRow.jsx`           | `{ product }`                                              | Renders `<tr><td>` with conditional red styling for out-of-stock |

---

## Imports/Exports Per File

### FilterableProductTable.jsx
- **Imports:** `useState`, `SearchBar`, `ProductTable`
- **Exports:** `FilterableProductTable` (named), `PRODUCTS` (const), `App` (default)
- **Kept:** `export default function App() { return <FilterableProductTable products={PRODUCTS} />; }`

### SearchBar.jsx
- **Imports:** None (pure functional component)
- **Exports:** `SearchBar` (named)

### ProductTable.jsx
- **Imports:** `ProductCategoryRow`, `ProductRow`
- **Exports:** `ProductTable` (named)

### ProductCategoryRow.jsx
- **Imports:** None
- **Exports:** `ProductCategoryRow` (named)

### ProductRow.jsx
- **Imports:** None
- **Exports:** `ProductRow` (named)

---

## Props Flow Diagram

```
FilterableProductTable
  ├── SearchBar (filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange)
  └── ProductTable (products, filterText, inStockOnly)
        ├── ProductCategoryRow (category)
        └── ProductRow (product)
```

---

## Understanding Props

### What are Props?

**Props** (short for "properties") are how components pass data **down** from parent to child. Think of them like function arguments, but for React components.

### Key Rules of Props

1. **Props are read-only** - A child component cannot modify the props it receives. It can only read and display them.
2. **Props flow one way (top-down)** - Data always flows from parent → child, never the other way around.
3. **Props make components reusable** - The same component can display different data by receiving different props.

### Props in This Exercise

| Component | Props Received | What They Do |
|-----------|----------------|--------------|
| `SearchBar` | `filterText`, `inStockOnly`, `onFilterTextChange`, 

`onInStockOnlyChange` | Receives the current search text and checkbox state, plus callback functions to notify the parent when they change |

| `ProductTable` | `products`, `filterText`, `inStockOnly` | Receives the full product list and filtering criteria to decide which products to show |

| `ProductCategoryRow` | `category` | Receives a single category name to display as a table header |

| `ProductRow` | `product` | Receives a single product object to display as a table row |

### Example: How Props Are Passed

```jsx
// In FilterableProductTable.jsx (parent)
<SearchBar 
  filterText={filterText}                    // Pass current filter text
  inStockOnly={inStockOnly}                  // Pass checkbox state
  onFilterTextChange={setFilterText}         // Pass function to update filter text
  onInStockOnlyChange={setInStockOnly}       // Pass function to update checkbox
/>
```

```jsx
// In SearchBar.jsx (child)
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  // Now we can USE these props:
  return (
    <form>
      <input 
        value={filterText}                   // Read the prop
        onChange={(e) => onFilterTextChange(e.target.value)}  // Call the callback prop
      />
      <input 
        checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)}
      />
    </form>
  );
}
```

### Analogy: Props Like a Restaurant Order

- **Parent component** = Customer placing an order
- **Props** = The order details (what dish, any special requests)
- **Child component** = Kitchen receiving the order and preparing the dish
- The kitchen doesn't change the order - it just prepares what was requested

---

## Notes

- ✅ Inline styles preserved (red text for out-of-stock products)
- ✅ `PRODUCTS` array stays in `FilterableProductTable.jsx`
- ✅ `App` component export kept in `FilterableProductTable.jsx`
