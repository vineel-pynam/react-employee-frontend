import { NotFound } from "http-errors";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddEmployee from "./Components/Employee/AddEmployee";
import Employees from "./Components/Employee/Employees";
import GetEmployee from "./Components/Employee/GetEmployee";
import UpdateEmployee from "./Components/Employee/UpdateEmployee";
import Header from "./Components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Employees} />
        <Route exact path="/add-employee" component={AddEmployee} />
        <Route exact path="/employee/:id" component={GetEmployee} />
        <Route exact path="/update-employee/:id" component={UpdateEmployee} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
