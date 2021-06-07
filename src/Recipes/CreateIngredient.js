import React, { useState } from 'react';

export function CreateIngredient(){

    const blankIngredient = { 
        Name: '', 
        AmountNeeded:0 
    };

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


    const OnSubmit = (e) =>{
        e.preventDefault();

        const isValueProvided = ingredientState && ingredientState !== "";

        if(isValueProvided){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ingredientState)
            };

            fetch('https://localhost:5001/Ingredient/CreateMultiple', requestOptions)
                .then(response => response.json())        
            
            alert('Recipe ingredient go back to view recipes');
        }else{
            alert('NO!');
        }
    }

    return(
        <center>
            <form>
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
                                <label htmlFor={amountNeededtId}>Amount in Inventory</label>
                                <br/>
                                <input
                                    type="number"
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
        </center>  
    );
}

export default CreateIngredient;

