# Projecte: Seguretat i Criptografia (Persistència JSON) — DAM

**Autor:** lorza.gerard

Projecte en Java seguint patró **MVC** per encriptar/desencriptar dades de **VisitaMèdica** amb **MD5**, **SHA-256** i **AES**, i persistir **logs** en **JSON**.

## Estructura de paquets
- `lorza.gerard.dam.mp09.uf01.pr2.seguretat.controller`
- `lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.domain`
- `lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.service`
- `lorza.gerard.dam.mp09.uf01.pr2.seguretat.model.repository`
- `lorza.gerard.dam.mp09.uf01.pr2.seguretat.view.console`
- `lorza.gerard.dam.mp09.uf01.pr2.app`

## Execució ràpida
1. Obre l'IDE (IntelliJ/Eclipse/VS Code) i crea un **Project from Existing Sources** apuntant a aquesta carpeta.
2. Assegura JDK **17** o superior.
3. Executa `Main` (paquet `lorza.gerard.dam.mp09.uf01.pr2.app`).

## Fitxers de sortida
- `data/visita_logs.json` — Persistència de `VisitaMedicaLog`.

## Notes
- MD5 i SHA-256 **no** són reversibles (hash).
- AES utilitza clau de 32 caràcters (AES-256) i codifica en **Base64**.
