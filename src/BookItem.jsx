import Image from "./Image.jsx";

const BookItem = props => {
    return (
      <div>
        <div className="card-title"><h5>{props.book.name}</h5></div>
        <Image src={props.book.imageCover} />
        <div className="card-title"><h3>${props.book.price}</h3></div>
        <button className="add_item btn btn-lg btn-warning" onClick={props.removeBook.bind(null, props.book)}>Delete</button>
        <button onClick={props.addBookToCart.bind(null, props.book)} className="btn btn-lg btn-primary mx-1" >Buy</button>
      </div>
    );
  };

export default BookItem;