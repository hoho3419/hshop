import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProviderAuth, { ImageBox, emailValidate, passwordValidate } from ".";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import useInput from '../../hooks/useInput';
import { EMAILSIGNUP,firebaseAddUser } from '../../firebase';

const Register = () => {
  const user = useRecoilState(userState)[0];
  const navigate = useNavigate();

  const {
    value: enterdEmail, // 이런식으로 받는 쪽에서 하면 enterdEmail로 retrun 받는 값을 할당 받겠다는 의미이다.
    isValid: enterdEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(emailValidate);

  const {
    value: enterdPassword,
    isValid: enterdPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetpasswordInput,
  } = useInput(passwordValidate);

  const EmailAuth = () => {
    if(!user){
      if(!enterdEmailIsValid && !enterdPasswordIsValid){
        return;
      }
      toast.promise(
        EMAILSIGNUP(enterdEmail,enterdPassword),
        {
          pending: '계정 생성중...',
          success: '성공적으로 회원가입이 완료되었습니다. 로그인 해주세요',
          error: '계정 생성에 실패하였습니다. 다시 시도해주세요'
        }
      ).then((userCredential) =>{
        const user = userCredential.user.providerData[0];
        firebaseAddUser(user);
        navigate('/login');
      }).catch((error) =>{
        const errorMessage = error.message;
        toast.error(errorMessage,{ autoClose: 15000 })
      })
      resetEmailInput();
      resetpasswordInput();
    }
  }
  return (
    <section className='w-full h-auto'>
      <div className='container md:py-10 h-full'>
        <div className='flex justify-center items-center'>
          <ImageBox />
          <div className='w-full md:w-[30rem]'>
            <form className='p-2' >
              <ProviderAuth />
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
                  OR
                </p>
              </div>
              <div className="mb-6">
              {emailInputHasError && <p className='text-sm text-red-500'>이메일은 빈칸으로 제출할 수 없습니다.</p>}
                <input
                  type="email"
                  className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Email address"
                  value={enterdEmail}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
              </div>

              {passwordInputHasError && <p className='text-sm text-red-500'>비밀번호는 최소 8자리 이고 영문과 숫자를 포함해야 합니다.</p>}
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Password"
                  value={enterdPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
              </div>
                <motion.p
                  className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  whileHover={{ scale: 1.1 }}
                  onClick={EmailAuth}
                >
                  회원가입
                </motion.p>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                    계정이 있으신가요?
                  </p>
                </div>
                <Link to={"/login"}>
                  <motion.p
                    whileHover={{ scale: 0.99 }}
                    className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  >
                    로그인 하러 가기
                  </motion.p>
                </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;