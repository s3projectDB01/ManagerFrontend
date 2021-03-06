import Create from "./Create";
import Overview from "./Overview";
import CreateIngredient from "./CreateIngredient";
import RestockIngredient from "./RestockIngredient.js";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function Recipes() {
  const classes = useStyles();
  return (
    <center>
      <div>
        <div className={classes.root}>
          <br />
          <Router>
            <Link to="/">
              <Button variant="contained" color="primary">
                Change Recipe Ingredients
              </Button>
            </Link>
            <Link to="/Create">
              <Button variant="contained" color="primary">
                Create Recipe
              </Button>
            </Link>
            <Link to="/CreateIngredient">
              <Button variant="contained" color="primary">
                Create Ingredient
              </Button>
            </Link>
            <Link to="/RestockIngredient">
              <Button variant="contained" color="primary">
                Restock Ingredient
              </Button>
            </Link>
            <Switch>
              <Route exact path="/Create">
                <Create />
              </Route>
              <Route exact path="/">
                <Overview />
              </Route>
              <Route exact path="/CreateIngredient">
                <CreateIngredient />
              </Route>
              <Route exact path="/RestockIngredient">
                <RestockIngredient />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </center>
  );
}

export default Recipes;
