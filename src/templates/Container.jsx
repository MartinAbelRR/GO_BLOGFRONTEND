
export const Container = ({className, children}) => {
  return (
    <div className={`${className} max-w-screen-xl mx-auto overflow-hidden w-[90%]`}>
        {children}
    </div>    
  )
}
