package com.secretary.secretaryapp.controller;


//import com.secretary.secretaryapp.email.EmailService;
//import com.secretary.secretaryapp.message.ResponseMessage;
//import com.secretary.secretaryapp.model.Client;
//import com.secretary.secretaryapp.repository.ClientRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.mail.MailSendException;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class ClientService {
//    @Autowired
//    ClientRepository clientRepository;
//
//    @Autowired
//    EmailService emailService;
//
//    public ResponseEntity<?> checkFrame(String licensePlate){
//        System.out.println(clientRepository.getOne(1L));
//        System.exit(0);
//        try {
//            Client client = clientRepository.findByLicensePlate(licensePlate);
//            if (client != null)
//            {
//                System.out.println(client.toString());
//                try{
//                    emailService.sendMail(client.getEmail(), "Parking Spot", "Your Parking spot is...");
//                }catch(MailSendException s){
//                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error sending email to client, please try again!"));
//                }
//            }
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("License plate number recognized as: " + licensePlate));
//        }
//        catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
//        }
//    }
//
//}
