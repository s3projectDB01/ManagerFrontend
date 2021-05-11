import Create from './Create';
import Overview from './Overview';
import {Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React, { useState } from 'react';

export function Recipes(){
    const [test, settest] = useState();
    
    async function saveRecipe(recipe){
        const item = recipe.Title;
        settest(item);
    }

    return(
        <center>
            <div> 
                <Router>
                    <Link to="/Create">
                        <button>
                            Create a recipe
                        </button>
                    </Link>
                    <Switch>
                        <Route exact path="/Create">
                            <Create saveRecipe={saveRecipe} />
                        </Route>
                        <Route exact path="/">
                            <Overview />
                        </Route>
                    </Switch>
                </Router>                     
            </div>
            <div>
                {test}
            </div>


        </center>    
    );
}

export default Recipes;