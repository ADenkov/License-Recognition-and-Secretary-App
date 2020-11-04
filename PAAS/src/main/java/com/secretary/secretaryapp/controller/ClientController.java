package com.secretary.secretaryapp.controller;


import com.secretary.secretaryapp.email.EmailService;
import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping("/clients")
@CrossOrigin(origins = {"*", "*"})
public class ClientController {
@Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmailService emailService;


    @GetMapping("/all")
    public @ResponseBody List<Client> getAllClients() {
       return clientRepository.findAll();
//        try {
//            List<Client> users = new ArrayList<Client>();
//            clientRepository.findAll().forEach(users::add);
//            if (users.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(users, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id") long id) {
        Optional<Client> clientData = clientRepository.findById(id);

        return clientData.map(client -> new ResponseEntity<>(client, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        try {
            clientRepository.save(client);
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable("id") long id, @RequestBody Client client) {
        Optional<Client> clientData = clientRepository.findById(id);

        if (clientData.isPresent()) {
            Client _client = clientData.get();
            _client.setFirstName(client.getFirstName());
            _client.setLastName(client.getLastName());
            _client.setEmail(client.getEmail());
            _client.setLicensePlate(client.getLicensePlate());
            _client.setPhoneNumber(client.getPhoneNumber());
            clientRepository.save(_client);
            return new ResponseEntity<>(_client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteClient(@PathVariable("id") long id) {
        try {
            clientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAllClients() {
        try {
            clientRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/sendmail/{email}")
    public ResponseEntity<HttpStatus> sendmail(@PathVariable("email") String email) {

        try{
            emailService.sendMail(email, "Parking Spot", "Your Parking spot is...");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(MailSendException s){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
