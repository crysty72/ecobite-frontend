function RestaurantCard({
  name,
  description,
  image,
  rating,
  badges = [],
}) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden">
      
      {/* Imagen */}
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Información */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
          {name}
        </h2>

        <p className="mt-2 text-gray-600">
          {description}
        </p>

        {/* Calificación */}
        {rating !== undefined && (
          <p className="mt-3 font-semibold text-amber-500">
            ⭐ {rating}
          </p>
        )}

        {/* Badges sustentables */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700"
              >
                🌱 {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default RestaurantCard