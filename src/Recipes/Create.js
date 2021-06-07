import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { v4 as uuidv4 } from 'uuid';

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
    const [ingredients, setIngredients] = useState();
    const [loading, setLoading] = useState(true);

    const blankIngredient = { 
        Name: '', 
        AmountNeeded:'' 
    };
    
    const [ingredientState, setIngredientState] = useState([
        {...blankIngredient}
    ]);

    useEffect(() => {
        setLoading(true);
        fetch("https://localhost:5001/Ingredient/GetAll")
        .then(results => results.json())
        .then(res =>{
            setIngredients(res);
        });
        setLoading(false);
    },[]);

    const addIngredient = () => {
        setIngredientState([...ingredientState, {...blankIngredient}]);
    }

    const handleIngredientChange = (e) =>{
        let id  = e.target.name.charAt(e.target.name.length-1);
        const updatedIngredients = [...ingredientState];
        updatedIngredients[id]["Name"] = e.target.value;
        //updatedIngredients[id][e.target.className] = e.target.value;
        setIngredientState(updatedIngredients);
        //const { myValue } = e.currentTarget.dataset;
        
        console.log(id);
        console.log(e);
        console.log(e.target.value)
    };
    
    const handleIngredientChangeAmount = (e) =>{
        let id  = e.target.name.charAt(e.target.name.length-1);
        const updatedIngredients = [...ingredientState];
        updatedIngredients[id]["AmountNeeded"] = e.target.value;
        setIngredientState(updatedIngredients);
        console.log(e.target.value)
    }

    const onRecipeTitleUpdate = (e) => {
        setrecipeTitle(e.target.value);
    }

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

            fetch('https://localhost:5001/Recipe', requestOptions)
                .then(response => response.json())        
            
            alert('Recipe created go back to view recipes');
        }else{
            alert('NO!');
        }
    }

    if (loading) {
        return <p>Data is loading...</p>;
    }
    console.log(ingredientState)
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
                                    <InputLabel htmlFor={ingredientId} id="demo-simple-select-label">{`Ingredient #${idx + 1}`}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name={ingredientId}
                                        data-idx={idx}
                                        id={ingredientId}
                                        className="Name"
                                        value={ingredientState[idx].Name}
                                        onChange={handleIngredientChange}
                                    >
                                    {ingredients.map(ingredient =>
                                        <MenuItem 
                                        value={ingredient.name}
                                        value2={"Name"} 
                                        id={idx}>
                                            {ingredient.name}
                                        </MenuItem>
                                    )
                                   }
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
                                    onChange={handleIngredientChangeAmount}
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