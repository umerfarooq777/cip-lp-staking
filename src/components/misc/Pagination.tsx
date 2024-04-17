import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex items-center gap-2">
          {/* Previous Button */}
            <li className={`page-item`}>
              <button
                className={`aspect-square w-9 p-1 rounded-full bg-neutral-800 flex items-center justify-center disabled:opacity-50 disabled:cursor-no-drop text-primary`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage == 1}
              >
                <BsChevronLeft />
              </button>
            </li>

          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className={`aspect-square w-9 text-sm p-1 rounded-full ${
                  currentPage === page ? "bg-primary" : "bg-neutral-900"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next Button */}
            <li className={`page-item`}>
              <button
                className={`aspect-square w-9 p-1 rounded-full bg-neutral-800 flex items-center justify-center disabled:opacity-50 disabled:cursor-no-drop text-primary`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled = {!(currentPage < totalPages)}  
              >
                <BsChevronRight />
              </button>
            </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
