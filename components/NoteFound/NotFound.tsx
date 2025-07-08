"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import css from "./NotFound.module.css";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const fallBackTimer = setTimeout(() => router.push("/"), 4000);
    return () => clearTimeout(fallBackTimer);
  }, [router]);

  return (
    <div className={css.center}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.text}>
        Sorry, the page you&#39;re looking for doesn&#39;t exist.
      </p>
      <button onClick={() => router.push("/")} className={css.homeButton}>
        Go home
      </button>
    </div>
  );
}