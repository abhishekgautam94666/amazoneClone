"use client";
import React, { useEffect } from "react";
import SingleProduct from "@/components/SingleProduct";
import { useParams } from "next/navigation";
import { useSupabase } from "@/hooks/useSupabase";
const page = () => {
  const { id } = useParams();
  const { singleProduct, getSingleProduct } = useSupabase();

  useEffect(() => {
    getSingleProduct(Number(id));
  }, []);

  console.log(singleProduct);
  return (
    <div>
      <SingleProduct singleProduct={singleProduct} />
    </div>
  );
};

export default page;
