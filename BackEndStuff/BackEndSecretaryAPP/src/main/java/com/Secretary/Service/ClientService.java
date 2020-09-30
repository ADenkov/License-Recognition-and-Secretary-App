package com.Secretary.Service;

import com.Secretary.Dao.ClientDao;
import com.Secretary.Entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
@Service

public class ClientService {
    @Autowired

    private ClientDao clientDao;

    public Collection<Client> getAllClients(){
        return  this.clientDao.getAllClients();
    }
    public  Client getClientById(int id){
        return this.clientDao.getClientById(id);
    }

}
