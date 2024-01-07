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
      console.log(response?.data?.user);

      navigate("/login");
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
      <div className="gap-2 grid place-items-center max-w-xl self-center order-1 space-y-4 md:place-items-start md:-order-1">
        <div className="flex flex-col items-center space-y-1 md:items-start">
          <h1>Login</h1>
          <h2>¿Already have an account?</h2>
        </div>

        <button
          className="backdrop-blur-2xl border-white border-2 hover:bg-naranja max-w-72 py-3 rounded-md transition-colors w-52"
          onClick={() => navigate("/login")}
        >
          ¡Login now!
        </button>
      </div>

      <form 
        className="backdrop-blur-2xl flex flex-col gap-6 max-w-xl p-8 rounded-2xl self-center shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="tracking-wide text-center">Registration</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="first_name">FIRST NAME</label>
          <input 
            className="bg-transparent" 
            name="first_name" 
            type="text" 
            placeholder="Martin" 
            {...register("first_name", {
              required: true
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last_name">LAST NAME</label>
          <input 
            className="bg-transparent" 
            name="last_name"
            type="text" 
            placeholder="Reyes" 
            {...register("last_name", {
              required: true
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">EMAIL</label>
          <input
            className="bg-transparent"
            name="email"
            type="email"
            placeholder="martin.reyes@unmsm.edu.pe"
            {...register("email", {
              required: true
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">PASSWORD</label>
          <input
            className="bg-transparent"
            name="password"
            type="password"
            placeholder="******"
            {...register("password", {
              required: true
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone">PHONE</label>
          <input
            className="bg-transparent"
            name="phone"
            type="text"
            placeholder="934037572"
            {...register("phone", {
              required: true
            }) }
          />
        </div>

        <button 
          className="border-white border-2 hover:bg-naranja mt-6 py-3 rounded-md transition-colors">
          Sign up
        </button>
      </form>
    </TemplateAuth>
  );
};
