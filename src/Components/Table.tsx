/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState } from "react";
import { Search } from "@mui/icons-material";

const StatusBadge = ({ status }: any) => {
  const badgeClass =
    status === "Closed"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-full text-center ${badgeClass}`}
      style={{ width: "100px" }} 
    >
      {status}
    </span>
  );
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }: any) => (
  <div className="flex justify-center items-center mt-4">
    <div className="flex space-x-2">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
      >
        &larr;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === page
              ? "bg-purple-500 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
      >
        &rarr;
      </button>
    </div>
  </div>
);

const Table = ({ columns, data, onAction, allowedActions }: any) => {
  const rowsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState(
    columns.reduce((acc: any, col: any) => {
      acc[col.key] = "";
      return acc;
    }, {})
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  let currentData = data.slice(startIndex, startIndex + rowsPerPage);

  
  if (globalSearchQuery) {
    currentData = currentData.filter((row: any) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(globalSearchQuery.toLowerCase())
    );
  }

 
  Object.keys(columnFilters).forEach((key) => {
    if (columnFilters[key]) {
      currentData = currentData.filter((row: any) =>
        String(row[key]).toLowerCase().includes(columnFilters[key].toLowerCase())
      );
    }
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-[1050px]">
     
      <div className="border-b py-4 flex items-center mb-4 space-x-2">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="px-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </div>
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col: any, index: any) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b"
              >
                {col.header}
                {col.filterable && (
                  <>
                    {col.dropdownOptions ? ( 
                      <select
                        value={columnFilters[col.key]}
                        onChange={(e) =>
                          setColumnFilters({
                            ...columnFilters,
                            [col.key]: e.target.value,
                          })
                        }
                        className="mt-2 px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        style={{ fontSize: "13px" }}
                      >
                        <option value="">All</option>
                        {col.dropdownOptions.map((option: string, idx: number) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={`Filter ${col.header}`}
                        value={columnFilters[col.key]}
                        onChange={(e) =>
                          setColumnFilters({
                            ...columnFilters,
                            [col.key]: e.target.value,
                          })
                        }
                        className="mt-2 px-2 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        style={{ fontSize: "13px" }}
                      />
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row: any, rowIndex: any) => (
              <tr key={rowIndex}>
                {columns.map((col: any, colIndex: any) => (
                  <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                    {col.key === "status" ? (
                      <StatusBadge status={row[col.key]} />
                    ) : col.key === "action" ? (
                      <div className="flex space-x-2">
                        {allowedActions.edit && (
                          <img
                            src="/images/fi-rr-edit.svg"
                            width={16}
                            height={16}
                            onClick={() => onAction("edit", row)}
                            className="cursor-pointer text-blue-500 hover:text-blue-700"
                          />
                        )}
                        {allowedActions.view && (
                          <img
                            src="/images/fi-rr-eye.svg"
                            width={20}
                            height={20}
                            onClick={() => onAction("view", row)}
                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                          />
                        )}
                        {allowedActions.delete && (
                          <img
                            src="/images/fi-rr-trash.svg"
                            width={16}
                            height={20}
                            onClick={() => onAction("delete", row)}
                            className="cursor-pointer text-red-500 hover:text-red-700"
                          />
                        )}
                      </div>
                    ) :  col.htmlContent ? ( 
                      <div
                        dangerouslySetInnerHTML={{ __html: row[col.key] }}
                      />
                    ) : (
                      row[col.key]
                    )}
                   
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-3 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Table;
