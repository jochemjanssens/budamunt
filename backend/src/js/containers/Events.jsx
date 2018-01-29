import React from 'react';
import {Link} from 'react-router-dom';

import EventList from '../components/EventList';

import {Redirect} from 'react-router';


import {observer, inject, PropTypes} from 'mobx-react';

const Events = ({store}) => {

  const {
    loadEvents,
    events,
    currentUser
  } = store;

  loadEvents();

  console.log(events);

  if (events === ``) {
    return (
      <Redirect to='/' />
    );
  }

  if (events === `empty`) {
    return (
      <section>
        <header>
          <h1>Events</h1>
        </header>
        <p>Nog geen events toegevoegd</p>
        <Link to='/Nieuwevent'>Eventment toevoegen</Link>
        <Link to='/Home'>Home</Link>
      </section>
    );
  }

  return (

    <section>
      <header>
        <h1>Events</h1>
      </header>
      <EventList events={events} user={currentUser} />
      <Link to='/Nieuwevent'>Eventment toevoegen</Link>
      <Link to='/Home'>Home</Link>
    </section>
  );
};

Events.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(Events)
);
