
import {useQuery} from '@tanstack/react-query'
import { getUniquePost } from '../api/blog'

export const getMyPost = () => {
    const {data} = useQuery({
        queryKey: ['post'],
        queryFn: getUniquePost
      })

    return data
}