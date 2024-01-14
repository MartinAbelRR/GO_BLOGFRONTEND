import {useQuery} from '@tanstack/react-query'
import { getUniquePost } from '../api'
import { Header } from '../components'
import {Outlet} from 'react-router-dom'


export const MyHomePage = () => {
    const {data} = useQuery({
        queryKey: ['blog'],
        queryFn: getUniquePost
      })

      console.log(data);
      
  return (
    <>
      <Outlet />                    
      <Header data={data}/>
    </>
  )
}
