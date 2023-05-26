import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import recipesData from "./recipes.js";
import logo from "./icon.png";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import RecipItem from "./RecipItem.jsx";
import Image from "./Image.jsx";
import SearchPanel from "./SearchPanel.jsx";
import SortPanel from "./SortPanel.jsx";
import SortPrice from "./SortPrice";

const App = () => {
  const [recipes, setRecipes] = useState(recipesData);
  const [term, setTerm] = useState("");
  const [isSortByName, setIsSortByName] = useState(false);
  const [isSortByPrice, setIsSortByPrice] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeRecipe = (recipe) => {
    const updatedRecipes = recipes.filter((item) => item.id !== recipe.id);
    setRecipes(updatedRecipes);
  };

  const addRecipeToList = (recipe) => {
    let updatedCart = [...cart];
    const existingRecipeIndex = updatedCart.findIndex(
      (item) => item.id === recipe.id
    );
    if (existingRecipeIndex !== -1) {
      updatedCart[existingRecipeIndex].count++;
    } else {
      updatedCart.push({ ...recipe, count: 1 });
    }
    setCart(updatedCart);
  };

  const deleteRecipeFromList = (recipe) => {
    let updatedCart;
    if (recipe.count === 1) {
      updatedCart = cart.filter((item) => item.id !== recipe.id);
    } else {
      updatedCart = cart.map((item) =>
        item.id === recipe.id ? { ...item, count: item.count - 1 } : item
      );
    }
    setCart(updatedCart);
  };

  const searchRecipe = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.name.toLowerCase().includes(term.toLowerCase());
    });
  };

  const sortRecipes = (items) => {
    let sortedItems = [...items];
    if (isSortByName) {
      sortedItems.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
    if (isSortByPrice) {
      sortedItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    return sortedItems;
  };

  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const onUpdateSortByName = (isChecked) => {
    setIsSortByName(isChecked);
  };

  const onUpdateSortByPrice = (isChecked) => {
    setIsSortByPrice(isChecked);
  };

  const visibleRecipes = sortRecipes(searchRecipe(recipes, term));

  return (
    <div>
      <Header />
      <div className="container text-center">
        <div className="row">
          <div className="search-panel col-4 my-3" id="search-panel">
            <SearchPanel onUpdateSearch={onUpdateSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 my-3">
            <SortPanel onUpdateSortByName={onUpdateSortByName} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 my-3">
            <SortPrice onUpdateSortByPrice={onUpdateSortByPrice} />
          </div>
        </div>

        <div className="row justify-content-center">
          {visibleRecipes.map((recipe) => {
            return (
              <div key={recipe.id} className="col-sm-4 col-12">
                <div className="card text-center my-5 p-3" id="recip-item">
                  <RecipItem
                    recipe={recipe}
                    removeRecipe={removeRecipe}
                    addRecipeToList={addRecipeToList}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container-fluid text-center" id="selected-recipes">
        <h4 className="display-6 text-center mb-4">Відібрані рецепти</h4>
        <table className="table bg-light table-bordered">
          <thead className="table-warning">
            <tr>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Count</th>
              <th>Delete</th>
            </tr>
          </thead>
          {cart.map((recipe) => (
            <tbody key={recipe.id}>
              <tr>
                <td>{recipe.name}</td>
                <td>{recipe.ingredients}</td>
                <td>${recipe.price}</td>
                <td>
                  <span className="badge bg-warning rounded-pill text-dark">
                    {recipe.count}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => deleteRecipeFromList(recipe)}
                    type="button"
                    className="btn btn-outline-warning mt-auto mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div id="second-table">
          <table className="table bg-light table-bordered">
            <tbody>
              <tr>
                <td className="table-warning fst-italic">
                  Number of selected recipes
                </td>
                <td className="text-center">
                  {" "}
                  <Count goods={cart} />
                </td>
              </tr>
              <tr>
                <td className="table-warning fst-italic">The total cost</td>
                <td className="text-center">
                  <Sum goods={cart} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

const Header = (props) => {
  return (
    <div className="container-fluid p-0 m-0 bg-light text-center" id="header">
      <Image src={logo} />
      <h1 className="display-4 fw-normal text-dark">Каталог рецептів</h1>
      <p className="fs-5 text-muted">
        Хочете їсти смачні страви? Хочете дізнатися більше про те, як їх
        готувати? <br></br> На цій сторінці ви знайдете добірку статей з
        найкращими рецептами!
      </p>
      <nav
        className="navbar navbar-expand-sm justify-content-center"
        id="navigation"
      >
        <ul className="navbar-nav">
          <li className="navbar-brand">
            <a className="nav-link text-light" href="#search-panel">
              Search
            </a>
          </li>
          <li className="navbar-brand">
            <a className="nav-link text-light" href="#recip-item">
              Recipes
            </a>
          </li>
          <li className="navbar-brand">
            <a className="nav-link text-light" href="#selected-recipes">
              Selected recipes
            </a>
          </li>
          <li className="navbar-brand">
            <a className="nav-link text-light" href="#footer">
              {" "}
              <button type="button" className="btn btn-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div className="container-fluid bg-light">
      <footer className="py-3 mt-5" id="footer">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="navbar-brand">
            <a className="nav-link text-dark" href="#header">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                />
              </svg>
            </a>
          </li>
          <li className="nav-item">
            <a href="#search-panel" className="nav-link px-2 text-muted">
              Search
            </a>
          </li>
          <li className="nav-item">
            <a href="#recip-item" className="nav-link px-2 text-muted">
              Recipes
            </a>
          </li>
          <li className="nav-item">
            <a href="#selected-recipes" className="nav-link px-2 text-muted">
              Selected recipes
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">&copy; 2023 Diana, Recipes</p>
      </footer>
    </div>
  );
};

const Sum = (props) => {
  let sum = 0;
  if (props.goods) {
    props.goods.forEach((recipe) => {
      sum += +(recipe.price * recipe.count);
    });
  }
  return (
    <div>
      <span class="badge bg-success">${sum.toFixed(2)}</span>
    </div>
  );
};

const Count = (props) => {
  let count = 0;
  props.goods.forEach((recipe) => {
    count += recipe.count;
  });
  return <div>{count}</div>;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
