import Image from "./Image.jsx";

const ReciepItem = props => {
    return (
      <div>
        <div className="card-title"><h5>{props.recipe.name}</h5></div>
        <Image src={props.recipe.imageCover} />
        <div className="card-title"><h3>${props.recipe.price}</h3></div>
        <button className="add_item btn btn-lg btn-danger" onClick={props.removeRecipe.bind(null, props.recipe)}>Видалити</button>
        <button onClick={props.addRecipeToList.bind(null, props.recipe)} className="btn btn-lg btn-warning mx-1" >❤</button>
      </div>
    );
  };

export default ReciepItem;