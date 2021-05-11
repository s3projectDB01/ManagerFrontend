import React, { useState } from 'react';

const Create = (props) => {
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
                //.then(data => this.setState({ postId: data.id }));            
            
        }else{
            alert('NO!');
        }
    }

    return(
        <center>
            <form>

            <label htmlFor="recipeTitle">recipeTitle</label>
            <br/>   
            <input
                id = "recipeTitle"
                name = "recipeTitle"
                placeholder = "Enter recipe title"
                value = {recipeTitle}
                onChange = {onRecipeTitleUpdate} />
                
                <br/>
                <br/>
                <br/>
                <input type="button" value="Add New Ingredient" onClick={addIngredient}/>
                <br/>
                <br/>
                {
                    ingredientState.map((val, idx) => {
                        const ingredientId = `Name=${idx}`;
                        const amountNeededtId = `AmountNeeded=${idx}`;
                        return(
                            <div key={`ingredient-${idx}`}>
                                <label htmlFor={ingredientId}>{`Ingredient #${idx + 1}`}</label>
                                <br/>
                                <input
                                    type="text"
                                    name={ingredientId}
                                    data-idx={idx}
                                    id={ingredientId}
                                    className="Name"
                                    value={ingredientState[idx].Name}
                                    onChange={handleIngredientChange}
                                />
                                <br/>
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
                                /><br/><br/>
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