import { useState, useMemo } from 'react';
import { User } from '../features/users/usersApiSlice';

interface UseUserFilteringResult {
  filter: string;
  setFilter: (filter: string) => void;
  count: string;
  setCount: (count: string) => void;
  filteredAndLimitedUsers: User[];
}

//useUserFiltering this provides state and memoized logic for filtering and limiting a list of users based on a text filter and a display count

export const useUserFiltering = (users: User[] | undefined): UseUserFilteringResult => {
  const [filter, setFilter] = useState<string>("");
  const [count, setCount] = useState<string>("5"); //initial kept at 5
  const filteredAndLimitedUsers = useMemo(() => {
    if (!users) {
      return [];
    }

    const numericCount = parseInt(count, 10);
    const displayCount = (isNaN(numericCount) || numericCount < 0) ? 10 : numericCount;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
    ).slice(0, displayCount);
  }, [users, filter, count]);
  return {
    filter,
    setFilter,
    count,
    setCount,
    filteredAndLimitedUsers,
  };
};