package com.Secretary.Controller;

import com.Secretary.Entity.Client;
import com.Secretary.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;


@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})

public class ClientController {
    @Autowired
    private ClientService clientService;


    @RequestMapping(method = RequestMethod.GET)
    public Collection<Client> getAllClients() {
        return clientService.getAllClients();
    }

//    @RequestMapping(value = "/{id}", method = RequestMethod.GET ){
//        public Client getClientById(@PathVariable("id") int id){
//            return clientService.getClientById(id);
//        }
//    }
    @GetMapping(path = "/{id}")
        public Client getClientById(@PathVariable("id") int id){
        return clientService.getClientById(id);
    }


}
