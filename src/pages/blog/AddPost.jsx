import { useForm } from "react-hook-form"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useAuthStore } from "../../store/auth"
import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { createPost } from "../../api/blog"
import { toast } from "react-hot-toast";
import upload_image from '../../assets/upload-image.svg';

import axios from 'axios'

export const AddPost = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const {user} = useAuthStore()
  const {handleSubmit, register} = useForm()
  const [image, setImage] = useState()
  const [imageData, setImageData] = useState()
  const [imageUpload, setImageUpload] = useState()  
  const [isSend, setIsSend] = useState(false)

  const postMutation = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: (response) => {      
      console.log(response?.message);
      queryClient.invalidateQueries({queryKey: ['blog']})
      toast.success('Post created with success!')
      navigate('/')
    },
    onError: (error) => {
      toast.error('Error!')
      console.log(error?.response?.message);
    }
  })

  const handleImage = (e) => {
    console.log(e.target);
    setImageUpload(e.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({[e.target.name]: reader.result})
    }

    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      e.target.value = null
    }
  }

  const uploadImage =() => {
    let formData = new FormData(); // Formdata object    

    formData.append('image', imageUpload); // Append the values with key pair
    formData.append('name', imageUpload.name)

    const config = {
      headers: {'content-type': 'multipart/form-data'},
      withCredentials: true,
    };

    let url = `${import.meta.env.VITE_BACKEND_URL}/api/upload-image`;
    axios.post(url, formData, config)
    .then((response) => {      
      setIsSend(true);
      setImageData(response?.data?.url);      
    })
    .catch((error) => {      
      console.log(error);
    });
  }

  const onSubmit = (data) => {
    const body = {
      ...data,
      image: imageData,
      userid: String(user.id)
    }    

    postMutation.mutate(body);
  }



  return (
    <section className="fixed bg-black/50  min-h-full flex items-center justify-center w-full z-10">
            <div className="bg-slate-300 min-w-[300px] px-24 py-14 relative rounded-lg">
              <p 
                className="absolute cursor-pointer font-bold pr-3 right-0 text-black text-3xl top-0 transition-[color] hover:text-red-600"
                onClick={() => navigate('/')}
              >x
              </p>              
              <form 
                className="gap-4 grid text-azul-oscuro"       
                onSubmit={handleSubmit(onSubmit)}               
         
              >
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="title">Title</label>
                  <input className="bg-transparent border-b-4 border-red-500" name="title" type="text" 
                  {...register('title', {
                      required: true
                    })
                  }
                  />                  
                </div>
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="desc">Description</label>
                  <textarea name="desc" placeholder="Description" className="border px-4 py-2 min-w-full max-w-full w-full min-h-[60px] max-h-[100px]" {...register('desc', {
                      required: true
                    })
                  } ></textarea>
                </div>
                <label title="click to select a picture">
                  <input
                      accept="image/*"
                      className="hidden"
                      id="banner"
                      type="file"
                      name="image"
                      onChange={handleImage}
                  />
                <div className="flex flex-col">
                  <div className="pb-2">Upload Image</div>

                  {image ? (
                    <div className="pt-2">
                      <div>
                        <img
                          className="-object-contain -mt-8 p-5 w-60"
                          src={image ? image.image : ""}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pb-1">
                      <img
                        src={upload_image}
                        style={{ background: "#EFEFEF" }}
                        className="h-full w-48"
                      />
                    </div>
                  )}
                </div>
              </label>

              <div className="flex items-center justify-center">
                <button
                  className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded"
                  onClick={uploadImage}                
                  type="button"
                > Upload Image             
                </button>
              </div>
              
              
               

            <button
                className={`shadow bg-indigo-600 hover:bg-indigo-400 ${isSend ? '': 'hidden'} focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded`}
              >
                Enviar
              </button>
              </form>
            </div>
          </section>
  )
}
