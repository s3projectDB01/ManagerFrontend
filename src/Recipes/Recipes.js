import Create from './Create';
import Overview from './Overview';
import CreateIngredient from './CreateIngredient';
import {Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export function Recipes(){
    return(
        <center>
            <div> 
                <Router>
                    <Link to="/">
                        <button>
                            Overview
                        </button>
                    </Link>
                    <Link to="/Create">
                        <button>
                            Create a recipe
                        </button>
                    </Link>  
                    <Link to="/CreateIngredient">
                        <button>
                            Create Ingredient
                        </button>
                    </Link>
                    <Switch>
                        <Route exact path="/Create">
                            <Create/>
                        </Route>
                        <Route exact path="/">
                            <Overview />
                        </Route>
                        <Route exact path="/CreateIngredient">
                            <CreateIngredient />
                        </Route>
                    </Switch>
                </Router>                     
            </div>
        </center>    
    );
}

export default Recipes;