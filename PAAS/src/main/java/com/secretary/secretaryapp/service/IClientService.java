package com.secretary.secretaryapp.service;

import com.secretary.secretaryapp.model.Client;

import java.util.List;
import java.util.Optional;

public interface IClientService {
    List<Client> findAll();
    Optional<Client> findById(Long id);
    void deleteById(Long id);
    void deleteAll();
    Client save(Client client);
}
