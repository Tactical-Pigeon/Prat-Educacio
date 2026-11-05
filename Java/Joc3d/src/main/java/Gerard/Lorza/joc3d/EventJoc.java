package Gerard.Lorza.joc3d; // Canvia pel teu package: cognom.nom.joc3d

import java.util.Random;

public class EventJoc implements Runnable {

	// Noves propietats per a 3D
	private int midaProfunditatPantalla; // profunditat màxima de la pantalla
	private int posZ;                    // coordenada Z actual

	// Propietats originals
	private String nomEvent;
	private Integer maximSegonsEnPantalla;
	private int maxAmplePantalla;
	private int maxAlturaPantalla;

	// Constructor modificat: afegeix profunditat
	public EventJoc(String nomEvent, Integer maximSegonsEnPantalla,
					int maxAmplePantalla, int maxAlturaPantalla,
					int midaProfunditatPantalla) {
		this.nomEvent = nomEvent;
		this.maximSegonsEnPantalla = maximSegonsEnPantalla;
		this.maxAmplePantalla = maxAmplePantalla;
		this.maxAlturaPantalla = maxAlturaPantalla;
		this.midaProfunditatPantalla = midaProfunditatPantalla;
	}

	@Override
	public void run() {
		aparicions();
	}

	public void aparicions() {
		int segonsEnPantallaActuals = 0;
		int x, y, z;

		while (maximSegonsEnPantalla == null || segonsEnPantallaActuals <= maximSegonsEnPantalla) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				System.err.println(e.getMessage());
			}

			// Genera posicions aleatòries en X, Y i Z
			x = getPosicio(maxAmplePantalla, -maxAmplePantalla);
			y = getPosicio(maxAlturaPantalla, -maxAlturaPantalla);
			z = getPosicio(midaProfunditatPantalla, -midaProfunditatPantalla); // Nova coordenada Z

			// Guardem la Z per si es necessita després (opcional)
			this.posZ = z;

			// Mostra les tres coordenades
			System.out.println(nomEvent + " X:" + x + " Y:" + y + " Z:" + z);
			segonsEnPantallaActuals++;
		}
	}

	// Mètode per generar un valor aleatori entre min i max
	private int getPosicio(int max, int min) {
		Random r = new Random();
		return r.nextInt(max - min + 1) + min;
	}

	// Getters i setters per a les noves propietats (opcionals però recomanats)
	public int getMidaProfunditatPantalla() {
		return midaProfunditatPantalla;
	}

	public void setMidaProfunditatPantalla(int midaProfunditatPantalla) {
		this.midaProfunditatPantalla = midaProfunditatPantalla;
	}

	public int getPosZ() {
		return posZ;
	}

	public void setPosZ(int posZ) {
		this.posZ = posZ;
	}
}