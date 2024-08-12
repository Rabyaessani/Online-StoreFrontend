import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  console.log(meta);
  const { page, pageCount } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChanges = (pageNumber) => {
    const Searchparams = new URLSearchParams(search);
    Searchparams.set("page", pageNumber);
    navigate(`${pathname}?${Searchparams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`join-item btn btn-xs sm:btn-md border-none ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
        onClick={() => handlePageChanges(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButton = [];
    // First Button
    pageButton.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    //Dots
    if (page > 2) {
      pageButton.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    if (page !== 1 && page !== pageCount) {
      pageButton.push(
        addPageButton({ pageNumber: page, activeClass: page === true })
      );
    }

    if (page < pageCount - 1) {
      pageButton.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }

    // Last Button

    pageButton.push(
      addPageButton({
        pageNumber: pageCount,
        activeClass: page === pageCount,
      })
    );

    return pageButton;
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
        {renderPageButtons()}
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

export default ComplexPaginationContainer;
