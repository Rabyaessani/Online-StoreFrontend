import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  console.log(meta)
  const { page, pageCount } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  // console.log('uiu',pages.length);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChanges = (pageNumber) => {
    const Searchparams = new URLSearchParams(search);
    // console.log(Searchparams.toString());
    Searchparams.set("page", pageNumber);
    // console.log(Searchparams.toString());
    navigate(`${pathname}?${Searchparams.toString()}`);
    // console.log(pathname);
    // console.log(pageNumber);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="join-item btn btn-xs sm:btn-md"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChanges(prevPage);
          }}
        >
          PREV
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-xs sm:btn-md border-none ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              onClick={() => handlePageChanges(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="join-item btn btn-xs sm:btn-md"
          onClick={() => {
            let NextPage = page + 1;
            if (NextPage > pageCount) NextPage = 1;
            handlePageChanges(NextPage);
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
