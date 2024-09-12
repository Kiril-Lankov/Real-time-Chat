
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, setDoc} from "firebase/firestore"; 
import { toast } from "react-toastify";
import { doc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCw3GRI7NbsRiMiZqWkXGd9NnwNwQYAJKk",
  authDomain: "chat-app-kt-d0394.firebaseapp.com",
  projectId: "chat-app-kt-d0394",
  storageBucket: "chat-app-kt-d0394.appspot.com",
  messagingSenderId: "626313517728",
  appId: "1:626313517728:web:00ddfcfedc5ee72503c7c5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid),{
        id: user.uid,
        username: username.toLowerCase(),
        email,
        name: "",
        avatar: "",
        bio: "Hey , I am using chat app",
        lastSeen: Date.now()
    })
    await setDoc(doc(db, "chats", user.uid), {
        chatsData: [],

    })
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));   
    }
   
}
export {signup, login, logout, auth, db};