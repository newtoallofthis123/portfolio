type Props = {
    title?: string;
    emoji?: string;
};

export default function Nav({ title, emoji }: Props) {
    return (
        <nav className="flex flex-row justify-between items-center p-2 border-2 border-neutral-200 my-4">
            <div>
                <a href="/" className="p-1 text-xl bg-red font-bold">
                    <span className="text-white bg-dark px-3">{emoji ?? '@'}</span> {title ?? 'NoobScience'}
                </a>
            </div>
            <div>
                {['projects', 'blog', 'stuff', 'contact'].map((item, index) => (
                    <a
                        href={`/${item}`}
                        key={index}
                        className="mx-2 hover:bg-yellow hover:text-dark p-1"
                    >
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
}
