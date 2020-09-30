package com.Secretary.Dao;

import com.Secretary.Entity.Client;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;


@Repository

public class ClientDao {

  private static Map<Integer, Client> clients;

  static{
      clients = new HashMap<Integer, Client>(){
          {
              put(1, new Client(1, "Konstantin", "32424324324"));
              put(2, new Client(2, "Jaklin", "1232132131"));
              put(3, new Client(3, "Filev", "1313213214"));
          }
      };
  }

  public Collection<Client> getAllClients(){
      return  this.clients.values();
  }

  public  Client getClientById(int id){
      return this.clients.get(id);
    }
}
