import { collection, getDocs, query } from 'firebase/firestore';
import { app, firestore } from '../firebase.config';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 } from 'firebase/auth';

export const EMAILSIGNUP = async (email,password) =>{
  const firebaseAuth = getAuth(app);
  return await createUserWithEmailAndPassword(firebaseAuth,email,password);
}

export const EMAILSIGNIN = async (email,password) =>{
  const firebaseAuth = getAuth(app);
  // firebase에 이메일과 비밀번호를 보낸다.
  // 성공하면 사용자의 정보를 반환하고 실패하면 error를 반환한다.
  const result = await signInWithEmailAndPassword(firebaseAuth,email,password);
  // user에는 uid,displayName, email, photoURL 이 들어있다
  let user = result.user.providerData[0];
  return await firebaseGetUser(user.uid);
}

export const firebaseGetUser = async (uid) =>{
  // getDocs로 collection에 Users라는 이름을 가진 문서를 가져오는 로직
  const user = await getDocs(
    query(collection(firestore,'Users'))
  );
  let users = user.docs.map((doc) => doc.data());
  return users.filter((user) => user.uid === uid);
}

export const firebaseLogout = () => {

}