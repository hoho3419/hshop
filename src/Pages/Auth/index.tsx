import React from 'react';
import { motion } from "framer-motion";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { toast } from "react-toastify";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { bikeDelivery } from '../../components/Assets';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import { AUTHPROVIDER } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';


const ProviderAuth = () => {
  const [user,setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const GOOGLE_PROVIDER = new GoogleAuthProvider();

  const AUTH = async ({ provider } : { provider: any }) => {
    if(!user){
      toast.promise(AUTHPROVIDER(provider),{
        pending: "로그인중...",
        success: '로그인에 성공했습니다.',
        error: '에러가 발생했습니다. 다시 시도해주세요!🤗'
      })
      .then(({ refreshToken, userData }) => {
        const SignUser = userData[0];
        setUser(() => SignUser);
        localStorage.setItem('user',JSON.stringify(SignUser));
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage,{autoClose: 1500});
      })
    }
  }

  return (
    <div className="flex items-center justify-center gap-5  text-center">
      <motion.p
        whileHover={{ scale: 1.1 }}
        className="flex items-center w-36 h-10 bg-white justify-center rounded text-headingColor px-5 cursor-pointer shadow-sm hover:bg-slate-100"
        onClick={() =>
          toast.warn("아직 미완성 기능입니다!", {
            autoClose: 2000,
            icon: (
              <MdOutlineNotificationsActive className="text-yellow-500 text-xl" />
            ),
            toastId: "github",
          })
        }
      >
        <BsGithub className="text-xl w-5 mr-1" />
        <span>Github</span>
      </motion.p>
      <motion.p
        whileHover={{ scale: 1.1 }}
        className="flex items-center w-36 h-10 bg-white justify-center rounded text-headingColor px-5 cursor-pointer shadow-sm hover:bg-slate-100"
        onClick={() => AUTH({ provider: GOOGLE_PROVIDER })}
      >
        <FcGoogle className="text-xl w-5 mr-1" />
        <span>Google</span>
      </motion.p>
    </div>
  );
};


export const ImageBox = () => {
  return (
    <div className="hidden md:w-8/12 lg:w-6/12 mb-12 md:mb-0 md:flex ">
      <motion.img
        whileHover={
          {
            rotate: [0, -10, 10, -10, 0],
          }
        }
        src={bikeDelivery}
        className="w-96 cursor-pointer"
        alt="logo-login"
      />
    </div>
  );
};

export default ProviderAuth;

export type ValidateValue = (value: string) => boolean;

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const emailValidate: ValidateValue = (value: string) => {
  if(value.trim() !== ''){
    return true;
  } 
  return false
}
export const passwordValidate: ValidateValue = (value: string) => {
  if(passwordRegex.test(value)){
    return true;
  } 
  return false
}
