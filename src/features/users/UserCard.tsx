import styles from "./users.module.css";
import { JSX } from "react/jsx-runtime";
import { ReactNode } from "react";

interface UserCardProps {
  children: ReactNode;
}

export const UserCard = ({ children }: UserCardProps): JSX.Element => {
  return (
    <div className={styles.userCard}>
      {children}
    </div>
  );
}