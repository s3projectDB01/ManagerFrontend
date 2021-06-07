import React, { useState, useEffect } from 'react';

export function Overview(){

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState({
        id: "",
        title : ' ',
        ingredientsNeeded : []       
    });
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [ingredientTitle, setIngredientTitle] = useState();
    const [IngredientAmount, setIngredientAmount] = useState();

    useEffect(() => {
        fetch("https://inventory.tycho.dev/Recipe/GetAll")
        .then(results => results.json())
        .then(res =>{
            setRecipes(res);
        });
    }, []);

    function OnDelete(title){
        fetch(`https://inventory.tycho.dev/Recipe/delete/${title}`, { method: 'DELETE'})
    }

    const onIngredientTitleUpdate = (e) => {
        setIngredientTitle(e.target.value);
    }
    const onIngredientAmountUpdate = (e) => {
        setIngredientAmount(e.target.value);
    }
    
    const SaveChanges = (e) =>{
        e.preventDefault();
        
        const newIngredient = {
            id: selectedIngredient.id,
            Name: ingredientTitle, 
            AmountNeeded: IngredientAmount
        }

        // const index = selectedRecipe.ingredientsNeeded.indexOf(selectedIngredient);
        // if (index > -1) {
        //     selectedRecipe.ingredientsNeeded.splice(index, 1);
        // }

        // selectedRecipe.ingredientsNeeded.push(newIngredient);  

        const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIngredient)
        };
        fetch('https://inventory.tycho.dev/Recipe/Update/ingredient', requestOptions)
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
                    {selectedRecipe.ingredientsNeeded.map(ingredient =>
                        <tr key = {ingredient}>
                            <td>{ingredient.name}</td>
                            <center>
                                <td>{ingredient.amountNeeded}</td>
                            </center> 
                            <td><button onClick={() => setSelectedIngredient(ingredient)}>Edit</button></td>
                        </tr>
                    )}
                    <tr>
                        {/* {JSON.stringify(selectedRecipe.ingredientsNeeded)} */}
                    </tr>
                    
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