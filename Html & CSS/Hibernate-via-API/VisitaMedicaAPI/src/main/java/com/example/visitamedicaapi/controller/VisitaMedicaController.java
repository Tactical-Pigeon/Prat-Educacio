package com.example.visitamedicaapi.controller;

import com.example.visitamedicaapi.entity.VisitaMedica;
import com.example.visitamedicaapi.service.VisitaMedicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitas")
public class VisitaMedicaController {

    @Autowired
    private VisitaMedicaService service;

    // GET all
    @GetMapping
    public List<VisitaMedica> getAll() {
        return service.getAll();
    }

    // GET by id
    @GetMapping("/{id}")
    public ResponseEntity<VisitaMedica> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create
    @PostMapping
    public ResponseEntity<VisitaMedica> create(@RequestBody VisitaMedica visita) {
        // The ID will be auto-generated, so ignore if provided
        visita.setIdVisita(null);
        VisitaMedica saved = service.save(visita);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT update
    @PutMapping("/{id}")
    public ResponseEntity<VisitaMedica> update(@PathVariable Integer id, @RequestBody VisitaMedica visita) {
        if (!service.exists(id)) {
            return ResponseEntity.notFound().build();
        }
        visita.setIdVisita(id);
        VisitaMedica updated = service.save(visita);
        return ResponseEntity.ok(updated);
    }

    // DELETE by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!service.exists(id)) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}