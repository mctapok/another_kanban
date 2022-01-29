import './Login.css'
import {useState} from "react";
import {useLogin} from "../../hooks/useLogin";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isPending, error} = useLogin();

    const handleSubmit =(e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>login</h2>
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

            {!isPending && <button className='btn'>login</button>}
            {isPending && <button className='btn' disabled>loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}