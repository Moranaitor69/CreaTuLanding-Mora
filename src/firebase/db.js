import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./config"; 


export const db = getFirestore(app);


export async function getProducts() {
  const snap = await getDocs(collection(db, "productos"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const ref = doc(db, "productos", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}


export async function getCategories() {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map(d => d.data().categoryName).filter(Boolean);
}


export async function getProductsCategories(category) {
  const q = query(collection(db, "productos"), where("category", "==", category));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


export async function createOrder({ buyer, items, total }) {
  const ref = await addDoc(collection(db, "orders"), {
    buyer,                 
    total,                 
    items,                 
  });
  return ref.id;
}
