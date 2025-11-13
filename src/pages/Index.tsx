import { useState } from 'react';
import Auth from './Auth';
import Messenger from './Messenger';

export default function Index() {
  const [user, setUser] = useState<{ username: string; userId: number } | null>(null);

  const handleAuth = (username: string, userId: number) => {
    setUser({ username, userId });
  };

  if (!user) {
    return <Auth onAuth={handleAuth} />;
  }

  return <Messenger user={user} />;
}
