function RestaurantCard({ name, description }) {
    return (
       <article>
            <h2>{name}</h2>
            <p>{description}</p>
        </article>
    );
}

export default RestaurantCard;