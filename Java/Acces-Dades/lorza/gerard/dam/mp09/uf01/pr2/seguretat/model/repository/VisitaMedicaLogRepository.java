package lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.repository;

import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedica;
import lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain.VisitaMedicaLog;

import java.io.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class VisitaMedicaLogRepository {
    private static final List<VisitaMedicaLog> logs = new ArrayList<>();
    private static final File DATA_DIR = new File("data");
    private static final File JSON_FILE = new File(DATA_DIR, "visita_logs.json");

    public VisitaMedicaLogRepository(){
        if(!DATA_DIR.exists()) DATA_DIR.mkdirs();
    }

    public void addLog(String algoritme, String accio, VisitaMedica visita){
        logs.add(new VisitaMedicaLog(algoritme, accio, visita));
        save();
    }

    public List<VisitaMedicaLog> getLogs(){
        return new ArrayList<>(logs);
    }

    private void save(){
        // Escriure JSON sense dependències externes (simple, no escapem tots els caràcters especials)
        DateTimeFormatter fmt = DateTimeFormatter.ISO_LOCAL_DATE;
        StringBuilder sb = new StringBuilder();
        sb.append("[\n");
        for(int i=0;i<logs.size();i++){
            VisitaMedicaLog l = logs.get(i);
            VisitaMedica v = l.getVisita();
            sb.append("  {");
            sb.append("\"algoritme\":\"").append(escape(l.getAlgoritme())).append("\",");
            sb.append("\"accio\":\"").append(escape(l.getAccio())).append("\",");
            if(v!=null){
                sb.append("\"visita\":{");
                sb.append("\"idVisita\":").append(v.getIdVisita()).append(",");
                sb.append("\"nomPacient\":\"").append(escape(v.getNomPacient())).append("\",");
                sb.append("\"nomMetge\":\"").append(escape(v.getNomMetge())).append("\",");
                sb.append("\"data\":\"").append(v.getData()==null?"":v.getData().format(fmt)).append("\",");
                sb.append("\"diagnostic\":\"").append(escape(v.getDiagnostic())).append("\"}");
            } else {
                sb.append("\"visita\":null");
            }
            sb.append("}");
            if(i<logs.size()-1) sb.append(",");
            sb.append("\n");
        }
        sb.append("]\n");
        try(FileWriter fw = new FileWriter(JSON_FILE, false)){
            fw.write(sb.toString());
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    private String escape(String s){
        if(s==null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n","\\n");
    }
}
