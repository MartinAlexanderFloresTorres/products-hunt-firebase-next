import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import generarId from "../helpers/generarId";

/**
 * Subir imagen a Firebase Storage
 * @param {File} file
 * @return {Promise<string>} url
 */
const uploadImage = async (file) => {
  const { name } = file;
  const nombre = name.split(".")[0] + generarId();
  await uploadBytes(ref(storage, nombre), file);
  return getDownloadURL(ref(storage, nombre));
};

export default uploadImage;
