interface HeadingProps {
    title: string
    description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-md text-muted-foreground">{description}</p>
        </div>
    )
}
