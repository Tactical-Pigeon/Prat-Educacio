package lorza.gerard.dam.mp09.uf01.pr2.seguretat.view.console;

import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedica;
import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedicaLog;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class VisitaMedicaView {
    private final Scanner sc = new Scanner(System.in);

    public VisitaMedica demanaVisita(){
        System.out.print("IdVisita (enter número): ");
        int id = Integer.parseInt(sc.nextLine().trim());
        System.out.print("Nom del pacient: ");
        String np = sc.nextLine();
        System.out.print("Nom del metge: ");
        String nm = sc.nextLine();
        System.out.print("Data (YYYY-MM-DD): ");
        LocalDate d = LocalDate.parse(sc.nextLine().trim());
        System.out.print("Diagnòstic: ");
        String dg = sc.nextLine();
        return new VisitaMedica(id, np, nm, d, dg);
    }

    public void mostraVisita(VisitaMedica v){
        System.out.println(v);
    }

    public void mostraMissatge(String msg, boolean esError){
        if(esError) System.err.println(msg); else System.out.println(msg);
    }

    public boolean mesDades(){
        System.out.print("Vols introduir més dades? (true/false): ");
        return Boolean.parseBoolean(sc.nextLine().trim());
    }

    public void mostraLogs(List<VisitaMedicaLog> logs){
        for(VisitaMedicaLog l: new ArrayList<>(logs)){
            System.out.println(l.toString());
        }
    }
}
