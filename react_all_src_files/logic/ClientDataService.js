import http from './http-common';

class ClientDataService{
     getAll(){
         return http.get("/clients/all");
     }
     getClient(id){
       return http.get(`/clients/${id}`);
     }
     postClient(data){
       return http.post("/clients/add" , data);
     }
     updateClient(id, data){
       return http.put(`/clients/update/${id}` , data);
     }
     deleteClient(id){
       return http.delete(`/clients/delete/${id}`);
     }
     deleteClients(){
         return http.delete("/clients/deleteAll");
     }

 }
export default new ClientDataService();

