interface TitlePros {
    children: string
}

const Title = ({ children }: TitlePros) => {
    return (
        <h1 className="my-5 font-bold text-2xl text-black text-center">
            {children}
        </h1>
    )
}

export default Title;