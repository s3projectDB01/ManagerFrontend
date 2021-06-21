import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Create = (props) => {
  const classes = useStyles();
  const [recipeTitle, setrecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const blankIngredient = {
    Name: "",
    AmountNeeded: 0,
  };

  const [ingredientState, setIngredientState] = useState([
    { ...blankIngredient },
  ]);

  useEffect(() => {
    fetch("https://inventory.tycho.dev/Ingredient/GetAll")
    .then(results => results.json())
    .then(res =>{
        setIngredients(res);
    });
},[]);

  const addIngredient = () => {
    setIngredientState([...ingredientState, { ...blankIngredient }]);
  };

  const handleIngredientChange = (e) => {
    let id = e.target.name.charAt(e.target.name.length - 1);
    const updatedIngredients = [...ingredientState];
    updatedIngredients[id]["Name"] = e.target.value;
    setIngredientState(updatedIngredients);
  };
    
  const handleIngredientChangeAmount = (e) => {
    let id = e.target.name.charAt(e.target.name.length - 1);
    const updatedIngredients = [...ingredientState];
    updatedIngredients[id]["AmountNeeded"] = e.target.value;
    setIngredientState(updatedIngredients);

  };

  const onRecipeTitleUpdate = (e) => {
    setrecipeTitle(e.target.value);
  };

    const OnSubmit = (e) =>{
        e.preventDefault();

        const obj = {
            id : uuidv4(),
            title : recipeTitle,
            ingredientsNeeded : ingredientState
        }

        const isTitleProvided = recipeTitle && recipeTitle !== "";
        
        if(isTitleProvided){
            console.log(obj)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            fetch('https://inventory.tycho.dev/Recipe', requestOptions)
                .then(response => response.json())        
            
            alert('Recipe created go back to view recipes');
        }else{
            alert('NO!');
        }  
  };

  if (loading) {
    return <p>Data is loading...</p>;
  }

  return (
    <center>
      <form>
        <div className={classes.root}>
          <br />
          <label htmlFor="recipeTitle"> Recipe Title</label>
          <br />
          <TextField
            label="Recipe Title"
            id="recipeTitle"
            name="recipeTitle"
            value={recipeTitle}
            onChange={onRecipeTitleUpdate}
          />
          <br />
          <br />
          <Button onClick={addIngredient} variant="contained" color="primary">
            Add Ingredient
          </Button>
          {ingredientState.map((val, idx) => {
            const ingredientId = `Name=${idx}`;
            const amountNeededtId = `AmountNeeded=${idx}`;
            return (
              <div key={`ingredient-${idx}`}>
                <center>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor={ingredientId}
                      id="demo-simple-select-label"
                    >{`Ingredient #${idx + 1}`}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name={ingredientId}
                      data-idx={idx}
                      displayEmpty
                      id={ingredientId}
                      className="Name"
                      value={ingredientState[idx].Name}
                      onChange={handleIngredientChange}
                    >
                      {ingredients.map((ingredient) => (
                        <MenuItem value={ingredient.name} id={idx}>
                          {ingredient.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </center>

                <label htmlFor={amountNeededtId}>Amount Needed</label>
                <br />
                <TextField
                  name={amountNeededtId}
                  data-idx={idx}
                  id={amountNeededtId}
                  className="AmountNeeded"
                  value={ingredientState[idx].AmountNeeded}
                  onChange={handleIngredientChangeAmount}
                />
                <br />
                <br />
              </div>
              
            );
          })}
          <br />
          {/* <button onClick={OnSubmit}>Save Receipe</button> */}
          <Button onClick={OnSubmit} variant="contained" color="primary">
            Save Receipe
          </Button>
        </div>
      </form>
    </center>
  );
};

export default Create;
