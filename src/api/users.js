import { useAuthStore } from "../store/auth"
import { authAxi, axi } from "./useAxios"

export const registerRequest = async (body) => {
    const response = await axi.post("/api/register", {...body})
    return response
}

export const loginRequest = async ({email, password}) => {
    const response = await authAxi.post("/api/login", {
        email,
        password
    })

    useAuthStore.getState().login(response.data.user, true)

    return response;    
}

export const logoutRequest = async() => {
    const response = await axi.post("/api/logout")
    useAuthStore.getState().logout()

    return response;
}