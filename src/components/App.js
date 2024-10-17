import React, { useEffect, useReducer, useState } from 'react';
import Main from './Main';
import LoginForm from './LoginForm'
import useAuth from '../hooks/useAuth'

const App = () => {
const [user] = useAuth();
  return (  
     
     <div>
      {
        user?<Main/>:<LoginForm/>
      }
     </div>
  );
};

export default App;

