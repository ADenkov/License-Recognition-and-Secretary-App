package com.secretary.secretaryapp.service;

import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
