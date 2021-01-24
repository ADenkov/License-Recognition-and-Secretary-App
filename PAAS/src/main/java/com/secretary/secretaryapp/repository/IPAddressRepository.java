package com.secretary.secretaryapp.repository;

import com.secretary.secretaryapp.model.IPAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPAddressRepository extends JpaRepository<IPAddress, Long> {
}
