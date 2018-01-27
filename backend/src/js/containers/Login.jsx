import React from 'react';
import {Link} from 'react-router-dom';

import LoginComponent from '../components/Login';

const Login = () => (
  <section>
    <header><h1>Login</h1></header>
    <LoginComponent />

    <Link to='/Registreer'>Nog geen account, registreer</Link>
  </section>
);

export default Login;
