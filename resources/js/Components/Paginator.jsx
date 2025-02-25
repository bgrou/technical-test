import React, { useEffect, useState } from "react";

const OFFSET = 4;

const Paginator = ({ pagination, pageChanged, totalItems }) => {
    const [pageNumbers, setPageNumbers] = useState([]);
    useEffect(() => {
        const setPaginationPages = () => {
            let pages = [];
            const { last_page, current_page, from, to } = pagination;
            if (!to) return [];
            let fromPage = current_page - OFFSET;
            if (fromPage < 1) fromPage = 1;
            let toPage = fromPage + OFFSET * 2;
            if (toPage >= last_page) {
                toPage = last_page;
            }
            for (let page = fromPage; page <= toPage; page++) {
                pages.push(page);
            }
            setPageNumbers(pages);
        };

        setPaginationPages();
    }, [pagination]);

    return (
        <nav className="flex items-center text-white justify-between p-6" aria-label="Page navigation example">
            <ul className="pagination flex space-x-4">
                <li className={`page-item ${pagination.current_page === 1 ? "opacity-50" : ""}`}>
                    <a className="page-link" onClick={() => pageChanged(1)}>
                        First
                    </a>
                </li>
                <li className={`page-item ${pagination.current_page === 1 ? "opacity-50" : ""}`}>
                    <a className="page-link" onClick={() => pageChanged(pagination.current_page - 1)}>
                        Previous
                    </a>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li
                        className={`page-item ${
                            pageNumber === pagination.current_page ? "text-secondary-mid" : ""
                        }`}
                        key={pageNumber}
                        onClick={() => pageChanged(pageNumber)}
                    >
                        <a className="page-link" href="#">
                            {pageNumber}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${pagination.current_page === pagination.last_page ? "opacity-50" : ""}`}>
                    <a className="page-link" href="#" onClick={() => pageChanged(pagination.current_page + 1)}>
                        Next
                    </a>
                </li>
                <li className={`page-item ${pagination.current_page === pagination.last_page ? "opacity-50" : ""}`}>
                    <a className="page-link" onClick={() => pageChanged(pagination.last_page)}>
                        Last
                    </a>
                </li>
            </ul>
            <span className="mt-2 ms-2">
                <i>
                    Showing {pagination.from} - {pagination.to} of {pagination.total} entries.
                </i>
            </span>
        </nav>
    );
};

export default Paginator;
