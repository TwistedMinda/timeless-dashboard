
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDz0meh2Yp9qO0UjLJgeNm09DlNMRTXBpg",
  authDomain: "timeless-728c6.firebaseapp.com",
  projectId: "timeless-728c6",
  storageBucket: "timeless-728c6.appspot.com",
  messagingSenderId: "674580439677",
  appId: "1:674580439677:web:12f2296aba691564000714",
  measurementId: "G-6KNP2TKLNN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)

export const storeFile = async (file: File) => {
  const storageRef = ref(storage, `outfits/${file.name}`);
  await uploadBytes(storageRef, file);
  console.log('uploaded!')
  const fileUrl = await getDownloadURL(storageRef)
  return fileUrl
}

export const getOutfits = async () => {
  try {
    const list: any[] = []
    const snap = await getDocs(query(collection(db, 'outfits')))
    snap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push({
        id: doc.id,
        ...doc.data()
      })
    });
    return list
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
  return []
}

export const createOutfit = async (data: any) => {
  try {
    await addDoc(collection(db, 'outfits'), data)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return []
}