

export const TemplateAuth = ({children}) => {
  return (
    <section className="bg-background-image bg-cover bg-center font-roboto">
        <div className="min-h-screen gap-4 grid mx-auto max-w-screen-xl overflow-hidden px-2 py-4 text-white md:grid-flow-col">
            {children}
        </div>
    </section>
  )
}
