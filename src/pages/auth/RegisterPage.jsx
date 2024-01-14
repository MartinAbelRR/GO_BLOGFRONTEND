import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { TemplateAuth } from "../../templates/TemplateAuth";
import { useForm } from "react-hook-form";
import { registerRequest } from "../../api/users";

export const RegisterPage = () => {  
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();

  const registerMutation = useMutation({
    mutationFn: (data) => registerRequest(data),
    onSuccess: (response) => {
      navigate("/GO_BLOGFRONTEND/login");
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    }
  })

  const onSubmit = (data) => {
    const body = {
      ...data
    };

    registerMutation.mutate(body)
  };  

  return (
    <TemplateAuth>
      <div className="gap-2 grid max-w-xl order-1 place-items-center self-center space-y-4 md:place-items-start md:-order-1">
        <div className="flex flex-col items-center space-y-1 md:items-start md:space-y-4">
          <h1>Login</h1>
          <h2>¿Already have an account?</h2>
        </div>

        <button
          className="bg-naranja border-white border-2 hover:bg-azul-semioscuro max-w-72 py-3 rounded-md transition-colors w-52"
          onClick={() => navigate("/GO_BLOGFRONTEND/login")}
        >
          ¡Login now!
        </button>
      </div>

      <form 
        className="bg-gris-azulado/60 flex flex-col gap-6 justify-center max-w-xl p-8 rounded-2xl shadow-xl w-[90vw] md:h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Registration</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="first_name">FIRST NAME</label>
          <input 
            className="bg-transparent" 
            name="first_name" 
            placeholder="Martin" 
            type="text" 
            {...register("first_name", {
              required: true
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="last_name">LAST NAME</label>
          <input 
            className="bg-transparent" 
            name="last_name"
            placeholder="Reyes" 
            type="text" 
            {...register("last_name", {
              required: true
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">EMAIL</label>
          <input
            className="bg-transparent"
            name="email"
            placeholder="martin.reyes@unmsm.edu.pe"
            type="email"
            {...register("email", {
              required: true
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">PASSWORD</label>
          <input
            className="bg-transparent"
            name="password"
            placeholder="******"
            type="password"
            {...register("password", {
              required: true
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone">PHONE</label>
          <input
            className="bg-transparent"
            name="phone"
            placeholder="934037572"
            type="text"
            {...register("phone", {
              required: true
            }) }
          />
        </div>

        <button 
          className="bg-naranja border-white border-2 hover:bg-gris-azulado mt-6 py-3 rounded-md self-center transition-colors w-56">
          Sign up
        </button>
      </form>
    </TemplateAuth>
  );
};
