import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, onPageChange, currentPage, pageSize } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation" className="w-25  m-auto d-block">
      <ul key="pagination" className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={
              page === currentPage
                ? "page-link page-item active bg-primary text-white rounded"
                : " page-link page-item menuElement rounded"
            }
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
