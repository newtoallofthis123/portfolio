type Props = {
    title?: string;
    emoji?: string;
    color?: string;
};

export default function Nav({ title, emoji, color }: Props) {
    // let options = ["gold", "foam"];
    // let ranChoice = options[Math.floor(Math.random() * options.length)];

    return (
        <nav className="flex md:flex-row flex-col justify-between items-center p-2 md:border-2 border-b-2 border-rosePineDawn-text  dark:border-neutral-200 md:my-4">
            <div className="md:my-0 mb-3">
                <a
                    href="/"
                    className={`p-1 text-xl bg-rosePine-foam text-rosePine-overlay font-bold w-full`}
                >
                    <span className="px-3">{emoji ?? "*"}</span>
                    {title ?? "NoobScience"}
                </a>
            </div>
            <div>
                {["projects", "blog", "now", "stuff", "contact"].map((item, index) => (
                    <a
                        href={`/${item}`}
                        key={index}
                        className="mx-2 hover:bg-rosePine-gold hover:text-black hover:text-dark p-1"
                    >
                        {item}
                    </a>
                ))}
            </div>
        </nav>
    );
}
