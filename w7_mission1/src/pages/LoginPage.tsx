import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSigninMutation } from '../hooks/mutations/useSigninMutation';

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { mutate, isPending } = useSigninMutation();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  });

  const handleSubmit = () => {
    mutate(values);
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login';
  };

  const isDisabled =
    Object.values(errors ?? {}).some((error) => error.length > 0) ||
    Object.values(values ?? {}).some((value) => value === '') ||
    isPending;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center py-12 mt-12">
        <div className="w-[300px] flex flex-col items-center gap-4">
          <button className="text-lg font-semibold" onClick={() => navigate("/")}>
            &lt; 로그인
          </button>

          {/* 구글 로그인 */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-white rounded-md py-2 flex items-center justify-center gap-2 hover:bg-pink-600 hover:text-white transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            구글 로그인
          </button>

          <div className="flex items-center w-full gap-2 text-gray-400 mt-7 mb-7">
            <div className="flex-1 h-px bg-gray-500" />
            <span className="text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-500" />
          </div>

          {/* 이메일 */}
          <input
            {...getInputProps("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className={`bg-black text-white border w-full p-[10px] rounded-md focus:border-[#807bff] ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200 text-black"
                : "border-gray-300"
            }`}
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          {/* 비밀번호 */}
          <input
            {...getInputProps("password")}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className={`bg-black text-white border w-full p-[10px] rounded-md focus:border-[#807bff] ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200 text-black"
                : "border-gray-300"
            }`}
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          {/* 로그인 버튼 */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-pink-400 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-600"
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
