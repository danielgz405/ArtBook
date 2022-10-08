import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import HomeComponent from '../components/App/Home/Home';
import { app } from '../credentials';

const auth = getAuth(app);

export default function ArtBook({ toast }) {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });
  console.log(user);
  return (
    <>
      <HomeComponent user={user} toast={toast} />
    </>
  );
}
