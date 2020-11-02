package com.secretary.secretaryapp.model;

import com.secretary.secretaryapp.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TestService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients(){
        return (List<Client>) clientRepository.findAll();   // MAQ NI KAZA
    }
}
