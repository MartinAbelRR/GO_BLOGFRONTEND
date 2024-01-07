import {Routes, Route} from 'react-router-dom'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { AddPost } from '../pages/blog/AddPost'
import { PrivateRouter } from './private/PrivateRouter'
import { PublicRouter } from './public/PublicRouter'
import { MyHomePage } from '../pages/MyHomePage'
import { HomePage } from '../pages/HomePage'


export const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route element={<PublicRouter />}>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>      
        </Route>
              
        <Route element={<PrivateRouter />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/' element={<MyHomePage />}>
            <Route path='/post' element={<AddPost />} />
          </Route>
        </Route>
      </Route>
    </Routes>
    
  )
}
