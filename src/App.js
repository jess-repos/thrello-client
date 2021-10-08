import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Main from "./components//main/Main";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import { AuthProvider } from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <BoardProvider>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/board/:_id" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </BoardProvider>
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;
