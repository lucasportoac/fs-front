import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function salvarPedido(
  produtos: any[],
  total: number,
  cliente?: string
) {
  return await addDoc(collection(db, "pedidos"), {
  cliente: cliente,
  produtos,
  total,
  criadoEm: serverTimestamp(),
  dataPedido: new Date().toISOString(),
});
}