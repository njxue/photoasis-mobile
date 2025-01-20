import { Alert } from "react-native";
import { useEffect, useState } from "react";

function useAppwrite<T>(fn: (...args: any[]) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = fetchData;

  return { data, isLoading, refetch };
}

export default useAppwrite;
