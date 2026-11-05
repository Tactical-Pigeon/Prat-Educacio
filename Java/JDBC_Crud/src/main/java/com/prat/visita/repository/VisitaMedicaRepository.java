package com.prat.visita.repository;

import com.prat.visita.model.VisitaMedica;
import java.util.List;
import java.util.Optional;

public interface VisitaMedicaRepository {
    VisitaMedica save(VisitaMedica visita);
    Optional<VisitaMedica> findById(int id);
    List<VisitaMedica> findAll();
    void deleteById(int id);
    boolean existsById(int id);
}