'use client';

import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();
  const handleSignIn = async () => {
    //handleSignInWithGoogle();
    router.refresh();
  };

  return (
    <div>
      <div>
        <button onClick={handleSignIn}>login</button>
      </div>
    </div>
  );
}