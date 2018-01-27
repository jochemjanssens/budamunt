import React from 'react';
import {Link} from 'react-router-dom';

import EventList from '../components/EventList';

import {observer, inject, PropTypes} from 'mobx-react';

const Events = ({store}) => {

  const {
    loadEvents,
    events,
    currentUser
  } = store;

  loadEvents();

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
