import { Tweet } from 'react-tweet'

export default function Nav({ id }) {
    return (
        <div className='tweet'>
            <Tweet id={id} />
        </div>
    );
}
