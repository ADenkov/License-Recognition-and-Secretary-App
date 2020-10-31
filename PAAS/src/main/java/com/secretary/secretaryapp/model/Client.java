package com.secretary.secretaryapp.model;

import javax.persistence.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Entity
//        (name = "Clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
//            (name = "client_id")
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name="license_plate", length = 8, unique = true)
    private String licensePlate;

    @Column(name = "phone_number", length = 13, unique = true)
    private String phoneNumber;

    public Client(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Client setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Client setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Client setEmail(String email) {
            this.email = email;
        return this;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public Client setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Client setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", licensePlate='" + licensePlate + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
