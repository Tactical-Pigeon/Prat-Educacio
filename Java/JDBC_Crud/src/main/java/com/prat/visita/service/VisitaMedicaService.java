package com.prat.visita.service;

import com.prat.visita.model.VisitaMedica;
import com.prat.visita.repository.VisitaMedicaRepository;
import java.util.List;
import java.util.Optional;

public class VisitaMedicaService {
    private final VisitaMedicaRepository repository;

    public VisitaMedicaService(VisitaMedicaRepository repository) {
        this.repository = repository;
    }

    public VisitaMedica guardarVisita(VisitaMedica visita) {
        if (visita.getNomPacient() == null || visita.getNomPacient().trim().isEmpty()) {
            throw new IllegalArgumentException("El nom del pacient no pot estar buit");
        }
        return repository.save(visita);
    }

    public Optional<VisitaMedica> buscarPerId(int id) {
        return repository.findById(id);
    }

    public List<VisitaMedica> llistarTotes() {
        return repository.findAll();
    }

    public void eliminarPerId(int id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("No existeix cap visita amb aquest ID");
        }
        repository.deleteById(id);
    }

    public boolean existeix(int id) {
        return repository.existsById(id);
    }
}