import './Signup.css'
import {useState} from "react";
import {useSignup} from "../../hooks/useSignup";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const {signup, error, isPending} = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0]
        console.log(selected);
        if (!selected) {
            setThumbnailError('u need to select a file')
            return;
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('selected file must be a image')
            return;
        }
        if (selected.size > 100000) {
            setThumbnailError('file must be less then 100 kb')
            return;
        }
        setThumbnailError(null);
        setThumbnail(selected);
        console.log('thumbnail updated')
    }


    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>email</span>
                <input type="email"
                       required
                       onChange={(event => setEmail(event.target.value))}
                       value={email}
                />
            </label>
            <label>
                <span>password</span>
                <input type="password"
                       required
                       onChange={(event => setPassword(event.target.value))}
                       value={password}
                />
            </label>
            <label>
                <span>display name</span>
                <input type="text"
                       required
                       onChange={(event => setDisplayName(event.target.value))}
                       value={displayName}
                />
            </label>
            <label>
                <span>profile thumbnail</span>
                <input type="file"
                       required
                       onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>
                    {thumbnailError}
                </div>}
            </label>
            {!isPending && <button className='btn'>sign up</button>}
            {isPending && <button className='btn' disabled>loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}