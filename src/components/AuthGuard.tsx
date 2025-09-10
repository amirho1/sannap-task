import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken || accessToken === null) navigate("/", { replace: true });
  }, [navigate]);

  return accessToken && children;
}
