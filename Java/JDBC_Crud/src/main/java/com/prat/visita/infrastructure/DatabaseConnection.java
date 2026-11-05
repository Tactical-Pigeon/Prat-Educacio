package com.prat.visita.infrastructure;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    // 🔁 CANVIA AQUÍ LES TEVES DADES DE CONNEXIÓ
    private static final String URL = "jdbc:mysql://localhost:3306/C2526_M0486_RA2?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";      // el teu usuari
    private static final String PASSWORD = "12345aA"; // la teva contrasenya

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}