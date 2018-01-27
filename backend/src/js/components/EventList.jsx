/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import {PropTypes} from 'mobx-react';

const EventList = ({events}) => {

  console.log(events.length);

  for (let dayIndex = 0;dayIndex < events.length;dayIndex ++) {
    console.log(events[dayIndex].name);
  }

  return (
    <ul>
      {
        events.map(
          event => (
            <p key={event._id}>{event.date} - {event.name} - {event.location} - {event.description}</p>
          )
        )
      }
    </ul>
  );
};

EventList.propTypes = {
  events: PropTypes.observableObject.isRequired,
};

export default EventList;
