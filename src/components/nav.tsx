type Props = {
    title?: string;
    emoji?: string;
};

export default function Nav({ title, emoji }: Props) {
    return (
        <nav className="flex md:flex-row flex-col justify-between items-center p-2 md:border-2 border-b-2 border-dark dark:border-neutral-200 md:my-4">
            <div className="md:my-0 mb-3">
                <a href="/" className="p-1 text-xl bg-mred font-bold">
                    <span className="text-white bg-dark px-3">
                        {emoji ?? '@'}
                    </span>{' '}
                    {title ?? 'NoobScience'}
                </a>
            </div>
            <div>
                {['projects', 'blog', 'stuff', 'contact'].map((item, index) => (
                    <a
                        href={`/${item}`}
                        key={index}
                        className="mx-2 hover:bg-myellow hover:text-dark p-1"
                    >
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
}
