import React, { useState, useEffect } from 'react';

export function Overview(){
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [ingredientTitle, setIngredientTitle] = useState();
    const [IngredientAmount, setIngredientAmount] = useState();
    const [updatedRecipe, setUpdatedRecipe] = useState({});

    useEffect(() => {
        fetch("https://localhost:5001/Recipe/getRecipes")
        .then(results => results.json())
        .then(res =>{
            setRecipes(res);
        });
    }, []);

    function OnDelete(title){
        fetch(`https://localhost:5001/Recipe/delete/${title}`, { method: 'DELETE'})
    }

    const onIngredientTitleUpdate = (e) => {
        setIngredientTitle(e.target.value);
    }
    const onIngredientAmountUpdate = (e) => {
        setIngredientAmount(e.target.value);
    }
    
    const SaveChanges = (e) =>{
        const newRecipe = {
            ...selectedRecipe,
        }
        newRecipe.ingredients[0].amountNeeded = 5;
        setUpdatedRecipe(newRecipe);
        
        const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe)
    };
    fetch('https://localhost:5001/Recipe/updateRecipe', requestOptions)
        .then(response => response.json())
    }

    return(
        <center>
            <table>
                <thead>
                    <tr>
                        <th>Recipes</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(recipe =>
                        <tr key ={recipe}>
                            <td>{recipe.title}</td>
                            <td><button onClick={() => setSelectedRecipe(recipe)}>Edit</button></td>
                            <td><button onClick={() => OnDelete(recipe.title)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>{selectedRecipe.title}</th>
                        <th>amount of ingredient</th>
                        <th>edit</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {selectedRecipe.ingredients.map(ingredient =>
                        <tr key = {ingredient}>
                            <td>{ingredient.name}</td>
                            <center>
                                <td>{ingredient.amountNeeded}</td>
                            </center> 
                            <td><button onClick={() => setSelectedIngredient(ingredient)}>Edit</button></td>
                        </tr>
                    )} */}
                    {/* <tr>
                        {JSON.stringify(selectedRecipe.ingredients)}
                    </tr> */}
                    
                </tbody>
            </table>
            <br/>
            <form>
                <label>Ingredient</label>
                <input
                    placeholder = {selectedIngredient.name}
                    value = {ingredientTitle}
                    onChange = {onIngredientTitleUpdate}
                />
                <label>Amount</label>
                <input
                    placeholder = {selectedIngredient.amountNeeded}
                    value = {IngredientAmount}
                    onChange = {onIngredientAmountUpdate}
                />
                <button onClick={SaveChanges}>Save Receipe</button> 
            </form>
        </center>    
    );
}
export default Overview;