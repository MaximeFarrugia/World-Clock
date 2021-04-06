import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Settings from './Settings'

const Nav = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/settings">
      <Settings />
    </Route>

    <Redirect to="/" />
  </Switch>
)

export default Nav
