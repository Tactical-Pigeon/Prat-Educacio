package lorza.gerard.dam.mp09.uf01.pr2.seguretat.controller;

import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedica;
import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.repository.VisitaMedicaLogRepository;
import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.service.VisitaMedicaService;
import lorza.gerard.dam.mp09.uf01.pr2.seguretat.view.console.VisitaMedicaView;

public class VisitaMedicaController {
    private final VisitaMedicaView view;
    private final VisitaMedicaService service;

    public VisitaMedicaController(){
        this.view = new VisitaMedicaView();
        this.service = new VisitaMedicaService(new VisitaMedicaLogRepository());
    }

    public void inici(){
        boolean seguir = true;
        while(seguir){
            try{
                VisitaMedica v = view.demanaVisita();

                view.mostraMissatge("--- MD5 (hash) ---", false);
                view.mostraVisita(service.getHashedMD5(v));

                view.mostraMissatge("--- SHA-256 (hash) ---", false);
                view.mostraVisita(service.getHashedSHA256(v));

                view.mostraMissatge("--- AES xifrat ---", false);
                VisitaMedica enc = service.getEncryptedAES(v);
                view.mostraVisita(enc);

                view.mostraMissatge("--- AES desxifrat ---", false);
                view.mostraVisita(service.getDecryptedAES(enc));

                view.mostraMissatge("--- LOGS ---", false);
                view.mostraLogs(service.getLogs());
            }catch(Exception e){
                view.mostraMissatge("Error: "+e.getMessage(), true);
            }
            seguir = view.mesDades();
        }
    }
}
