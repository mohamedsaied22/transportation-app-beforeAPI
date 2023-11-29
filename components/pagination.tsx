import React from "react";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

const Pagination = ({
  currentUsers,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <div className="px-4 md:px-20 lg:px-32 mt-12 pb-8 flex justify-center ">
      <div>
       
        <button
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium mr-2",
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-sky-400 hover:bg-sky-500 text-white"
          )}
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          Previous
        </button>
        <button
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium",
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-sky-400 hover:bg-sky-500 text-white hover:scale-95"
          )}
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          Next
        </button>
      
        <p className="text-center text-gray-600 mb-2 mr-2 ml-2 mt-8 ">
           
          <span className="bg-sky-400 text-white p-1 shadow-md rounded-lg ml-2 mr-2 px-2">
            {currentPage}</span>
           of
           
           <span className="bg-sky-400 text-white p-1 shadow-md rounded-lg ml-2 mr-2 px-2">
            {totalPages}
            </span>
        </p>
      </div>
    </div>
  );
};

export default Pagination;