import React from 'react';
import {Link} from 'react-router-dom';


const Home = () => (
  <section>
    <header>
      <h1>Home</h1>
    </header>
    <Link to='/Events'>Events</Link>
    <Link to='/Vrijwilligers'>Vrijwilligerswerk</Link>
  </section>
);

export default Home;
