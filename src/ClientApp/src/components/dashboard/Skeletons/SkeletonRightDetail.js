import React from "react";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonRightDetail = () => {
  return (
    <main className="flex flex-col gap-4 box-border">
      <section className="skeleton-wrapper">
        <article className="p-2">
          <SkeletonElement type="title" />
        </article>
        <hr className="border h-0 border-gray-200" />
        <article className="flex flex-col gap-2 items-center justify-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <article key={n} className="w-3/4">
              <SkeletonElement type="text" />
            </article>
          ))}
        </article>
        <Shimmer />
      </section>
    </main>
  );
};

export default SkeletonRightDetail;
