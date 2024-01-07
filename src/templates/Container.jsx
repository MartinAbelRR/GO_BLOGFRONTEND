
export const Container = ({className, children}) => {
  return (
    <div className={`${className} mx-auto max-w-screen-xl overflow-hidden w-[90%]`}>
        {children}
    </div>    
  )
}
