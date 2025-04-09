
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';

const LoginPage = () => { 

    const navigate = useNavigate();
    
    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>( {
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });
    
    
    const handleSubmit = () => {
        console.log(values);
    };

  /*   const handleSubmit = async() => {
        console.log(values);
        await axios.post('url', values)       //API 통신 시 
    };
 */
    
    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some(value => value === "");

    /* return (
        <div className='flex flex-col items-center justify-center h-full gap-4'>
            <div className='flex flex-col gap-3'>
                <input 
                    {...getInputProps('email')}
                    name='email'
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm'
                    ${errors?.email && touched?.email ? "border-red-500 bg-red-200":"border-gray-300"}`}
                    type={"email"} 
                    placeholder={"이메일"}
                    
                />
                {errors?.email && touched?.email && (
                    <div className='text-red-500 text-sm'>{errors.email}</div>
                )}
                <input 
                    {...getInputProps('password')} */
                    /* value={}
                    onBlur={}
                    onChange={} */
                    /* className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm'
                    ${errors?.password && touched?.password ? "border-red-500 bg-red-200":"border-gray-300"}`}
                    type={"password"} 
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className='text-red-500 text-sm'>{errors.password}</div>
                )}
                <button 
                    type='button' 
                    onClick={handleSubmit} 
                    disabled={isDisabled} 
                    className='w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300'
                >
                로그인
                </button>
            </div>
        </div>
    );
}; */


return (
    <div className="min-h-screen bg-black text-white">
      {/* 네비게이션 바 */}
     
      {/* 본문 */}
      <div className="flex flex-col items-center justify-center py-12 mt-12">
        <div className="w-[300px] flex flex-col items-center gap-4">
          {/* 로그인 텍스트 */}
          <button
            className="text-lg font-semibold"
            onClick={() => navigate("/")}
          >
            &lt; 로그인
          </button>

          {/* 구글 로그인 버튼 */}
          <button className="w-full border border-white rounded-md py-2 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            구글 로그인
          </button>

          {/* 구분선 */}
          <div className="flex items-center w-full gap-2 text-gray-400 mt-7 mb-7">
            <div className="flex-1 h-px bg-gray-500" />
            <span className="text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-500" />
          </div>

          {/* 이메일 입력 */}
          <input
            {...getInputProps("email")}
            name="email"
            className={`bg-black text-white border w-full p-[10px] rounded-md focus:border-[#807bff] rounded-sm ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200 text-black"
                : "border-gray-300"
            }`}
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          {/* 비밀번호 입력 */}
          <input
            {...getInputProps("password")}
            className={`bg-black text-white border rounded-md w-full p-[10px] focus:border-[#807bff] rounded-sm ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200 text-black"
                : "border-gray-300"
            }`}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-blue-400 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-600"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
  
};


export default LoginPage;