package com.secretary.secretaryapp.controller;

import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.repository.ClientRepository;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class ClientControllerTest {
    @Autowired
    private ClientController clientController;

    @MockBean
    private ClientRepository clientRepository;

    List<Client> clients;

    @BeforeEach
    public void setUp() {
        clients = Arrays.asList(
                new Client().setEmail("sdfh@gmail.com"),
                new Client().setFirstName("Stefan"),
                new Client().setLastName("Georgiev"),
                new Client().setPhoneNumber("0987654321"),
                new Client().setLicensePlate("Nl 3456 Pl")
        );
    }

    @AfterEach void tearDown() {}

    @Test
    void getAllClientsWhenThereAreNone() {
        List<Client> actual = clientController.getAllClients();
        assertEquals(new ArrayList<Client>(), actual);
    }
    @Test
    void getAllClientsWhenThereAreSome() {
        Mockito.when(clientRepository.findAll()).thenReturn(clients);
        List<Client> actual = clientController.getAllClients();
        assertEquals(clients, actual);
    }
    @Test
    void createNewValidClient(){
        Client client = clients.get(0);

        Mockito.when(clientRepository.save(client)).thenReturn(client);

        ResponseEntity<Client> response = clientController.createClient(client);

        assertEquals(client, response.getBody());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Mockito.verify(clientRepository).save(client);
    }
    @Test
    void userNotFound(){

        Mockito.when(clientRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        ResponseEntity<Client> response = clientController.getClientById(78);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test void deleteActualUser(){
        Client client = clients.get(0);
        Mockito.when(clientRepository.findById(client.getId())).thenReturn(Optional.empty()); //expect a fetch, return a "fetched" person;

        clientRepository.delete(client);

        Mockito.verify(clientRepository).delete(client);
    }
}