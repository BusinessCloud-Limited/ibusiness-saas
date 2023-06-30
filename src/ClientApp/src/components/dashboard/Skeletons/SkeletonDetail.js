import SkeletonElement from "./SkeletonElement";
import "./Skeleton.css";
import Shimmer from "./Shimmer";

const SkeletonDetail = () => {
  return (
    <main className="lg:rounded-md h-screen md:h-full flex flex-col gap-3 lg:shadow-xl p-0 lg:p-5">
      <section className="skeleton-wrapper">
        <SkeletonElement type="title" />
        <hr className="border h-0 border-gray-200" />
        <section className="flex flex-wrap gap-4 justify-between">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <article
              key={n}
              className="w-full md:w-[45%] lg:w-[48%] flex justify-between gap-1 items-center border-b border-gray-300"
            >
              <SkeletonElement type="title" />
              <SkeletonElement type="text" />
              <Shimmer />
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default SkeletonDetail;
