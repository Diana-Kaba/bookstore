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
//import SortPrice from "./SortPrice";

const App = () => {
  const [recipes, setRecipes] = useState(recipesData);
  const [term, setTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeRecipe = (recipe) => {
    let goods = recipes;
    const updateRecipes = goods.filter(function (item) {
      return item.id !== recipe.id;
    });
    setRecipes(updateRecipes);
  };

  const addRecipeToList = (recipe) => {
    let goods = [...cart];
    goods.length && goods.includes(recipe)
      ? recipe.count++
      : goods.push(recipe);
    setCart(goods);
  };

  const deleteRecipeFromList = (recipe) => {
    let goods;
    if (recipe.count === 1) {
      goods = cart.filter((item) => item.id !== recipe.id);
    } else {
      goods = cart.filter((item) =>
        item.id === recipe.id ? recipe.count-- : recipe.count
      );
    }
    setCart(goods);
  };

  const searchRecipe = (items, term) => {
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

  const sortRecipe = (items, isChecked) => {
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

  const visiblerecipes = searchRecipe(sortRecipe(recipes, isChecked), term);

  return (
    <div>
      <Header className="container-fluid p-3 bg-light text-center" />
      <div className="container text-center">
        <div className="row">
          <div className="search-panel col-4 my-3" id="search-panel">
            <SearchPanel onUpdateSearch={onUpdateSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-3 my-3">
            <SortPanel onUpdateSort={onUpdateSort} />
          </div>
        </div>

        <div className="row justify-content-center">
          {visiblerecipes.map((recipe) => {
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

        {/* <ul className="list-group">
          {cart.map((recipe) => (
            <li key={recipe.id} className="list-group-item">
              <div className="row">
                <div className="col-4">{recipe.name}</div>
                <div className="col-4 text-start">{recipe.ingredients}</div>
                <div className="col-1">${recipe.price}</div>
                <div className="col-1">
                  <span class="badge bg-dark rounded-pill">{recipe.count}</span>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => deleteRecipeFromList(recipe)}
                    type="button"
                    className="btn btn-outline-primary mt-auto mb-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul> */}
        <table class="table bg-light">
          <thead class="table-warning">
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
                  <span class="badge bg-dark rounded-pill">{recipe.count}</span>
                </td>
                <td>
                  <button
                    onClick={() => deleteRecipeFromList(recipe)}
                    type="button"
                    className="btn btn-outline-primary mt-auto mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
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
      <Footer></Footer>
    </div>
  );
};

const Header = (props) => {
  return (
    <div className={props.className}>
      <Image src={logo} />
      <h1 className="display-4 fw-normal text-dark">Каталог рецептів</h1>
      <p className="fs-5 text-muted">
        Хочете їсти смачні страви? Хочете дізнатися більше про те, як їх
        готувати? <br></br> На цій сторінці ви знайдете добірку статей з
        найкращими рецептами!
      </p>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div class="container-fluid bg-light">
      <footer class="py-3 mt-5">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Up
            </a>
          </li>
          <li class="nav-item">
            <a href="#search-panel" class="nav-link px-2 text-muted">
              Search
            </a>
          </li>
          <li class="nav-item">
            <a href="#recip-item" class="nav-link px-2 text-muted">
              Recipes
            </a>
          </li>
          <li class="nav-item">
            <a href="#selected-recipes" class="nav-link px-2 text-muted">
              Selected recipes
            </a>
          </li>
        </ul>
        <p class="text-center text-muted">&copy; 2023 Company, Inc</p>
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
  return <div> Загальна вартість: ${sum.toFixed(2)} </div>;
};

const Count = (props) => {
  let count = 0;
  props.goods.forEach((recipe) => {
    count += recipe.count;
  });
  return <div> Кількість рецептів у списку: {count} </div>;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
