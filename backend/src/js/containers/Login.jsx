import React from 'react';
import {Link} from 'react-router-dom';

import LoginComponent from '../components/Login';

const Login = () => (
  <section>
    <header><h1>Login</h1></header>
    <LoginComponent />

    <Link to='/Registreer'>Nog geen account, registreer</Link>
    <Link to='/RegistreerOrganisatie'>Maak een organisatieaccount</Link>
    <Link to='/RegistreerHandelaar'>Maak een handelaarsaccount</Link>

  </section>
);

export default Login;
