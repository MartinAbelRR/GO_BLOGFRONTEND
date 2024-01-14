import upload_image from "../../assets/upload-image.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";

import axios from "axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleSubmit, register } = useForm();
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [isSend, setIsSend] = useState(false);
  const { user } = useAuthStore();

  const postMutation = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: (response) => {
      console.log(response?.message);
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      toast.success("Post created with success!");
      navigate("/GO_BLOGFRONTEND/home");
    },
    onError: (error) => {
      toast.error("Error!");
      console.log(error?.response?.message);
    },
  });

  const handleImage = (e) => {
    console.log(e.target);
    setImageUpload(e.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({ [e.target.name]: reader.result });
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = null;
    }
  };

  const uploadImage = () => {
    let formData = new FormData(); // Formdata object

    formData.append("image", imageUpload); // Append the values with key pair
    formData.append("name", imageUpload.name);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };

    let url = `${import.meta.env.VITE_BACKEND_URL}/api/upload-image`;
    axios
      .post(url, formData, config)
      .then((response) => {
        setIsSend(true);
        setImageData(response?.data?.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    const body = {
      ...data,
      image: imageData,
      userid: String(user.id),
    };

    postMutation.mutate(body);
  };

  return (
    <section className="bg-black/50 flex fixed items-center justify-center min-h-full w-full z-10">
      <div className="bg-gris-azulado min-w-[300px] px-24 py-10 relative rounded-lg">
        <p
          className="absolute cursor-pointer font-bold hover:text-naranja pr-3 right-0 text-black text-4xl top-0 transition-[color]"
          onClick={() => navigate("/GO_BLOGFRONTEND")}
        >
          x
        </p>
        <form
          className="gap-4 grid text-azul-oscuro text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="gap-2 flex flex-col">
            <label className="font-bold" htmlFor="title">
              Title
            </label>
            <input
              className="bg-transparent border-b-4 border-naranja"
              name="title"
              placeholder="Title"
              type="text"
              {...register("title", {
                required: true,
              })}
            />
          </div>

          <div className="gap-2 flex flex-col">
            <label className="font-bold" htmlFor="desc">
              Description
            </label>
            <textarea
              name="desc"
              placeholder="Description"
              className="border-4 border-naranja max-h-[100px] max-w-full min-w-full min-h-[100px] outline-none p-2 w-full"
              {...register("desc", {
                required: true,
              })}
            ></textarea>
          </div>

          <label className="cursor-pointer" title="click to select a picture">
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
                <>
                  <div className="pt-2">
                    <div>
                      <img
                        className="p-5 w-60 -mt-8 -object-contain"
                        src={image ? image.image : ""}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className="bg-azul-oscuro focus:outline-none focus:shadow-outline font-bold hover:bg-azul-semioscuro/60 px-3 py-2 rounded shadow text-white transition-colors"
                      onClick={uploadImage}
                      type="button"
                    >
                      {" "}
                      Upload Image
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-4 border-naranja mb-2 mx-auto">
                  <img
                    className="h-full w-56"
                    src={upload_image}
                    style={{ background: "#EFEFEF" }}
                  />
                </div>
              )}
            </div>
          </label>

          <button
            className={`bg-azul-oscuro focus:outline-none focus:shadow-outline font-bold ${
              isSend ? "" : "hidden"
            } hover:bg-azul-semioscuro/60 mx-auto px-3 py-2 rounded shadow text-white transition-colors w-[156px]`}
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};
