/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {observer, inject, PropTypes} from 'mobx-react';

const EventList = ({events, store}) => {
  const {
    currentUser
  } = store;

  return (
    <ul>
      {
        events.map(
          event => (
            <p key={event._id} className={(currentUser === event.user) ? `own` : `other`}>{event.user} - {event.date} - {event.name} - {event.location} - {event.description}</p>
          )
        )
      }
    </ul>
  );
};

EventList.propTypes = {
  events: PropTypes.objectOrObservableObject.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(
  observer(EventList)
);
