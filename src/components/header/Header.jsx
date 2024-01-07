import { NavBar } from "./NavBar"
import { Container } from '../../templates/Container';
import { Card } from '../utilities/Card';

export const Header = ({data, hidden}) => {  
  return (    
    <header>
        <section className="bg-azul-semioscuro fixed w-full">
          <Container>
            <NavBar />
          </Container>
        </section>

        <section className="bg-custom py-4 pt-28 min-h-screen h-full">
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
