import http from './http-common';
import axios from "axios";

class ClientDataService {
  getAll() {
    return http.get("/clients/all");
  }
  getClient(id) {
    return http.get(`/clients/${id}`);
  }
  
  postClient(firstName, lastName, licensePlate, email, phoneNumber) {
    return axios.post(`/clients/add`, {
      firstName,
      lastName,
      email,
      licensePlate,
      phoneNumber
    });
  }


  updateClient(id, data) {
    return http.put(`/clients/update/${id}`, data);
  }
  deleteClient(id) {
    return http.delete(`/clients/delete/${id}`);
  }
  deleteClients() {
    return http.delete("/clients/deleteAll");
  }

  sendEmail(email) {
    return http.post(`/clients/sendmail/${email}`);
  }

}
export default new ClientDataService();

