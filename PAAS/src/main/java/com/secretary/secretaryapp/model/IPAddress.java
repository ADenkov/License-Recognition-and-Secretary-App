package com.secretary.secretaryapp.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class IPAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "ip_address")
    String ip;

    @Column(name = "entered")
    LocalDate entered;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public LocalDate getEntered() {
        return entered;
    }

    public void setEntered(LocalDate entered) {
        this.entered = entered;
    }

    @Override
    public String toString() {
        return "IPAddress{" +
                "id=" + id +
                ", ip='" + ip + '\'' +
                ", entered=" + entered +
                '}';
    }
}
