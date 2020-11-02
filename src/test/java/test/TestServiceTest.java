package test;

import com.secretary.secretaryapp.model.Client;
import com.secretary.secretaryapp.model.TestService;
import com.secretary.secretaryapp.repository.ClientRepository;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

//@ExtendWith(MockitoExtension.class)
//@SpringBootTest
@DataJpaTest
public class TestServiceTest {


    @Autowired
    private ClientRepository clientRepository;

    @Test
    public void testGetALlClients(){
        List<Client> clients=new ArrayList<>();
        Client c = new Client();
        c.setId(1);
        c.setPhoneNumber("4235615342");
        c.setLicensePlate("KURZACSKA");
        c.setEmail("alo@pronto.bg");
        c.setFirstName("Ivan");
        c.setLastName("Shishman");
        clients.add(c);
        when(clientRepository.findAll()).thenReturn(clients);
        TestService testService = new TestService();
        List<Client> result = testService.getAllClients();
        assertArrayEquals(clients.toArray(), result.toArray());

    }

    @Test
    @Rollback(false)
    public void testRegisterClient(){
        Client c = new Client();
        c.setId(1);
        c.setPhoneNumber("4235615342");
        c.setLicensePlate("KURZACSKA");
        c.setEmail("alo@pronto.bg");
        c.setFirstName("Ivan");
        c.setLastName("Shishman");
        Client savedClient = clientRepository.save(c);

        assertThat(savedClient.getId()).isGreaterThan(0);

    }
}