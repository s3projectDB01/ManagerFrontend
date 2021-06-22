import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RestockIngredient = (props) => {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState([]);
  const [blankIngredient] = useState({
    id: "",
    name: "",
    amountNeeded: 0,
  });

  const [updatedIngredient, setUpdatedIngredient] = useState(blankIngredient);
  const [selectedIngredient, setSelectedIngredient] = useState(blankIngredient);

  const [ingredientAmount, setIngredientAmount] = useState(0);

  useEffect(() => {
    fetch("https://inventory.tycho.dev/Ingredient/GetAll")
      .then((results) => results.json())
      .then((res) => {
        setIngredients(res);
      });
  }, []);

  const handleIngredientSelect = (e) => {
    setSelectedIngredient(e.target.value);
    console.log(e.target.value);
  };

  const handleIngredientAmount = (e) => {
    setIngredientAmount(e.target.value);
  };

  const saveChange = (e) => {
    const obj = { 
        id: selectedIngredient.id, 
        name: selectedIngredient.name, 
        amountNeeded: +ingredientAmount + +selectedIngredient.amountNeeded
    };

    setUpdatedIngredient({ 
        id: selectedIngredient.id, 
        name: selectedIngredient.name, 
        amountNeeded: +ingredientAmount + +selectedIngredient.amountNeeded
    });

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    };

    fetch("https://inventory.tycho.dev/Ingredient/Update", requestOptions)
        .then(response => response.json())
        
    alert('Ingredient updated');   
  };

  return (
    <div>
      <br />
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          className="Name"
          onChange={handleIngredientSelect}
        >
          {ingredients.map((ingredient) => (
            <MenuItem value={ingredient}>{ingredient.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        type="number"
        label="Amount of Extra Product"
        onChange={handleIngredientAmount}
      />
      <br />
      <br />
      <Button onClick={saveChange} variant="contained" color="primary">
        Restock Ingredient
      </Button>
      <h1>{JSON.stringify(updatedIngredient)}</h1>
    </div>
  );
};
export default RestockIngredient;
