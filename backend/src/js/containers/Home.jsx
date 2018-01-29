import React from 'react';
import {Link} from 'react-router-dom';

import {observer, inject, PropTypes} from 'mobx-react';

const Home = ({store}) => {

  const {
    userInformation,
    organisationInformation,
    storeInformation,
    userType
  } = store;

  if (userType === `ORGANISATIE`) {
    console.log(organisationInformation);
    return (
      <section>
        <header>
          <h1>Home</h1>
        </header>
        <p>Welkom {organisationInformation.organisatie}</p>
        <Link to='/Events'>Events</Link>
        <Link to='/Vrijwilligers'>Vrijwilligerswerk</Link>
      </section>
    );
  } else if (userType === `STORE`) {
    console.log(storeInformation);
    return (
      <section>
        <header>
          <h1>Home</h1>
        </header>
        <p>Welkom {storeInformation.store}</p>
        <Link to='/Events'>Events</Link>
        <Link to='/Vrijwilligers'>Vrijwilligerswerk</Link>
      </section>
    );
  }

  console.log(userInformation);
  return (
    <section>
      <header>
        <h1>Home</h1>
      </header>
      <p>Welkom {userInformation.firstname}</p>
      <Link to='/Events'>Events</Link>
      <Link to='/Vrijwilligers'>Vrijwilligerswerk</Link>
    </section>
  );
};

Home.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject(`store`)(
  observer(Home)
);
