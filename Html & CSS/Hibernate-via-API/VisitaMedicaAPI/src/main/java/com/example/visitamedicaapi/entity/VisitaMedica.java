package com.example.visitamedicaapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "VisitesMediques")   // Table name as required
public class VisitaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Visita", nullable = false)
    private Integer idVisita;

    @Column(name = "Nom_Pacient", nullable = false, length = 40)
    private String nomPacient;

    @Column(name = "Nom_Metge", nullable = false, length = 40)
    private String nomMetge;

    @Column(name = "Data", nullable = false)
    private LocalDate data;

    @Column(name = "Diagnostic", nullable = false, length = 250)
    private String diagnostic;

    // Constructors, getters, setters
    public VisitaMedica() {
    }

    public VisitaMedica(Integer idVisita, String nomPacient, String nomMetge, LocalDate data, String diagnostic) {
        this.idVisita = idVisita;
        this.nomPacient = nomPacient;
        this.nomMetge = nomMetge;
        this.data = data;
        this.diagnostic = diagnostic;
    }

    // Getters and setters
    public Integer getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(Integer idVisita) {
        this.idVisita = idVisita;
    }

    public String getNomPacient() {
        return nomPacient;
    }

    public void setNomPacient(String nomPacient) {
        this.nomPacient = nomPacient;
    }

    public String getNomMetge() {
        return nomMetge;
    }

    public void setNomMetge(String nomMetge) {
        this.nomMetge = nomMetge;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(String diagnostic) {
        this.diagnostic = diagnostic;
    }
}