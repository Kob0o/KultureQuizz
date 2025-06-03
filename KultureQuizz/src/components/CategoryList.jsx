import Button from './Button'

function CategoryList({ categories, onSelectCategory }) {
  return (
    <div className="category-section">
      <h2>Choisissez une catégorie</h2>
      <div className="categories">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => onSelectCategory(cat)}
            className="category-btn"
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList 