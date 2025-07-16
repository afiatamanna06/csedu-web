// hooks/useFaculty.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Faculty {
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  rank: string;
  interests: string[];
}

const fetchFaculty = async (): Promise<unknown[]> => {
  const res = await axios.get(
    "https://csedu-backend-45fs.onrender.com/teacher/all"
  );
  return res.data;
};

export function useFaculty() {
  return useQuery<unknown[], Error>({
    queryKey: ["faculty"],
    queryFn: fetchFaculty,
  });
}
