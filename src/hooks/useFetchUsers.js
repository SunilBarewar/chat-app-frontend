import { useEffect, useState } from "react";
import { searchUsers } from "../api/userRequests";
import useDebounce from "./useDebounce";

const useFetchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery);

  const fetchUsers = async () => {
    const cachedResult = JSON.parse(localStorage.getItem("searchResult"));
    if (!debouncedSearchQuery && cachedResult?.length) {
      setSearchResult(cachedResult);
      return;
    }
    try {
      setLoading(true);
      const { data } = await searchUsers(debouncedSearchQuery);
      console.log(data);
      // caching result for null query
      if (!debouncedSearchQuery) {
        localStorage.setItem("searchResult", JSON.stringify(data));
      }
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchQuery]);

  return { setSearchQuery, searchResult, loading };
};

export default useFetchUsers;
