import {useMutation} from '@tanstack/react-query'
import {useNavigate} from "react-router-dom"
import { TemplateAuth } from "../../templates/TemplateAuth"
import { useForm } from "react-hook-form";
import { loginRequest } from '../../api/users';

export const LoginPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit
  } = useForm();

  const loginMutation = useMutation({
    mutationFn:  (data) => loginRequest(data),
    onSuccess: () => {      
      navigate("/");
    },
    onError: () => {
      
    }
    
  })
  
  const onSubmit = (data) => {
    const body = {
      ...data      
    };
    
    loginMutation.mutate({...body})    
  };

  return (
    <TemplateAuth>
      <div className="gap-2 grid place-items-center max-w-xl self-center order-1 space-y-4 md:place-items-start md:-order-1">
        <div className="flex flex-col items-center space-y-1 md:items-start">
          <h1>Create New Account</h1>
          <h2>¿Already Register?</h2>
        </div>
        <p>
          Discover a world of unlimited expression. Join to share your ideas,
          connect with other passionate people and build vibrant communities -
          register now!
        </p>

        <button
          className="backdrop-blur-2xl border-white border-2 hover:bg-naranja max-w-72 py-3 rounded-md transition-colors w-52"
          onClick={() => navigate("/register")}
        >
          ¡Register now!
        </button>
      </div>

      <form 
        className="backdrop-blur-2xl flex flex-col gap-6 max-w-xl p-8 rounded-2xl self-center shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="tracking-wide text-center">Login</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">EMAIL</label>
          <input
            className="bg-transparent"
            type="email"
            placeholder="martin.reyes@unmsm.edu.pe"
            autoComplete="off"
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">PASSWORD</label>
          <input
            className="bg-transparent"
            type="password"
            placeholder="******"
            {...register("password", {
              required: true,
            })}
          />
        </div>

        <button 
          className="border-white border-2 hover:bg-naranja mt-6 py-3 rounded-md transition-colors"
        >
          Log in
        </button>
      </form>
    </TemplateAuth>
  )
}