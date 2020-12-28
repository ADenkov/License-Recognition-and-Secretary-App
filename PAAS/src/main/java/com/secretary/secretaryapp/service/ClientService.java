package com.secretary.secretaryapp.service;

import com.secretary.secretaryapp.dao.ClientDao;
import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service

public class ClientService implements IClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Override
    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
clientRepository.deleteAll();
    }

    @Override
    public Client save(Client client) {
        return clientRepository.save(client);
    }

//
//    public Collection<Client> getAllClients(){
//        return  this.clientDao.getAllClients();
//    }
//    public  Client getClientById(int id){
//        return this.clientDao.getClientById(id);
//    }

}
