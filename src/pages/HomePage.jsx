import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import { Header } from "../components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet } from "react-router-dom";

export const HomePage = () => {
  const {ref, inView} = useInView()

  const { data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({pageParam = 1}) =>  getPosts(pageParam),
    getNextPageParam: (pages) => {
      console.log(pages);
      if(pages.meta.last_page + 1 == pages.meta.page){
        return
      }
      return pages.meta.page + 1
    }
  });
  
  useEffect(() => {
    if(inView) {
      fetchNextPage();
    }
  }, [inView])

  const blogs = data?.pages.reduce((prevMovies, page) => prevMovies.concat(page.data), []) ?? [];

  return (
    <>
      <Outlet />
      <Header data={blogs} hidden={true} />
    
      {!isLoading &&
        data?.pages?.length !== undefined &&
        data.pages.length > 0 &&
        hasNextPage && (
          <div ref={ref}>
            {isLoading || isFetchingNextPage ? <span className="text-3xl">Loader</span> : null}
          </div>
        )}
    </>
  );
};
