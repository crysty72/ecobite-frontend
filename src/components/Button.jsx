
function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-primary
        text-white
        px-5
        py-2.5
        rounded-xl
        font-bold
        hover:bg-eco-700
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button

