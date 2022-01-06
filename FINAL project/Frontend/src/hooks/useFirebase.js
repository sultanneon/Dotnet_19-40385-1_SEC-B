import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitialize from "../Firebase/Firebase.init";
firebaseInitialize();
const useFirebase=()=>{
    const [user,setUser]=useState({});
    const [isLoading,setIsLoading]=useState(true);
    const [admin, setAdmin] = useState(false);
    const [authError, setAuthError] = useState('');
    const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
    useEffect(()=>{
            fetch(`https://gentle-mesa-29497.herokuapp.com/isAdmin?email=${user.email}`)
            .then(res=>res.json())
            .then(data=> setAdmin(data))
       
    },[user.email])
    console.log(admin);
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
                getIdToken(user)
                .then(idToken=>{
                    localStorage.setItem('idToken', idToken)
                })
            }
            else{
                setUser({})
            }
            setIsLoading(false);
        });
    },[])

    const logOut=()=>{
        setIsLoading(true);
        signOut(auth)
        .then(()=>{
            setUser({})
        })
        .finally(()=>setIsLoading(false))
    }
    const signInUsingGoogle=(location,history)=>{
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            saveUser(user.email, user.displayName, 'PUT');
            setAuthError('');
            const destination = location?.state?.from || '/';
            history.replace(destination);
        }).catch((error) => {
            setAuthError(error.message);
        }).finally(() => setIsLoading(false));
    }


    const RegisterUsingPassword=(name,email,password)=>{
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result.user);
            saveUser(result.user.email, name, 'PUT');
            setUserName(name);
        })
        .finally(()=>setIsLoading(false))
        

    }
    const setUserName=(name)=>{
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
          })
    }
    const processLogin =(email,password,location,history)=>{
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const destination = location?.state?.from || '/';
                history.replace(destination);
            console.log(result.user);
            setUser(result.user);

        })
        .finally(() => setIsLoading(false));
    }
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        Object.assign(user, {status: "customer"});
        console.log(user);


        axios.post('https://gentle-mesa-29497.herokuapp.com/users',user)
      .then(res => {
          console.log(res);
      })



    }
    return {
        RegisterUsingPassword,
        signInUsingGoogle,
        user,
        processLogin,
        logOut,
        isLoading,
        admin
        }
}
export default useFirebase;