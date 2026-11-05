package com.prat.visita;

import com.prat.visita.presentation.MenuConsola;
import com.prat.visita.repository.JdbcVisitaMedicaRepository;
import com.prat.visita.repository.VisitaMedicaRepository;
import com.prat.visita.service.VisitaMedicaService;

public class Main {
    public static void main(String[] args) {
        VisitaMedicaRepository repository = new JdbcVisitaMedicaRepository();
        VisitaMedicaService service = new VisitaMedicaService(repository);
        MenuConsola menu = new MenuConsola(service);
        menu.iniciar();
    }
}