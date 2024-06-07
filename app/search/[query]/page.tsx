"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSupabase } from "@/hooks/useSupabase";
import SearchResult from "@/components/searchResult";

const page = () => {
  const { query } = useParams();
  const { filterData, getFilteredData } = useSupabase();

  useEffect(() => {
    getFilteredData(query.toString());
  }, []);

  return (
    <div>
      <SearchResult filterData={filterData} />
    </div>
  );
};

export default page;
