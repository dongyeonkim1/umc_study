import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";

const schema = z.object( {
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
        .string()
        .min(8, {
            message:"비밀번호는 8자 이상이어야 합니다.",
        })
        .max(20, {
            message: "비밀번호는 20자 이하여야 합니다.",
        }),
    passwordCheck: z
        .string()
        .min(8, {
            message:"비밀번호는 8자 이상이어야 합니다.",
        })
        .max(20, {
            message: "비밀번호는 20자 이하여야 합니다.",
        }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
})
    .refine((data) => data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path:['passwordCheck'],
    });

type FormFields = z.infer<typeof schema>;

const SignupPage = ()  => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit, 
        formState: {errors, isSubmitting},
    } = useForm<FormFields>( {
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
       
        const {passwordCheck, ...rest} = data;

        try {
            const response = await postSignup(rest);
            console.log("회원가입 성공:", response);
      
            navigate("/signup/complete", {
              state: { name: rest.name },
            });
          } catch (error) {
            console.error("회원가입 요청 실패:", error);
          }
/* 
        const response = await postSignup(rest);

        console.log(response); */

    };

    return (
        <div className="min-h-screen bg-black text-white">
          {/* 네비게이션 바 */}
         
          {/* 본문 */}
          <div className="flex flex-col items-center justify-center py-12 mt-12">
            <div className="w-[300px] flex flex-col items-center gap-4">
              {/* 로그인 텍스트 */}
              {/* <button
                className="text-lg font-semibold"
                onClick={() => navigate("/")}
              >
                &lt; 로그인
              </button>
     */}
              {/* 구글 로그인 버튼 */}
              {/* <button className="w-full border border-white rounded-md py-2 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                구글 로그인
              </button> */}
    
              {/* 구분선 */}
              {/* <div className="flex items-center w-full gap-2 text-gray-400 mt-7 mb-7">
                <div className="flex-1 h-px bg-gray-500" />
                <span className="text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-500" />
              </div> */}
    
              {/* 이메일 입력 */}
              <input
                {...register("email")}
                className={`bg-black border w-full p-[10px] rounded-md focus:border-[#807bff] rounded-sm ${
                  errors?.email ? "border-red-500 bg-red-200 text-black placeholder:text-black-500" : "border-gray-300"}`}
                type="email"
                placeholder="이메일을 입력해주세요!"
              />
              {errors.email && (
                <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
              )}
              
    
              {/* 비밀번호 입력 */}
              <input
                {...register("password")}
                className={`bg-black text-white border rounded-md w-full p-[10px] focus:border-[#807bff] rounded-sm ${
                  errors?.password ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                type="password"
                placeholder="비밀번호를 입력해주세요!"
              />
              {errors.password && (
                <div className={"text-red-500 text-sm"}>{errors.password.message}</div>
              )}

<input
                {...register("passwordCheck")}
                className={`bg-black text-white border rounded-md w-full p-[10px] focus:border-[#807bff] rounded-sm ${
                  errors?.passwordCheck ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                type="password"
                placeholder="비밀번호 확인"
              />
              {errors.passwordCheck && (
                <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>
              )}
              

              {/* 이름 입력 */}
              <input
                {...register("name")}
                className={`bg-black text-white border rounded-md w-full p-[10px] focus:border-[#807bff] rounded-sm ${
                  errors?.password ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                type="name"
                placeholder="이름"
              />
              {errors.name && (
                <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
              )}
             
    
              {/* 회원가입 버튼 */}
              <button
                disabled={isSubmitting}
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-pink-400 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-600"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      );
};

export default SignupPage;