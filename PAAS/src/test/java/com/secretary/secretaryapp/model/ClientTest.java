package com.secretary.secretaryapp.model;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class ClientTest {
    Client sampleClient;
    @BeforeEach
    void setUp() {
        long id=0;
        sampleClient= new Client().setId(id).setEmail("ludiq@gmail.com").setFirstName("Lo6o Jaki").setLastName("Tonkata").setPhoneNumber("123456789").setLicensePlate("10-KUR-0");

    }

    @AfterEach
    void tearDown() {}

    @Test
    void getId() {
        assertEquals(0, sampleClient.getId());
    }

    @Test
    void setId() {
        sampleClient.setId((long) 6);
        assertEquals(6, sampleClient.getId());
    }


    @Test
    void getFirstName() {
        assertEquals("Lo6o Jaki", sampleClient.getFirstName());
    }

    @Test
    void setFirstName() {
        sampleClient.setFirstName("michael");
        assertEquals("michael", sampleClient.getFirstName());
    }

    @Test
    void getLastName() {
        assertEquals("Tonkata", sampleClient.getLastName());
    }

    @Test
    void setLastName() {
        sampleClient.setLastName("ivanov");
        assertEquals("ivanov", sampleClient.getLastName());
    }

    @Test
    void getEmail() {
        assertEquals("ludiq@gmail.com", sampleClient.getEmail());
    }

    @Test
    void setEmail() {
        sampleClient.setEmail("michael@gmail.com");
        assertEquals("michael@gmail.com", sampleClient.getEmail());
    }

    @Test
    void getLicensePlate() {
        assertEquals("10-KUR-0", sampleClient.getLicensePlate());
    }

    @Test
    void setLicensePlate() {
        sampleClient.setLicensePlate("27-KUR-7");
        assertEquals("27-KUR-7", sampleClient.getLicensePlate());
    }

    @Test
    void getPhoneNumber() {
        assertEquals("123456789", sampleClient.getPhoneNumber());
    }

    @Test
    void setPhoneNumber() {
        sampleClient.setPhoneNumber("23535245");
        assertEquals("23535245", sampleClient.getPhoneNumber());
    }
}