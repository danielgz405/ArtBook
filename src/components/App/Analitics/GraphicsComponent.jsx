import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { app } from '../../../credentials';
import CardsInfo from './CardsInformation';
import Grafics from './GraphicsUx';

const db = getFirestore(app);

export default function GraphicsComponent({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Post'));
        const listPosts = [];
        querySnapshot.forEach((doc) => {
          listPosts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(listPosts);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  return (
    <main className="flex-1 p-8">
      <div>
        <CardsInfo user={user} posts={posts} />
        <Grafics user={user} posts={posts} />
      </div>
    </main>
  );
}
