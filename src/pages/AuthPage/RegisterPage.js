import React, {useState} from 'react';
import RegisterContainer from "../../containers/FormContainer/RegisterContainer";


export default function RegisterPage(){
    const [registered, setRegister] = useState(false);

    const handleRegister = () => {
        setRegister(true);
    };

    return (
        <main>
            <RegisterContainer onSubmit={handleRegister}/>
        </main>
    );
}