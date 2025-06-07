type Props = {
  title?: string;
  emoji?: string;
  color?: string;
};

export default function Nav({ title, emoji, color }: Props) {
  return (
    <nav className="flex md:flex-row flex-col justify-between items-center md:p-2 md:my-4">
      <div className="py-2 px-3 md:block md:w-fit w-full flex items-center">
        <a href="/" className={`text-xl font-bold flex gap-2 mx-auto`}>
          {emoji ? (
            <div>
              <span>{emoji}</span>
              {title ?? "NoobScience"}
            </div>
          ) : (
            <div className="flex flex-row gap-x-2">
              <div>
                <img src={"/favicon.ico"} alt="favicon" className="w-6 h-6 mt-0.5" />
              </div>
              <div>NoobScience</div>
            </div>
          )}
        </a>
      </div>
      <div className="py-2 md:py-0 sm:text-base text-sm">
        {[
          ["projects", "%"],
          ["blog", "?"],
          ["now", "!"],
          ["stuff", "+"],
          ["contact", "@"],
        ].map((item, index) => (
          <a
            href={`/${item[0]}`}
            key={index}
            className="mx-2 md:p-1 md:px-2 p-0.5 inline-block hover:bg-yellow-300 rounded-[5px] "
          >
            {item[1]}
            {item[0]}
          </a>
        ))}
      </div>
    </nav>
  );
}
