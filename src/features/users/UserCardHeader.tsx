import { ReactNode } from "react";
import styles from "./users.module.css";
import { JSX } from "react/jsx-runtime";

interface UserCardHeaderProps {
  children: ReactNode;
}

export const UserCardHeader = ({ children }: UserCardHeaderProps): JSX.Element => {
  return (
    <div className={styles.userCardHeader}>
      {children}
    </div>
  );
};
