import React,{ useState } from 'react';
import { BiUser } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import {
  MdOutlineDataSaverOn,
  MdDeleteOutline
} from "react-icons/md";
import { AssetUploader, Loader } from '../../components';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import { toast } from 'react-toastify';
import { updateUserData } from '../../utils/functions';
import { firebaseRemoveUploadedImage } from '../../firebase';

const Profile = () => {
  const [user,setUser] = useRecoilState(userState);
  const [displayName,setDisplayName] = useState<string>(user.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber || '')
  const [photoURL,setPhotoURL] = useState(user.photoURL);
  const [loading,setLoading] = useState(false);
  const [btnText, setBtnText] = useState("저장");
  const [loaderMessage, setLoadermessage] = useState("");
  
  const saveChangesHandler = async () => {
    setBtnText('저장중...');
    if(displayName.length < 0 || phoneNumber.length !== 11){
      toast.error("빈칸을 제출할 수 없고, 전화번호는 11자리여야 합니다.");
      setBtnText("저장");
    }else{
      const newUser = {
        ...user,
        displayName,
        phoneNumber,
        photoURL
      }
      await updateUserData(setUser,newUser);
      setBtnText("저장");
    }
  }

  const updatePhotoUrl = async (newUrl: string) => {
    setPhotoURL(newUrl);
    const newUser = { ...user, photoURL: newUrl };
     await updateUserData(setUser, newUser);
  }

  const deleteImage = async () => {
    setLoadermessage('삭제 중입니다..');
    await firebaseRemoveUploadedImage(photoURL,setPhotoURL,setLoading);
    const newUser = { ...user, photoURL: null };
    await updateUserData(setUser, newUser);
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='border w-full md:w-[60%] flex border-gray-300 items-center rounded-lg p-4 flex-col gap-4 mt-8 mg:mt-10'>
        <div className='w-full py-3 border-b border-gray-300 flex items-center gap-2'>
          <BiUser className="text-xl text-gray-600"/>
          <input 
            type="text"
            required
            placeholder='이름을 입력하세요'
            autoFocus
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
           />
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <BsPhone className='text-gray-600 text-2xl '/>
            <input type="number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='핸드폰 번호를 입력하세요 ex)01012345678'
              className='w-full h-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400'
            />
          </div>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted w-full border-gray-300 h-[225px] md:h-[420px] round-lg '>
          {
            loading ? (
              <Loader progress={loaderMessage} />
            ) : (
              <>
                {
                  photoURL ? (
                    <>
                      <div className='relative h-full'>
                        <img 
                          src={photoURL} 
                          alt="food"
                          className='w-full h-full object-cover' 
                        />
                        <motion.button
                          whileTap={{ scale: 1.1 }}
                          whileHover={{ scale: 1.2 }}
                          title='사진 삭제'
                          className="absolute bottom-3 right-3 rounded-full p-2 md:p-5 bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                          onClick={() => deleteImage()}
                        >
                          <MdDeleteOutline className="text-white" />
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <AssetUploader
                      action={updatePhotoUrl}
                      progressHandler={setLoadermessage}
                      promise={setLoading}
                    />
                  )
                }
              </>
            )
          }
        </div>

        <div className='w-full flex items-center justify-center'>
        <motion.button
          whileHover={{scale: 1.1}}
          className='ml-0 flex justify-center items-center gap-2 flex-row-reverse md:ml-auto w-full md:w-auto border-none outline-none rounded bg-orange-500 px-12 py-2 text-lg text-white'
          onClick={() => saveChangesHandler()}
        >
          <MdOutlineDataSaverOn />{btnText}
        </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Profile;