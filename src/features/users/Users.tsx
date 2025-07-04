import type { JSX, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { useEffect, useState } from "react";
import styles from "./users.module.css";
import { useGetUsersQuery } from "./usersApiSlice";
import { UserCard } from "./UserCard"; 
import { UserCardHeader } from "./UserCardHeader"
import { useUserFiltering } from "../../app/useUserFiltering";

export const Users = (): JSX.Element | null => {
  const { data, isError, isLoading, isSuccess, refetch } = useGetUsersQuery();

  const {
    filter,
    setFilter,
    count,
    setCount,
    filteredAndLimitedUsers,
  } = useUserFiltering(data);

  useEffect(() => {
    setInterval(() => {
      void refetch();
    }, 30000);
  }, [refetch]);

  if (isError) {
    return <p>An error occurred</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isSuccess) {

    return (
      <>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Filter users..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className={styles.filterInput}
          />
          <input
            type="number"
            placeholder="count"
            value={count}
            onChange={(e) => {
              if (e.target.value === '' || /^\d+$/.test(e.target.value) && parseInt(e.target.value) <= 10) { // Regex to allow only digits
                setCount(e.target.value);
              }
            }}
            className={styles.countInput}
          />
        </div>
        {filteredAndLimitedUsers.map(( user) => (
          <UserCard>
            <div className={styles.userImageContainer}>
              <img src={"/assets/profile.png"} className={styles.userImage} />
            </div>
            <UserCardHeader>{user.username}</UserCardHeader>
            <div className={styles.userCardBody}>
              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          </UserCard>
        ))}
      </>
    );
  }

  return null;
};
