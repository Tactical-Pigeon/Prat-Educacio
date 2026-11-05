package lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain;

public class VisitaMedicaLog {
    private String algoritme; // AES, MD5, SHA-256
    private String accio;     // xifrat, desxifrat, hash
    private VisitaMedica visita;

    public VisitaMedicaLog() {}

    public VisitaMedicaLog(String algoritme, String accio, VisitaMedica visita) {
        this.algoritme = algoritme;
        this.accio = accio;
        this.visita = visita;
    }

    public String getAlgoritme() { return algoritme; }
    public void setAlgoritme(String algoritme) { this.algoritme = algoritme; }
    public String getAccio() { return accio; }
    public void setAccio(String accio) { this.accio = accio; }
    public VisitaMedica getVisita() { return visita; }
    public void setVisita(VisitaMedica visita) { this.visita = visita; }

    @Override
    public String toString() {
        return "VisitaMedicaLog{" +
                "algoritme='" + algoritme + '\'' +
                ", accio='" + accio + '\'' +
                ", visita=" + (visita==null?"null":visita.toString()) +
                '}';
    }
}
