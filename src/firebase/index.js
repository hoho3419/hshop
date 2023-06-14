import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
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

// 사용자 로그아웃
export const firebaseLogout = async () => {
  await getAuth(app).signOut();
}

// 회원가입 할때 데이터베이스에 사용자 정보 추가
export const firebaseAddUser = async (data) => {
  const user = await firebaseGetUser(data.uid);
  if(user.length === 0){
    await setDoc(doc(firestore,'Users',`${data.uid}`),data,{
      merge: true
    })
  }
}

