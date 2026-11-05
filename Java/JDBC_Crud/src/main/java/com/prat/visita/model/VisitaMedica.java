package com.prat.visita.model;

import java.time.LocalDate;

public class VisitaMedica {
    private int idVisita;
    private String nomPacient;
    private String nomMetge;
    private LocalDate data;
    private String diagnostic;

    public VisitaMedica() {}

    public VisitaMedica(String nomPacient, String nomMetge, LocalDate data, String diagnostic) {
        this.nomPacient = nomPacient;
        this.nomMetge = nomMetge;
        this.data = data;
        this.diagnostic = diagnostic;
    }

    public VisitaMedica(int idVisita, String nomPacient, String nomMetge, LocalDate data, String diagnostic) {
        this.idVisita = idVisita;
        this.nomPacient = nomPacient;
        this.nomMetge = nomMetge;
        this.data = data;
        this.diagnostic = diagnostic;
    }

    public int getIdVisita() { return idVisita; }
    public void setIdVisita(int idVisita) { this.idVisita = idVisita; }

    public String getNomPacient() { return nomPacient; }
    public void setNomPacient(String nomPacient) { this.nomPacient = nomPacient; }

    public String getNomMetge() { return nomMetge; }
    public void setNomMetge(String nomMetge) { this.nomMetge = nomMetge; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public String getDiagnostic() { return diagnostic; }
    public void setDiagnostic(String diagnostic) { this.diagnostic = diagnostic; }

    @Override
    public String toString() {
        return String.format("ID: %d | Pacient: %s | Metge: %s | Data: %s | Diagnòstic: %s",
                idVisita, nomPacient, nomMetge, data, diagnostic);
    }
}