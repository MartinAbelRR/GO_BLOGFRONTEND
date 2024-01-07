import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deletePost } from '../../api/blog';

export const Card = ({blog, isHidden = false}) => {
    const queryClient = useQueryClient();
  
    const deleteMutation = useMutation({
      mutationFn: (id) => deletePost(id),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["blog"]})
        queryClient.invalidateQueries({queryKey: ["blogs"]})
        toast.success("Post deleted!");
      },
      onError: () => {
        toast.error("Error!");
      }
    })
  
    const onDelete = (idPost) => {
      deleteMutation.mutate(idPost)
    }

  return (
    <article      
      className="bg-azul-semioscuro/60 mx-auto overflow-hidden pb-6 rounded-xl shadow-xl w-[300px]"
    >
      <img
        src={blog.image}
        className="block h-[200px] object-cover rounded-t-xl w-full"
      />
      <div className="px-2 py-2 space-y-6">
        <h1 className="text-center">{blog.title.length <10 ? blog.title : blog.title.substring(0, 16) + '...'}</h1>
        <p>{blog.desc.length < 20 ? blog.desc : blog.desc.substring(0, 20) + '...'}</p>
        <a
          href=""
          className="inline-block text-right text-naranja transition-colors hover:text-naranja/50"
        >
          {" "}
          Leer más...
        </a>
        <div className="flex justify-between items-center">
          <p className="font-bold capitalize">
            Author:{" "}
            <span className="bg-naranja/50 font-normal p-1 rounded-md transition-colors hover:bg-naranja">
              {blog.user.first_name} {blog.user.last_name}
            </span>
          </p>
          <AiOutlineDelete
            className={`cursor-pointer ${isHidden ? 'hidden': ''} h-7 transition-colors w-7 hover:text-red-600`}
            onClick={() => onDelete(blog.id)}
          />
        </div>
      </div>
    </article>
  );
};
