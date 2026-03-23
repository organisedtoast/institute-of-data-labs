// NB: this line of code was copied from 
// institute-of-data-labs\module7\exercise12345\components\Login.jsx

// I adapted it for use in a Next.js page component by simply adding a 'use client' directive

// Other than that, there were no changes to the code at all.

'use client';

import { useState } from 'react';

export default function Login() {
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
