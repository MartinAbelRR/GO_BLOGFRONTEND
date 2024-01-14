import { useAuthStore } from "../store";
import { authAxi, axi } from "./useAxios";

export const registerRequest = async (body) => {
    await axi.post("/api/register", {...body})
}

export const loginRequest = async ({email, password}) => {
    const response = await authAxi.post("/api/login", {
        email,
        password
    })

    useAuthStore.getState().login(response.data.user, true)
}

export const logoutRequest = async() => {
    await axi.post("/api/logout")
    useAuthStore.getState().logout()
}