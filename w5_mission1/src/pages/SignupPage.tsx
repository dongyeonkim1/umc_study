import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";

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

const emailOnlySchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
});

type FormFields = z.infer<typeof schema>;


const SignupPage = ()  => {

    const navigate = useNavigate();
    const [showFields, setShowFields] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] =  useState(false);

    const {
        register,
        handleSubmit, 
        getValues,
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

    const handleEmailNext = () => {
      const email = getValues("email");
      const result = emailOnlySchema.safeParse({ email });
  
      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }
  
      setShowFields(true);
    };

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

    };

    return (
        <div className="min-h-screen bg-black text-white">
          {/* 네비게이션 바 */}
         
          {/* 본문 */}
          <div className="flex flex-col items-center justify-center py-12 mt-12">
            <div className="w-[300px] flex flex-col items-center gap-4">
    
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

              {!showFields && (                                    
                <button                                            
                  type="button"                                    
                  onClick={handleEmailNext}                        
                  className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600" 
                >                                                  
                  다음                                             
                </button>                                          
              )}                  
              
              
            {showFields && (  
              <>
                {/* 비밀번호 입력 */}
          
                  <div className="relative w-full">
                    <input
                      {...register("password")}
                      className={`bg-black text-white border rounded-md w-full p-[10px] focus:border-[#807bff] rounded-sm ${
                        errors?.password ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요!"
                    />
                    <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? (
                      <EyeOff size={20} color="gray" />
                    ) : (
                      <Eye size={20} color="gray" />
                    )}
                  </button>
                  </div>
                  {errors.password && (
                    <div className={"text-red-500 text-sm"}>{errors.password.message}</div>
                  )}

                  {/*비밀번호 확인*/}
                  <div className="relative w-full">
                    <input
                      {...register("passwordCheck")}
                      className={`bg-black text-white border rounded-md w-full p-[10px] focus:border-[#807bff] rounded-sm ${
                        errors?.passwordCheck ? "border-red-500 bg-red-200 text-black" : "border-gray-300"}`}
                      type={showPasswordCheck ? "text" : "password"}
                      placeholder="비밀번호 확인"
                    />
                    <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    >
                    {showPasswordCheck ? (
                      <EyeOff size={20} color="gray" />
                    ) : (
                      <Eye size={20} color="gray" />
                    )}
                  </button>
                  </div>
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
                </>
            )}
            </div>
          </div>
        </div>
      );
};

export default SignupPage;