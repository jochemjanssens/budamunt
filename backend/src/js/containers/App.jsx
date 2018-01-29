import React from 'react';
import {object} from 'prop-types';

import {observe} from 'mobx';
// import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Registreer from './Registreer';
import RegistreerOrganisatie from './RegistreerOrganisatie';
import RegistreerHandelaar from './RegistreerHandelaar';

import Events from './Events';
import AddEvent from './AddEvent';
import Vrijwilligers from './Vrijwilligers';
import AddVolunteer from './AddVolunteer';

import store from '../stores/store';

const App = ({history}) => {

  observe(store, `token`, change => {
    if (change.newValue && change.newValue.length > 0) {
      store.timeline();
      history.push(`/home`);
    }
  });

  const {token} = store;
  return (
    <section>

      {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

      <section>
        <Switch>
          <Route
            exact path='/'
            component={Login}
          />
          <Route
            exact path='/home'
            render={() => {
              if (!token || token.length === 0) {
                return <Redirect to='/' />;
              }
              return <Home />;
            }}
          />
          <Route
            path='/registreer'
            component={Registreer}
          />
          <Route
            path='/RegistreerOrganisatie'
            component={RegistreerOrganisatie}
          />
          <Route
            path='/events'
            component={Events}
          />
          <Route
            path='/vrijwilligers'
            component={Vrijwilligers}
          />
          <Route
            path='/Nieuwevent'
            component={AddEvent}
          />
          <Route
            path='/Nieuwvrijwilligerswerk'
            component={AddVolunteer}
          />
          <Route
            path='/RegistreerHandelaar'
            component={RegistreerHandelaar}
          />
        </Switch>
      </section>

    </section>

  );
};

App.propTypes = {
  history: object.isRequired
};

export default withRouter(App);
