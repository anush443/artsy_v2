import { Link } from "react-router-dom";
import classes from "./ProductCard.module.css";

const ProductCard = ({ item }) => {
  return (
    <>
      <Link to={`/artwork/${item.id}`} style={{ textDecoration: "none" }}>
        <div className={classes.card}>
          <img src={item.img} alt={item.title}></img>
          <div className={classes.context}>
            <h2>{item.title}</h2>
            <p>{item.artist_name}</p>
            <p>{item.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
