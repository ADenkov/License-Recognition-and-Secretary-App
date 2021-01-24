import http from './http-common';

class ClientService {

    shutdown(){
        return http.get("clients/shutdown");
    }
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
       return http.put(`/clients/update/${id}`, data);
     }
     deleteClient(id){
       return http.delete(`/clients/delete/${id}`);
     }
     deleteClients(){
         return http.delete("/clients/deleteAll");
     }

    sendEmail(email){
        return http.post(`/clients/sendmail/${email}`);
    }
    makeAppointment(id,data){
      // console.log(id,data);
        return http.post(`/clients/makeAppointment/`+ id, data);
    }
    getAppointmentsForDate(date){
        // console.log(date);
        return http.get(`/clients/getAppointmentsForDate/${date}`);
    }

 }
export default new ClientService();

