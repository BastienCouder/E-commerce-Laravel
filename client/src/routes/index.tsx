import Home from "@/pages/home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "@/pages/auth";
import Loading from "@/loading";
import NotFound from "@/not-found";

const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* Pages */}
                <Route path="/" exact component={Home} />

                {/* Auth */}
                <Route path="/auth" exact component={Auth} />

                {/* Loading */}
                <Route component={Loading} />
                {/* 404 */}
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routes;
