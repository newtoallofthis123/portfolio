import { useState } from 'react';

export default function ContactForm({
    defaultEmail = '',
    defaultName = '',
    defaultBody = '',
}) {
    const [email, setEmail] = useState(defaultEmail);
    const [name, setName] = useState(defaultName);
    const [body, setBody] = useState(defaultBody);

    return (
        <div>
            <h2>
                <span className="font-base">Enter Your Name:</span>{' '}
            </h2>
            <input
                type="text"
                className="md:w-3/5 w-full p-1 border-2 border-black text-black rounded-md my-3"
                name="name"
                spellCheck="false"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <h2>
                <span className="font-base">
                    Your Email Where I can Reach You:
                </span>{' '}
            </h2>
            <input
                type="email"
                className="md:w-3/5 w-full p-1 border-2 border-black text-black rounded-md my-3"
                name="email"
                value={email}
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <h2>
                <span className="font-base">Your Message, Keep it clean:</span>{' '}
            </h2>
            <textarea
                name="message"
                placeholder="Message"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="md:w-3/5 w-full p-1 border-2 border-black text-black rounded-md my-3"
                rows="5"
            ></textarea>
            <br />
            <button
                className="btn py-2 border-black dark:border-white border-2 bg-rosePine-base dark:bg-rosePineDawn-base text-rosePine-text dark:text-rosePineDawn-text rounded-md px-2"
                type="submit"
            >
                Send The Mail
            </button>
        </div>
    );
}
