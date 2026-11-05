package com.prat.visita.presentation;

import com.prat.visita.model.VisitaMedica;
import com.prat.visita.service.VisitaMedicaService;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class MenuConsola {
    private final VisitaMedicaService service;
    private final Scanner scanner = new Scanner(System.in);

    public MenuConsola(VisitaMedicaService service) {
        this.service = service;
    }

    public void iniciar() {
        int opcio;
        do {
            mostrarMenu();
            opcio = llegirOpcio();
            processarOpcio(opcio);
        } while (opcio != 0);
    }

    private void mostrarMenu() {
        System.out.println("\n--- GESTIÓ DE VISITES MÈDIQUES ---");
        System.out.println("1. Llistar totes les visites");
        System.out.println("2. Buscar visita per ID");
        System.out.println("3. Afegir nova visita");
        System.out.println("4. Actualitzar visita existent");
        System.out.println("5. Eliminar visita per ID");
        System.out.println("0. Sortir");
        System.out.print("Escull una opció: ");
    }

    private int llegirOpcio() {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private void processarOpcio(int opcio) {
        switch (opcio) {
            case 1 -> llistarTotes();
            case 2 -> buscarPerId();
            case 3 -> afegirVisita();
            case 4 -> actualitzarVisita();
            case 5 -> eliminarVisita();
            case 0 -> System.out.println("Fins aviat!");
            default -> System.out.println("Opció no vàlida.");
        }
    }

    private void llistarTotes() {
        List<VisitaMedica> visites = service.llistarTotes();
        if (visites.isEmpty()) {
            System.out.println("No hi ha visites registrades.");
        } else {
            System.out.println("\nLLISTAT DE VISITES:");
            visites.forEach(System.out::println);
        }
    }

    private void buscarPerId() {
        System.out.print("Introdueix l'ID de la visita: ");
        try {
            int id = Integer.parseInt(scanner.nextLine());
            Optional<VisitaMedica> opt = service.buscarPerId(id);
            if (opt.isPresent()) {
                System.out.println("Visita trobada:");
                System.out.println(opt.get());
            } else {
                System.out.println("No s'ha trobat cap visita amb aquest ID.");
            }
        } catch (NumberFormatException e) {
            System.out.println("ID no vàlid.");
        }
    }

    private void afegirVisita() {
        try {
            System.out.println("Introdueix les dades de la nova visita:");
            System.out.print("Nom del pacient: ");
            String pacient = scanner.nextLine();
            System.out.print("Nom del metge: ");
            String metge = scanner.nextLine();
            System.out.print("Data (aaaa-mm-dd): ");
            LocalDate data = LocalDate.parse(scanner.nextLine());
            System.out.print("Diagnòstic: ");
            String diagnostic = scanner.nextLine();

            VisitaMedica nova = new VisitaMedica(pacient, metge, data, diagnostic);
            service.guardarVisita(nova);
            System.out.println("Visita afegida correctament amb ID: " + nova.getIdVisita());
        } catch (DateTimeParseException e) {
            System.out.println("Format de data incorrecte. Utilitza aaaa-mm-dd.");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    private void actualitzarVisita() {
        System.out.print("Introdueix l'ID de la visita a actualitzar: ");
        try {
            int id = Integer.parseInt(scanner.nextLine());
            Optional<VisitaMedica> opt = service.buscarPerId(id);
            if (opt.isEmpty()) {
                System.out.println("No existeix una visita amb aquest ID.");
                return;
            }
            VisitaMedica v = opt.get();
            System.out.println("Dades actuals: " + v);
            System.out.println("Deixa en blanc per mantenir el valor actual.");

            System.out.print("Nom del pacient [" + v.getNomPacient() + "]: ");
            String pacient = scanner.nextLine();
            if (!pacient.trim().isEmpty()) v.setNomPacient(pacient);

            System.out.print("Nom del metge [" + v.getNomMetge() + "]: ");
            String metge = scanner.nextLine();
            if (!metge.trim().isEmpty()) v.setNomMetge(metge);

            System.out.print("Data (aaaa-mm-dd) [" + v.getData() + "]: ");
            String dataStr = scanner.nextLine();
            if (!dataStr.trim().isEmpty()) {
                try {
                    v.setData(LocalDate.parse(dataStr));
                } catch (DateTimeParseException e) {
                    System.out.println("Format incorrecte, es manté la data actual.");
                }
            }

            System.out.print("Diagnòstic [" + v.getDiagnostic() + "]: ");
            String diagnostic = scanner.nextLine();
            if (!diagnostic.trim().isEmpty()) v.setDiagnostic(diagnostic);

            service.guardarVisita(v);
            System.out.println("Visita actualitzada correctament.");
        } catch (NumberFormatException e) {
            System.out.println("ID no vàlid.");
        }
    }

    private void eliminarVisita() {
        System.out.print("Introdueix l'ID de la visita a eliminar: ");
        try {
            int id = Integer.parseInt(scanner.nextLine());
            service.eliminarPerId(id);
            System.out.println("Visita eliminada (si existia).");
        } catch (NumberFormatException e) {
            System.out.println("ID no vàlid.");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}