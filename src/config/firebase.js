import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Obtener la ubicación de este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer las credenciales privadas
const serviceAccountPath = path.resolve(
  __dirname,
  "../../secrets/firebase-service-account.json"
);

const serviceAccount = JSON.parse(
  readFileSync(serviceAccountPath, "utf8")
);

// Inicializar Firebase Admin
const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });

// Obtener la conexión con Firestore
const db = getFirestore(firebaseApp);

export default db;
