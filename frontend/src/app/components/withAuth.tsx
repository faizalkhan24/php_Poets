"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"; // Adjust the path as needed

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
