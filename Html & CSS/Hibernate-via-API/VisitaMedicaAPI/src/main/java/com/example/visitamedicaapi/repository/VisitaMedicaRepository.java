package com.example.visitamedicaapi.repository;

import com.example.visitamedicaapi.entity.VisitaMedica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitaMedicaRepository extends JpaRepository<VisitaMedica, Integer> {
    // No extra methods needed for basic CRUD
}