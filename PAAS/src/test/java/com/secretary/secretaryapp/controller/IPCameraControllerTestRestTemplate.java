package com.secretary.secretaryapp.controller;

import com.secretary.secretaryapp.message.ResponseMessage;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT )
public class IPCameraControllerTestRestTemplate {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void uploadFile(){

        ResponseEntity<ResponseMessage> response = restTemplate.getForEntity("/upload",ResponseMessage.class);
        ResponseMessage responseMessage = response.getBody();

        assertEquals(HttpStatus.OK,response.getStatusCode());
    }
}
