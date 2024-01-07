import { Header } from '../components/header/Header'
import {Outlet} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import { getUniquePost } from '../api/blog'


export const MyHomePage = () => {
    const {data} = useQuery({
        queryKey: ['blog'],
        queryFn: getUniquePost
      })

      
  return (
    <>
      <Outlet />                    
      <Header data={data}/>
    </>
  )
}
