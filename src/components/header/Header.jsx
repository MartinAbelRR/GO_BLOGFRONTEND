import { NavBar } from "./"
import { Container } from '../../templates';
import { Card } from '../utilities';

export const Header = ({data, hidden}) => {  
  return (    
    <header>
        <section className="bg-azul-semioscuro fixed w-full">
          <Container>
            <NavBar />
          </Container>
        </section>

        <section className="bg-custom h-full min-h-screen py-4 pt-28">
          <Container>
            <div className='gap-4 grid grid-adaptable'>
              {data && data?.map(blog => (      
               <Card key={blog.id} blog={blog} isHidden={hidden} />                           
              ))}
            </div> 
          </Container>
        </section>
    </header>
    
  )
}
