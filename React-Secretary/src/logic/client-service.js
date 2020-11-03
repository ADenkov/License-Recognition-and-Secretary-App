import React from 'react';
import Http from './http-common';


 export  const getAll = () => {
    Http.get("/clients/all")
  }
  // getClient(id){
  //   return Http.get("/clients/${id}")
  // }
  // postClient(data){
  //   return Http.post("/clients/add" , data);
  // }
  // updateClient(id, data){
  //   return Http.put("/clients/update/${id}" , data);
  // }
  // deleteClient(id){
  //   return Http.delete("/clients/delete/${id}");
  // }

// export default getAll;