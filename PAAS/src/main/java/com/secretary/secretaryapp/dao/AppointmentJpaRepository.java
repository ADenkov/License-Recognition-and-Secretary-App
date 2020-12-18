package com.secretary.secretaryapp.dao;

import com.secretary.secretaryapp.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentJpaRepository extends JpaRepository<Appointment, Long> {
    Optional<Appointment> findByDate(String date);
    List<Appointment> findAllByDate(String date);
}
