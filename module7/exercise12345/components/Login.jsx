function Login() {
    
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    return (
        <div className="LoginForm componentBox">
            <div className="formRow">
                <label>Email Address:


                    <input type="email" value={userEmail} name="userEmail"
                        onChange={(e) => setUserEmail(e.target.value)} />
                </label>
            </div>
            <div className="formRow">
                <label>Password:
                    <input type="password" value={userPassword} name="password"
                        onChange={(e) => setUserPassword(e.target.value)} />
                </label>
            </div>
        </div>
    )
}

export default Login