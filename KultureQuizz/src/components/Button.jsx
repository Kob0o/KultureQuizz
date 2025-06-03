function Button({ 
  onClick, 
  disabled = false, 
  className = '', 
  children, 
  style = {} 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button 