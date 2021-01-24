package com.secretary.secretaryapp.repository;

import com.secretary.secretaryapp.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findByLicensePlate(String license_plate);
}
