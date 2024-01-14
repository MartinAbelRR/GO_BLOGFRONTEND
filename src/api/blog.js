import { authAxi } from "./useAxios"

export const createPost = async (body) => {
    await authAxi.post('/api/post', {...body})    
}

export const deletePost = async (id) => {
    await authAxi.delete(`/api/deletepost/${id}`)    
}

export const getPosts = async (page) => {
    const response = await authAxi.get(`/api/allpost?page=${page}`)        
    return response.data
}

export const getUniquePost = async () => {
    const response = await authAxi.get('/api/uniquepost')
    return response.data
}


