package com.secretary.secretaryapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity(name="Appointment")
public class Appointment {
    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "personID")
    private long personID;

    @Column(name = "date")
    private String date;

    @Column(name = "time")
    private String time;



    public Appointment( @JsonProperty("personID") long personID,@JsonProperty("date") String date,@JsonProperty("time") String time){
        this.personID= personID;
        this.date= date;
        this.time= time;
    }

    public Appointment() {

    }

    public void setId(long id) {
        this.id = id;
    }

    public void setPersonID(long personID) {
        this.personID = personID;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public long getId() {
        return id;
    }

    public long getPersonID() {
        return personID;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

}
