package com.secretary.secretaryapp.repository;

import com.secretary.secretaryapp.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
    public Client findByLicensePlate(String license_plate);
}
