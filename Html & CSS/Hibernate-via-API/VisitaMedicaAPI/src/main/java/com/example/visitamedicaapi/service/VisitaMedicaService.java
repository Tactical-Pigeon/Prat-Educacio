package com.example.visitamedicaapi.service;

import com.example.visitamedicaapi.entity.VisitaMedica;
import com.example.visitamedicaapi.repository.VisitaMedicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisitaMedicaService {

    @Autowired
    private VisitaMedicaRepository repository;

    public List<VisitaMedica> getAll() {
        return repository.findAll();
    }

    public Optional<VisitaMedica> getById(Integer id) {
        return repository.findById(id);
    }

    public VisitaMedica save(VisitaMedica visita) {
        return repository.save(visita);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public boolean exists(Integer id) {
        return repository.existsById(id);
    }
}