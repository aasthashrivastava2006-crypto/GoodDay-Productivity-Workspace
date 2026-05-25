import React from 'react';

import { useUser } from '@/context/UserContext';

/**
 * Displays a greeting with the current user's name.
 * Falls back to "Guest" when no user is logged in.
 */
const UserGreeting: React.FC = () => {
  const { user } = useUser();
  const name = user?.name || 'Guest';
  return (
    <h1 className="text-2xl font-bold tracking-tight dark:text-white">
      Good morning, {name}
    </h1>
  );
};

export default UserGreeting;
