import {Routes, Route} from 'react-router-dom'

import { AddPost } from '../pages/blog'
import { HomePage, MyHomePage } from '../pages'
import { LoginPage, RegisterPage } from '../pages/auth'
import { PrivateRouter, PublicRouter } from './index'


export const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route element={<PublicRouter />}>
          <Route path='GO_BLOGFRONTEND/register' element={<RegisterPage />}/>
          <Route path='GO_BLOGFRONTEND/login' element={<LoginPage />}/>      
        </Route>
              
        <Route element={<PrivateRouter />}>
          <Route path='GO_BLOGFRONTEND/home' element={<HomePage />} />
          <Route path='GO_BLOGFRONTEND/' element={<MyHomePage />}>
            <Route path='/GO_BLOGFRONTEND/post' element={<AddPost />} />
          </Route>
        </Route>
      </Route>
    </Routes>
    
  )
}
