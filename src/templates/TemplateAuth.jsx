
export const TemplateAuth = ({children}) => {
  return (
    <section className="bg-azul-oscuro font-roboto">
        <div className="gap-10 grid max-w-screen-2xl mx-auto min-h-screen overflow-hidden place-content-evenly px-2 py-4 text-white md:grid-cols-2">
            {children}
        </div>
    </section>
  )
}
