import { useState } from 'react';
import LoginComponent from '../components/Home/Login/Login';
import RegisterComponent from '../components/Home/Login/Register';

export default function LoginPage({ toast }) {
  const [login, setLogin] = useState(false);
  console.log(login);
  return (
    <div className="h-screen">
      {login && <LoginComponent setLogin={setLogin} toast={toast} />}
      {!login && <RegisterComponent setLogin={setLogin} toast={toast} />}
    </div>
  );
}
