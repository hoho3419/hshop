import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { app, firestore, storage } from '../firebase.config';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
 } from 'firebase/auth';
 import { shuffleItems } from '../utils/functions'; 
import { toast } from 'react-toastify';
import { MdOutlineCloudUpload } from "react-icons/md";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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
// 현재 user 데이터 변경
export const firebaseUpdateUser = async (data) => {
  await setDoc(doc(firestore,"Users",`${data.uid}`),data,{
    merge: true,
  })
}

// Food 아이템 전부 가져오기
export const firebaseFetchFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore,'Food'),orderBy('id','desc'))
  )
  
  return shuffleItems(items.docs.map((doc) => doc.data()))
}
// 장바구니에 아이템 추가하기
export const firebaseAddToCart = async (item) => {
  await setDoc(doc(firestore,'CartItems',`${item.id}`),item,{
    merge: true
  })
}
// 장바구니 아이템 삭제하기
export const firebaseDeleteCartItem = async (item) => {
  await deleteDoc(doc(firestore,'CartItems',`${item.id}`))
}
// user 장바구니 아이템 가져오기
export const firebaseFetchAllCartItems  = async () => {
  const items = await getDocs(
    query(collection(firestore,'CartItems'),orderBy('id','desc'))
  )
  return shuffleItems(items.docs.map((doc) => doc.data())); 
}
// user 장바구니 업데이트
export const firebaseUpdateCartItem = async (data) =>{
  await setDoc(doc(firestore,"CartItems",`${data.id}`),data,{
    merge: true
  })
}
//  장바구니 전부 삭제하기
export const firebaseEmptyUserCart = async (cartItems) => {
  cartItems.forEach((item) => {
     firebaseDeleteCartItem(item);
  })
}
// user 이미지 저장하기
export const firebaseUploadImage = (
  imageFile,
  promise,
  progressHandler,
  action,
  to
) =>{
  promise(true);
  toast.info("업로드 시작...",{
    icon: <MdOutlineCloudUpload className='text-blue-600' />
  });
  // storage 공간에 경로 생성
  const storageRef = ref(
    storage,
    `Images/${to}/${Date.now()}-${imageFile.name}`
  );
  // storage 공간에 이미지 삽입
  const uploadPhoto = uploadBytesResumable(storageRef,imageFile);
  uploadPhoto.on(
    "state_changed",
    (snapshot) => {
      progressHandler(
        `업로드 진행률: ${Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )}%`
      );
    },
    (error) => {
      console.log(error);
      toast.error("업로드중에 에러가 발생했습니다. 다시 시도해주세요!");
      action(null);
      setTimeout(() => {
        promise(false);
      },3000)
    },
    () => {
      getDownloadURL(uploadPhoto.snapshot.ref)
      .then((downloadUrl) => {
        action(downloadUrl);
        promise(false);
        toast.success("사진 저장이 완료되었습니다.😊")
      })
    }
  )
}
// profile 이미지 삭제
export const firebaseRemoveUploadedImage = async (
  imageFile,
  ImageHandler,
  promise
) => {
  const dummy = "https://firebasestorage.googleapis.com/v0/b/hshop-18d5d.appspot.com/o/Images";
  promise(true);
  toast.info("이미지 삭제 중입니다...",{
    icon: <MdOutlineCloudUpload className='text-blue-600' />,
    autoClose: 1500,
    toastId: "remove-image"
  });
// 내 프로젝트 경로에 이미지가 있는건지 확인
  if(imageFile.includes(dummy)){
    const deleteRef = ref(storage,imageFile);
    await deleteObject(deleteRef)
    .then(() => {
      ImageHandler(null);
      promise(false);
      toast.success("이미지 삭제가 완료되었습니다😊",{
        autoClose: 2000,
        toastId: 'remove-image'
      })
    })
  }else{
    ImageHandler(null);
    promise(false);
    toast.success("이미지 삭제가 완료되었습니다.😊",{
      autoClose: 2000,
      toastId: 'remove-image'
    })
  }
}

// 다른 계정으로 회원가입
export const AUTHPROVIDER = async (provider) => {
  const firebaseAuth = getAuth(app);
  const {
    user: { refreshToken, providerData }
  } = await signInWithPopup(firebaseAuth,provider);
// 유저 정보 추가
  await firebaseAddUser(providerData[0]);
  let userData = await firebaseGetUser(providerData[0].uid);
  return { refreshToken, userData };
}