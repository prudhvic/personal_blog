"use client";

import { useRouter } from "next/navigation";

const ButtonBack = () => {
  let router = useRouter();
  return <button className="btn-back" onClick={() => router.push("/")}>Back</button>;
};
export default ButtonBack;
