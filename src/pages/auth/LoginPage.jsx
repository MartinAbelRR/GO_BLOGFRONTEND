import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

import { TemplateAuth } from "../../templates";

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
      navigate("/GO_BLOGFRONTEND/home");
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
      <div className="flex flex-col gap-4 justify-center max-w-xl order-1 space-y-8 md:-order-1 md:space-y-20">
        <div className="flex flex-col items-center space-y-1 md:items-start md:space-y-4">
          <h1>Create New Account</h1>
          <h2>¿Already Register?</h2>
        </div>
        <div className='flex flex-col items-center h-40 space-y-6 md:items-start'>
        <div className='border border-y-4 rounded-xl w-20'></div>
        <p className='mt-8'>
          Discover a world of unlimited expression. Join to share your ideas,
          connect with other passionate people and build vibrant communities -
          register now!
        </p>
          <button
            className="bg-naranja border-white border-2 hover:bg-azul-oscuro max-w-72 py-3 rounded-md transition-colors w-52"
            onClick={() => navigate("/GO_BLOGFRONTEND/register")}
          >
            ¡Register now!
          </button>
        </div>  

      </div>

      <form 
        className="bg-gris-azulado/60 flex flex-col gap-6 justify-center max-w-xl p-8 rounded-2xl shadow-xl md:h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Login</h1>

        <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
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
          className="bg-naranja border-white border-2 hover:bg-gris-azulado mt-6 py-3 rounded-md self-center transition-colors w-56"
        >
          Log in
        </button>
      </form>
    </TemplateAuth>
  )
}