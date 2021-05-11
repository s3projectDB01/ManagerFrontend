import React, { useState, useEffect } from 'react';

export function Overview(){
    const [recipes, setRecipes] = useState([]);
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
        

    return(
        <center>
            <table>
                <thead>
                    <tr>
                        <th>Recipes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(recipe =>
                        <tr key ={recipe}>
                            <td>{recipe.title}</td>
                            <td><button onClick={() => OnDelete(recipe.title)}>delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </center>    
    );
}
export default Overview;