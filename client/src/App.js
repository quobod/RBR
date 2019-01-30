import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import About from './components/views/About';
import Dashboard from './components/views/Dashboard';
import Home from './components/views/Home';
import Register from './components/views/Register';
import Signin from './components/views/Signin';
import Todos from './components/views/Todos';
import Journals from './components/views/Journals';
import TodoForm from './components/views/TodoForm';
import Spinner from './components/Spinner';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Suspense fallback={<Spinner />}>
            <React.Fragment>
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/register" component={Register} />
                  <Route path="/signin" component={Signin} />
                  <ProtectedRoute exact path="/todos" component={Todos} />
                  <ProtectedRoute exact path="/journals" component={Journals} />
                  <ProtectedRoute path="/addtodo" component={TodoForm} />
                  <ProtectedRoute path="/dashboard" component={Dashboard} />
                </Switch>
              </div>
            </React.Fragment>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
