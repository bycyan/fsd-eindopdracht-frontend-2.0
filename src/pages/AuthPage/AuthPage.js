import React, {useState} from 'react';
import FormContainer from '../../containers/FormContainer/FormContainer';


export default function AuthPage(){
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <main>
            <FormContainer onSubmit={handleLogin}/>
        </main>
    );
}