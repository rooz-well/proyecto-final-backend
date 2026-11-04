import db from "../config/firebase.js";

// Referencia a la colección de productos
const productsCollection = db.collection("products");

// Obtener todos los productos
const getAll = async () => {
  const snapshot = await productsCollection.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Obtener un producto por ID
const getById = async (id) => {
  const doc = await productsCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

// Crear un producto
const create = async (productData) => {
  const docRef = await productsCollection.add(productData);
  const doc = await docRef.get();

  return {
    id: doc.id,
    ...doc.data(),
  };
};

// Actualizar un producto
const updateById = async (id, productData) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  await docRef.update(productData);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };
};

// Eliminar un producto
const deleteById = async (id) => {
  const docRef = productsCollection.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  await docRef.delete();

  return true;
};

export {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
