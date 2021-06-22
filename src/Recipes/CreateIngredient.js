import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function CreateIngredient() {
  const classes = useStyles();
  const blankIngredient = {
    Name: "",
    AmountNeeded: 0,
  };

  const [ingredientState, setIngredientState] = useState([
    { ...blankIngredient },
  ]);

  const addIngredient = () => {
    setIngredientState([...ingredientState, { ...blankIngredient }]);
  };

  const handleIngredientChange = (e) => {
    const updatedIngredients = [...ingredientState];
    updatedIngredients[e.target.dataset.idx][e.target.className] =
      e.target.value;
    setIngredientState(updatedIngredients);
  };

  const OnSubmit = (e) => {
    e.preventDefault();

    const isValueProvided = ingredientState && ingredientState !== "";

    if (isValueProvided) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredientState),
      };

     fetch('https://inventory.tycho.dev/Ingredient/CreateMultiple', requestOptions)
        .then(response => response.json())        
        alert('Recipe ingredient go back to view recipes');
      }else{
          alert('NO!');
      }
  };

  return (
    <center>
      <div className={classes.root}>
        <form>
          <Button onClick={addIngredient} variant="contained" color="primary">
            Add New Ingredient
          </Button>
          <br />
          <br />
          {ingredientState.map((val, idx) => {
            const ingredientId = `Name=${idx}`;
            const amountNeededtId = `AmountNeeded=${idx}`;
            return (
              <div key={`ingredient-${idx}`}>
                <label htmlFor={ingredientId}>{`Ingredient #${idx + 1}`}</label>
                <br />
                <TextField
                  type="text"
                  label="Ingredient title"
                  name={ingredientId}
                  data-idx={idx}
                  id={ingredientId}
                  className="Name"
                  value={ingredientState[idx].Name}
                  onChange={handleIngredientChange}
                />
                <br />
                <br />
                <label htmlFor={amountNeededtId}>Amount in Inventory</label>
                <br />
                <TextField
                  type="number"
                  name={amountNeededtId}
                  data-idx={idx}
                  id={amountNeededtId}
                  className="AmountNeeded"
                  value={ingredientState[idx].AmountNeeded}
                  onChange={handleIngredientChange}
                />
                <br />
                <br />
              </div>
            );
          })}
          <Button onClick={OnSubmit} variant="contained" color="primary">
            Save Recipe
          </Button>
        </form>
      </div>
    </center>
  );
}

export default CreateIngredient;
