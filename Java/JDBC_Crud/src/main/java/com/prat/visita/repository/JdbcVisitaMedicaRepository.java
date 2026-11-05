package com.prat.visita.repository;

import com.prat.visita.model.VisitaMedica;
import com.prat.visita.infrastructure.DatabaseConnection;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class JdbcVisitaMedicaRepository implements VisitaMedicaRepository {

    @Override
    public VisitaMedica save(VisitaMedica visita) {
        if (visita.getIdVisita() == 0) {
            // INSERT
            String sql = "INSERT INTO VisitaMedica (nomPacient, nomMetge, data, diagnostic) VALUES (?, ?, ?, ?)";
            try (Connection conn = DatabaseConnection.getConnection();
                 PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, visita.getNomPacient());
                stmt.setString(2, visita.getNomMetge());
                stmt.setDate(3, Date.valueOf(visita.getData()));
                stmt.setString(4, visita.getDiagnostic());
                int affectedRows = stmt.executeUpdate();
                if (affectedRows > 0) {
                    try (ResultSet rs = stmt.getGeneratedKeys()) {
                        if (rs.next()) {
                            visita.setIdVisita(rs.getInt(1));
                        }
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            // UPDATE
            String sql = "UPDATE VisitaMedica SET nomPacient=?, nomMetge=?, data=?, diagnostic=? WHERE IdVisita=?";
            try (Connection conn = DatabaseConnection.getConnection();
                 PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, visita.getNomPacient());
                stmt.setString(2, visita.getNomMetge());
                stmt.setDate(3, Date.valueOf(visita.getData()));
                stmt.setString(4, visita.getDiagnostic());
                stmt.setInt(5, visita.getIdVisita());
                stmt.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return visita;
    }

    @Override
    public Optional<VisitaMedica> findById(int id) {
        String sql = "SELECT IdVisita, nomPacient, nomMetge, data, diagnostic FROM VisitaMedica WHERE IdVisita=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    @Override
    public List<VisitaMedica> findAll() {
        List<VisitaMedica> llista = new ArrayList<>();
        String sql = "SELECT IdVisita, nomPacient, nomMetge, data, diagnostic FROM VisitaMedica";
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                llista.add(mapRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return llista;
    }

    @Override
    public void deleteById(int id) {
        String sql = "DELETE FROM VisitaMedica WHERE IdVisita=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean existsById(int id) {
        String sql = "SELECT 1 FROM VisitaMedica WHERE IdVisita=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private VisitaMedica mapRow(ResultSet rs) throws SQLException {
        return new VisitaMedica(
                rs.getInt("IdVisita"),
                rs.getString("nomPacient"),
                rs.getString("nomMetge"),
                rs.getDate("data").toLocalDate(),
                rs.getString("diagnostic")
        );
    }
}