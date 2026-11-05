package lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

public class MD5SecurityService {
    public String encripta(String valorOriginal) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(valorOriginal.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }
}
