import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Create = (props) => {
    const classes = useStyles();
    const [recipeTitle, setrecipeTitle] = useState("");
    const blankIngredient = { 
        Name: '', 
        AmountNeeded:'' };
    const [ingredientState, setIngredientState] = useState([
        {...blankIngredient}
    ]);

    const addIngredient = () => {
        setIngredientState([...ingredientState, {...blankIngredient}]);
    }

    const handleIngredientChange = (e) => {
        const updatedIngredients = [...ingredientState];
        updatedIngredients[e.target.dataset.idx][e.target.className] = e.target.value;
        setIngredientState(updatedIngredients);
    };

    const onRecipeTitleUpdate = (e) => {
        setrecipeTitle(e.target.value);
    }

    const OnSubmit = (e) =>{
        e.preventDefault();

        const obj = {
            title : recipeTitle,
            ingredients : ingredientState
        }

        const isTitleProvided = recipeTitle && recipeTitle !== "";
        
        if(isTitleProvided){
            console.log(obj)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            fetch('https://localhost:5001/Recipe', requestOptions)
                .then(response => response.json())        
            
            alert('Recipe created go back to view recipes');
        }else{
            alert('NO!');
        }
    }

    return(
        <center>
            <form>

            <label htmlFor="recipeTitle">Recipe Title</label>
            <br/>   
            <input
                id = "recipeTitle"
                name = "recipeTitle"
                placeholder = "Enter recipe title"
                value = {recipeTitle}
                onChange = {onRecipeTitleUpdate} />               
                <br/>
                <br/>
                <input type="button" value="Add New Ingredient" onClick={addIngredient}/>
                {ingredientState.map((val, idx) => {
                        const ingredientId = `Name=${idx}`;
                        const amountNeededtId = `AmountNeeded=${idx}`;
                        return(
                            <div key={`ingredient-${idx}`}>
                                
                                <center>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">{`Ingredient #${idx + 1}`}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id={ingredientId}
                                        name={ingredientId}
                                        data-idx={idx}
                                        value={ingredientState[idx].Name}
                                        onChange={handleIngredientChange}
                                    >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                </center>

                                <label htmlFor={amountNeededtId}>Amount Needed</label>
                                <br/>
                                <input
                                    type="text"
                                    name={amountNeededtId}
                                    data-idx={idx}
                                    id={amountNeededtId}
                                    className="AmountNeeded"
                                    value={ingredientState[idx].AmountNeeded}
                                    onChange={handleIngredientChange}
                                />
                            </div>
                        );
                    })
                }
                <br/>
                    <button onClick={OnSubmit}>Save Receipe</button>           
            </form>
            {/* <div>{recipe}</div> */}
            <div>{JSON.stringify(ingredientState)}</div>
            
        </center>    
    );
}

export default Create;