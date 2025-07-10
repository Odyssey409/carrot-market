"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import ListProducts from "./list-product";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductsListProps {
  initialProducts: InitialProducts;
}

export default function ProductsList({ initialProducts }: ProductsListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-5 p-5">
      {products.map((product) => (
        <ListProducts key={product.id} {...product} />
      ))}
      {isLastPage ? null : (
        <button
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          onClick={onLoadMoreClick}
        >
          {isLoading ? "로딩중..." : "더보기"}
        </button>
      )}
    </div>
  );
}
