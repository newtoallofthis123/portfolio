type Props = {
    title?: string;
    emoji?: string;
    color?: string;
};

export default function Nav({ title, emoji, color }: Props) {
    return (
        <nav className="flex md:flex-row flex-col justify-between items-center md:p-2 md:border-2 border-b-2 border-rosePineDawn-text dark:border-neutral-200 md:my-4">
            <div className="py-2 px-3 bg-rosePine-foam text-rosePine-overlay md:block md:w-fit w-full flex items-center">
                <a
                    href="/"
                    className={`text-xl font-bold flex gap-2 mx-auto`}
                >
                    <span>{emoji ?? "*"}</span>
                    {title ?? "NoobScience"}
                </a>
            </div>
            <div className="py-2 md:py-0 sm:text-base text-sm">
                {[["projects", "%"], ["blog", "?"], ["now", "!"], ["stuff", "+"], ["contact", "@"]].map((item, index) => (
                    <a
                        href={`/${item[0]}`}
                        key={index}
                        className="mx-2 text-black hover:bg-rosePine-gold dark:text-white dark:hover:text-black md:p-1 md:px-2 p-0.5 inline-block"
                    >
                        {item[1]}{item[0]}
                    </a>
                ))}
            </div>
        </nav>
    );
}
