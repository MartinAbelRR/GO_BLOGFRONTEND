import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: {},
            isAuth: false,
            login: (user) => set(
                () => ({
                    user,                    
                    isAuth: true
                })
            ),
            logout: () => set(
                () => ({
                    user: {},
                    isAuth: false
                })
            )            
        }),
        {
            name: 'auth'
        }
    )
)