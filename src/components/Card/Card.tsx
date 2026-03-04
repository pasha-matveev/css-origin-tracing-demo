import styles from "./Card.module.css";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "promo";
};

export function Card({ children, variant = "default" }: CardProps) {
  return (
    <section className={`${styles.card} ${styles[variant]}`}>
      {children}
    </section>
  );
}