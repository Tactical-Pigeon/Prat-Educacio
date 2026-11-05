import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../firebase";

export const obtenirProductes = async () => {
  // const querySnapshot = await getDocs(collection(db, "productes"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

  const querySnapshot = await getDocs(collection(db, "productes "));

  console.log("4. Snapshot buit?", querySnapshot.empty);

  console.log("5. Nombre de documents:", querySnapshot.size);

  const products = [];
  querySnapshot.forEach((document) => {
    console.log("6. Document trobat:", document.id);
    const data = document.data();
    console.log("   Dades:", data);
    products.push({ id: document.id, ...data });
  });
  console.log("7. Productes retornats:", products);
  return products;
};

export const obtenirProductePerId = async (id) => {
  try {
    const docRef = doc(db, "productes ", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Producte no trobat");
    }
  } catch (error) {
    console.error("ERROR obtenirProductePerId:", error);
    throw error;
  }
};
