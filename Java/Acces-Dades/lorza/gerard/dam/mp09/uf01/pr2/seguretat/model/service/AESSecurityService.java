package lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class AESSecurityService {
    private static final String ENCRYPT_ALGORITHM = "AES";
    // 32 caràcters => 256 bits (només per a demo; en real, guarda-la de forma segura!)
    private static final String ENCRYPT_KEY = "12345678901234567890123456789012";

    public String encripta(String valorOriginal) throws Exception {
        SecretKeySpec key = new SecretKeySpec(ENCRYPT_KEY.getBytes(StandardCharsets.UTF_8), ENCRYPT_ALGORITHM);
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encrypted = cipher.doFinal(valorOriginal.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public String desencripta(String encrypted) throws Exception {
        SecretKeySpec key = new SecretKeySpec(ENCRYPT_KEY.getBytes(StandardCharsets.UTF_8), ENCRYPT_ALGORITHM);
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] original = cipher.doFinal(Base64.getDecoder().decode(encrypted));
        return new String(original, StandardCharsets.UTF_8);
    }
}
