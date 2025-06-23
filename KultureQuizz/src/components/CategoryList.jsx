function CategoryList({ categories, onSelectCategory }) {
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Histoire': '🏛️',
      'Géographie': '🌍',
      'Sciences': '🔬',
      'Littérature': '📚',
      'Cinéma': '🎬',
      'Musique': '🎵',
      'Sport': '⚽',
      'Art': '🎨',
      'Technologie': '💻',
      'Cuisine': '🍳'
    }
    return icons[categoryName] || '📝'
  }

  return (
    <div className="card card-glow">
      <h2 style={{ 
        fontSize: 'var(--font-size-2xl)', 
        fontWeight: '700', 
        marginBottom: 'var(--spacing-6)',
        textAlign: 'center',
        color: 'var(--text-primary)'
      }}>
        Choisissez une catégorie
      </h2>
      <div className="categories">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => onSelectCategory(cat)}
          >
            <span className="category-icon" role="img" aria-label={cat.name}>
              {getCategoryIcon(cat.name)}
            </span>
            <div className="category-name">{cat.name}</div>
            <div className="category-description">
              Testez vos connaissances en {cat.name.toLowerCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList 