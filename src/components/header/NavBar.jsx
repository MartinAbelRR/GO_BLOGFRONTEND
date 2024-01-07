import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../api/users";

export const NavBar = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: () => logoutRequest(),
    onSuccess: (response) => {
      console.log(response?.data?.user);
      navigate('/login');
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    }
  })

  const logout = () => {
    logoutMutation.mutate()
  }


  return (
    <nav className="flex h-20 items-center justify-between">
      <h1 className="font-bold italic text-4xl">Golang Blog</h1>

      <input id="menu" type="checkbox" className="hidden peer/menu" />
      <label
        htmlFor="menu"
        className="bg-center bg-cover bg-menu-open bg-gris-azulado cursor-pointer h-10 peer-checked/menu:bg-menu-close rounded-lg transition-all w-10 z-40 md:hidden"
      ></label>

      <ul className="auto-rows-max bg-white clip-circle-0 duration-500 fixed font-bold gap-6 grid inset-0 peer-checked/menu:clip-circle-full place-content-center place-items-center px-[5%] text-black text-2xl transition-[clip-path] md:bg-transparent md:clip-circle-full md:grid-flow-col md:p-0 md:relative md:text-white">
        <li>
          <a            
            className="duration-[1000ms] hover:text-gris-azulado peer-checked/menu:clip-circle-0"
            onClick={() => navigate('/home')}
          >
            Home
          </a>
        </li>

        <li>
          <a
            onClick={() => navigate('/post')}
            className="duration-[1000ms] hover:text-gris-azulado"
          >
            Create Post
          </a>
        </li>

        <li>
          <a
            className="duration-[1000ms] hover:text-gris-azulado"
            onClick={() => navigate('/')}
          >
            My Post
          </a>
        </li>
        <li>
          <a
            href="#contacto"
            className="duration-[1000ms] hover:text-gris-azulado"
            onClick={logout}
          >
            Log Out
          </a>
        </li>
      </ul>
    </nav>
  );
};
