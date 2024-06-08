"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSupabase } from "@/hooks/useSupabase";
import SearchResult from "@/components/searchResult";

const Page = () => {
  const { query } = useParams();
  const { filterData, getFilteredData } = useSupabase();

  useEffect(() => {
    getFilteredData(query.toString());
  }, [query, getFilteredData]);

  return (
    <div>
      <SearchResult filterData={filterData} />
    </div>
  );
};

export default Page;
