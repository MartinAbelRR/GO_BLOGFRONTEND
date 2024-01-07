import { authAxi, axi } from "./useAxios"

export const getBlogs = async (page) => {
    const response = await authAxi.get(`/api/allpost?page=${page}`)    
    return response.data
}

export const getUniquePost = async () => {
    const response = await authAxi.get('/api/uniquepost')
    return response.data
}


export const createPost = async (body) => {
    const response = await authAxi.post('/api/post', {...body})
    return response.data
}

export const deletePost = async (id) => {
    const response = await authAxi.delete(`/api/deletepost/${id}`)
    return response.data
}