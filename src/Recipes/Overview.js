import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function Overview() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({
    id: "",
    title: " ",
    ingredientsNeeded: [],
  });
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [IngredientAmount, setIngredientAmount] = useState();

  useEffect(() => {
    fetch("https://inventory.tycho.dev/Recipe/GetAll")
      .then((results) => results.json())
      .then((res) => {
        setRecipes(res);
      });
  }, []);

  function OnDelete(title) {
    fetch(`https://inventory.tycho.dev/Recipe/delete/${title}`, {
      method: "DELETE",
    });
    alert("Recipe deleted");
  }

  function DeleteIngredientFromRecipe(ingredient, recipeToAlter) {
    alert("Ingredient deleted");
  }

  const onIngredientAmountUpdate = (e) => {
    setIngredientAmount(e.target.value);
  };

  const SaveChanges = (e) => {
    e.preventDefault();

    const newIngredient = {
      id: selectedIngredient.id,
      Name: selectedIngredient.name,
      AmountNeeded: IngredientAmount,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIngredient),
    };

    fetch(
      "https://inventory.tycho.dev/Recipe/Update/ingredient",
      requestOptions
    ).then((response) => response.json());
    alert("Recipe updated");
  };

  return (
    <center>
        <table width="30%">
          <thead>
            <tr>
              <th class="col-md-3">Recipes</th>
              <th class="col-md-3">Edit</th>
              <th class="col-md-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe}>
                <td>{recipe.title}</td>
                <td>
                  <Button
                    onClick={() => setSelectedRecipe(recipe)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => OnDelete(recipe.id)}
                    variant="contained"
                    color="primary"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <table width="30%">
          <thead>
            <tr>
              <th>{selectedRecipe.title}</th>
              <th>amount of ingredient</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedRecipe.ingredientsNeeded.map((ingredient) => (
              <tr key={ingredient}>
                <td>{ingredient.name}</td>
                <td>{ingredient.amountNeeded}</td>
                <td>
                  <Button
                    onClick={() => setSelectedIngredient(ingredient)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </td>

                <td>
                  <Button
                    onClick={() =>
                      DeleteIngredientFromRecipe(ingredient, selectedRecipe)
                    }
                    variant="contained"
                    color="primary"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <form>
          <label>Amount of {selectedIngredient.name} </label>
          <br />
          <TextField
            id="standard-basic"
            label="Enter a number"
            placeholder={selectedIngredient.amountNeeded}
            value={IngredientAmount}
            onChange={onIngredientAmountUpdate}
          />
          <br />
          <br />
          <Button onClick={SaveChanges} variant="contained" color="primary">
            Save Receipe
          </Button>
        </form>
    </center>
  );
}
export default Overview;
