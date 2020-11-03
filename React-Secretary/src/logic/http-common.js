import React from 'react';
import Axios from 'axios';

export default Axios.create({
  baseURL:"http://localhost:8080", 
  headers: {
    "content-type": "application/json"
  }
});
