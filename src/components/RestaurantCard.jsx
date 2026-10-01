
function RestaurantCard({
  name,
  description,
  image,
  rating,
  badges = [],
}) {
  return (
    <article className="bg-white rounded-2xl border border-eco-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">

      {/* Imagen */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover"
        />
      ) : (
        <div className="w-full h-52 bg-eco-50 flex items-center justify-center">
          <span
            className="text-5xl"
            role="img"
            aria-label="Restaurante"
          >
            🍽️
          </span>
        </div>
      )}

      {/* Información */}
      <div className="p-6">

        <h2 className="font-coiny text-2xl text-eco-900">
          {name}
        </h2>

        <p className="mt-3 text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Calificación */}
        {rating !== undefined && (
          <div className="mt-4 inline-flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-semibold">
            ⭐ {rating}
          </div>
        )}

        {/* Badges sustentables */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">

            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-eco-100 text-eco-700 font-semibold"
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

