package lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.service;

import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedica;
import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.repository.VisitaMedicaLogRepository;

public class VisitaMedicaService {
    private final VisitaMedicaLogRepository repo;
    private final MD5SecurityService md5 = new MD5SecurityService();
    private final SHA256SecurityService sha256 = new SHA256SecurityService();
    private final AESSecurityService aes = new AESSecurityService();

    public VisitaMedicaService(VisitaMedicaLogRepository repo){
        this.repo = repo;
    }

    public void valida(VisitaMedica v){
        if(v==null) throw new IllegalArgumentException("La visita no pot ser nul·la");
        if(v.getIdVisita()<=0) throw new IllegalArgumentException("IdVisita ha de ser > 0");
        if(isBlank(v.getNomPacient())) throw new IllegalArgumentException("NomPacient requerit");
        if(isBlank(v.getNomMetge())) throw new IllegalArgumentException("NomMetge requerit");
        if(v.getData()==null) throw new IllegalArgumentException("Data requerida");
        if(isBlank(v.getDiagnostic())) throw new IllegalArgumentException("Diagnòstic requerit");
    }

    private boolean isBlank(String s){ return s==null || s.trim().isEmpty(); }

    public VisitaMedica getHashedMD5(VisitaMedica v) throws Exception {
        valida(v);
        VisitaMedica c = copy(v);
        c.setNomPacient(md5.encripta(v.getNomPacient()));
        c.setDiagnostic(md5.encripta(v.getDiagnostic()));
        repo.addLog("MD5", "hash", c);
        return c;
    }

    public VisitaMedica getHashedSHA256(VisitaMedica v) throws Exception {
        valida(v);
        VisitaMedica c = copy(v);
        c.setNomPacient(sha256.encripta(v.getNomPacient()));
        c.setDiagnostic(sha256.encripta(v.getDiagnostic()));
        repo.addLog("SHA-256", "hash", c);
        return c;
    }

    public VisitaMedica getEncryptedAES(VisitaMedica v) throws Exception {
        valida(v);
        VisitaMedica c = copy(v);
        c.setNomPacient(aes.encripta(v.getNomPacient()));
        c.setDiagnostic(aes.encripta(v.getDiagnostic()));
        repo.addLog("AES", "xifrat", c);
        return c;
    }

    public VisitaMedica getDecryptedAES(VisitaMedica v) throws Exception {
        // assume v conté nomPacient i diagnostic en AES(Base64)
        VisitaMedica c = copy(v);
        c.setNomPacient(aes.desencripta(v.getNomPacient()));
        c.setDiagnostic(aes.desencripta(v.getDiagnostic()));
        repo.addLog("AES", "desxifrat", c);
        return c;
    }

    private VisitaMedica copy(VisitaMedica v){
        VisitaMedica c = new VisitaMedica();
        c.setIdVisita(v.getIdVisita());
        c.setNomPacient(v.getNomPacient());
        c.setNomMetge(v.getNomMetge());
        c.setData(v.getData());
        c.setDiagnostic(v.getDiagnostic());
        return c;
    }

    public java.util.List<lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedicaLog> getLogs(){
        return repo.getLogs();
    }
}
