// import React from "react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import booksData from "./books.js";
import logo from "./comic-logo.png";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./books.css";
import BookItem from "./BookItem.jsx";
import Image from "./Image.jsx";
import SearchPanel from "./SearchPanel.jsx";
import SortPanel from "./SortPanel.jsx";

// class App extends React.Component {
const App = () => {
  const [books, setBooks] = useState(booksData);
  // const [cart, setCart] = useState(getBookData);
  const [term, setTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [cart, setCart] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeBook = (book) => {
    let goods = books;
    const updateBooks = goods.filter(function (item) {
      return item.id !== book.id;
    });
    setBooks(updateBooks);
  };

  const addBookToCart = (book) => {
    let goods = [...cart];
    goods.length && goods.includes(book) ? book.count++ : goods.push(book);
    // setBookData(goods);
    setCart(goods);
  };

  const deleteBookFromCart = (book) => {
    let goods;
    if (book.count === 1) {
      goods = cart.filter((item) => item.id !== book.id);
    } else {
      goods = cart.filter((item) =>
        item.id === book.id ? book.count-- : book.count
      );
    }
    // setBookData(goods);
    setCart(goods);
  };

  const searchBook = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const sortBook = (items, isChecked) => {
    if (isChecked) {
      return items.sort((a, b) =>
        a.name < b.name ? -1 : a.name === b.name ? 0 : 1
      );
    } else {
      return items.sort((a, b) => a.id - b.id);
    }
  };

  const onUpdateSort = (isChecked) => {
    setIsChecked(isChecked);
  };

  const visibleBooks = searchBook(sortBook(books, isChecked), term);

  return (
    <div>
      <Header className="header container-fluid p-5 bg-dark text-primary text-center" />
      <div className="container text-center">
        <div className="row">
          <div className="search-panel col-4 my-3">
            <SearchPanel onUpdateSearch={onUpdateSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 my-3">
            <SortPanel onUpdateSort={onUpdateSort} />
          </div>
        </div>

        <div className="row justify-content-center">
          {visibleBooks.map((book) => {
            // console.log(book.id);
            return (
              <div key={book.id} className="col-sm-4 col-12">
                <div className="card text-center my-5 p-3">
                  <BookItem
                    book={book}
                    removeBook={removeBook}
                    addBookToCart={addBookToCart}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container-fluid text-center">
        <h4>Кошик товарів</h4>
        <p>Кількість книг: {cart.length} </p>

        <ul className="list-group">
          {cart.map((book) => (
            <li key={book.id} className="list-group-item">
              <div className="row">
                <div className="col-4">{book.name}</div>
                <div className="col-3">{book.author}</div>
                <div className="col-2">{book.price}</div>
                <div className="col-1">{book.count}</div>
                <div className="col-2">
                  <button
                    onClick={() => deleteBookFromCart(book)}
                    type="button"
                    className="btn btn-outline-primary mt-auto mb-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="row">
          <div className="col-12">
            <Count goods={cart} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Sum goods={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

// const getBookData = () => {
//   return localStorage.getItem("goods")
//     ? JSON.parse(localStorage.getItem("goods"))
//     : [];
// };

// const setBookData = (o) => {
//   localStorage.setItem("goods", JSON.stringify(o));
// };

function Header(props) {
  return (
    <div className={props.className}>
      <Image src={logo} />
      <h1 className="display-2">Comic book store</h1>
    </div>
  );
}

const Sum = (props) => {
  let sum = 0;
  if (props.goods) {
    props.goods.forEach((book) => {
      // console.log(book.price);
      sum += +(book.price * book.count);
    });
  }
  return <div> Суммарна вартість: {sum.toFixed(2)} </div>;
};

class Count extends React.Component {
  render() {
    let count = 0;
    this.props.goods.forEach((book) => {
      count += book.count;
    });
    return <div> Number of books in the basket: {count} </div>;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
