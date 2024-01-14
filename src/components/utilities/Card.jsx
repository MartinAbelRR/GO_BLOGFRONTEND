import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deletePost } from '../../api';

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
        <h2 className="text-center text-3xl">{blog.title.length < 15 ? blog.title : blog.title.substring(0, 18) + '...'}</h2>
        <p>{blog.desc.length < 30 ? blog.desc + '.' : blog.desc.substring(0, 40) + ' ...'}</p>
        <div className="flex items-center justify-between">
          <p className="capitalize font-bold text-xl">
            Author:{" "}
            <span className="bg-naranja/50 font-normal hover:bg-naranja p-1 rounded-md transition-colors">
              {blog.user.first_name} {blog.user.last_name}
            </span>
          </p>
          <AiOutlineDelete
            className={`cursor-pointer ${isHidden ? 'hidden': ''} hover:text-red-600 h-7 transition-colors w-7`}
            onClick={() => onDelete(blog.id)}
          />
        </div>
      </div>
    </article>
  );
};
