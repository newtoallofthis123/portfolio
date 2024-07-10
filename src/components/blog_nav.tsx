import React from 'react';
import '../styles/nav.css';
import { motion } from 'framer-motion';

export default function BlogNav({
    color = '#000',
    bg = '#fff',
}: {
    //Optional color prop
    color?: string;
    bg?: string;
}) {
    const [nav, setNav] = React.useState(false);
    return (
        <>
            <nav
                style={{
                    backgroundColor: bg,
                    color: color,
                }}
                className="bg-white dark:bg-black"
            >
                <div id="nav">
                    <div className="flex flex-row border-b-2 border-black dark:border-white justify-center items-center p-5">
                        <a
                            href="/blog"
                            className="
                    px-5
                    nav-title font-bold text-center text-4xl
                    no-underline
                    lg:text-7xl
                    "
                            style={{
                                fontFamily: '"Archivo Black", sans-serif',
                            }}
                        >
                            Ishan Writes
                        </a>
                        <div
                            onClick={() => setNav(!nav)}
                            className="space-y-1 cursor-pointer z-50 lg:hidden"
                        >
                            <motion.span
                                animate={{
                                    rotateZ: nav ? 45 : 0,
                                    y: nav ? 8 : 0,
                                }}
                                className="block h-0.5 w-8 bg-black dark:bg-white"
                            ></motion.span>
                            <motion.span
                                animate={{
                                    opacity: nav ? 0 : 1,
                                }}
                                className="block h-0.5 w-8 bg-black dark:bg-white"
                            ></motion.span>
                            <motion.span
                                animate={{
                                    rotateZ: nav ? -45 : 0,
                                    y: nav ? -8 : 0,
                                }}
                                className="block h-0.5 w-8 bg-black dark:bg-white"
                            ></motion.span>
                        </div>
                        {nav && (
                            <motion.div
                                className="fixed flex bg-white dark:bg-black bottom-0 left-0 w-full h-screen items-center justify-center"
                                animate={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 25 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ul className="flex flex-col gap-4">
                                    {[
                                        'about',
                                        'archive',
                                        'latest',
                                        'lucky',
                                        'author',
                                    ].map((link) => (
                                        <li key={link} className="text-2xl">
                                            <a
                                                href={`/blog/${link}`}
                                                className="special_underline"
                                            >
                                                {link.charAt(0).toUpperCase() +
                                                    link.slice(1)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </div>
                    <ul
                        className="
                        hidden gap-x-8
                        lg:flex flex-row p-1 justify-center
                        "
                    >
                        {['about', 'archive', 'latest', 'lucky', 'author'].map(
                            (link) => (
                                <li key={link} className="text-xl">
                                    <a
                                        href={`/blog/${link}`}
                                        className="special_underline"
                                    >
                                        {link.charAt(0).toUpperCase() +
                                            link.slice(1)}
                                    </a>
                                </li>
                            )
                        )}
                        <li>
                            <div className="search_container">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        typeof window !== 'undefined' &&
                                            (window.location.href = `/blog/search/${e.currentTarget.text.value}`);
                                    }}
                                >
                                    <input
                                        placeholder="Enter To Search"
                                        required={true}
                                        className="input"
                                        name="text"
                                        type="text"
                                    />
                                </form>
                                <div className="icon">
                                    <svg
                                        viewBox="0 0 512 512"
                                        className="ionicon"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Search</title>
                                        <path
                                            strokeWidth="32"
                                            strokeMiterlimit="10"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                                        ></path>
                                        <path
                                            d="M338.29 338.29L448 448"
                                            strokeWidth="32"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="none"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
