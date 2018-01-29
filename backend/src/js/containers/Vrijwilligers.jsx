import React from 'react';
import {Link} from 'react-router-dom';

import VolunteerList from '../components/VolunteerList';

import {Redirect} from 'react-router';


import {observer, inject, PropTypes} from 'mobx-react';

const Vrijwilligers = ({store}) => {

  const {
    loadVolunteers,
    volunteers,
    currentUser
  } = store;

  loadVolunteers();

  if (volunteers === ``) {
    return (
      <Redirect to='/' />
    );
  }

  if (volunteers === `empty`) {
    return (
      <section>
        <header>
          <h1>Vrijwilligerswerk</h1>
        </header>
        <p>Nog geen Vrijwilligerswerk toegevoegd</p>
        <Link to='/Nieuwvrijwilligerswerk'>Vrijwilligerswerk toevoegen</Link>
        <Link to='/Home'>Home</Link>
      </section>
    );
  }

  return (

    <section>
      <header>
        <h1>Vrijwilligerswerk</h1>
      </header>
      <VolunteerList volunteers={volunteers} user={currentUser} />
      <Link to='/Nieuwvrijwilligerswerk'>Vrijwilligerswerk toevoegen</Link>
      <Link to='/Home'>Home</Link>
    </section>
  );
};

Vrijwilligers.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(Vrijwilligers)
);
