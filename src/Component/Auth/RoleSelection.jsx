import React from "react";

const RoleSelection = ({onSelectRole}) => {
  return (
    <div className="mt-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-2">
          Welcome to IP TECH
        </h3>

        <p className="text-gray-500 dark:text-slate-400 text-sm">
          Please select your account type to proceed
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Job Seeker */}
        <div
          onClick={() => onSelectRole("seeker")}
          className="group border border-gray-200 dark:border-slate-800 hover:border-indigo-600 dark:hover:border-purple-600 rounded-2xl p-6 text-center cursor-pointer transition duration-300 bg-white/50 dark:bg-slate-950/20 hover:shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition duration-300">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>

          <h4 className="text-lg font-bold font-poppins text-slate-900 dark:text-white mb-1">
            Job Seeker
          </h4>

          <p className="text-xs text-gray-500 dark:text-slate-400 leading-normal">
            Find your next placement drive and showcase your portfolio.
          </p>
        </div>

        {/* Employer */}
        <div
          onClick={() => onSelectRole("employer")}
          className="group border border-gray-200 dark:border-slate-800 hover:border-purple-600 dark:hover:border-purple-500 rounded-2xl p-6 text-center cursor-pointer transition duration-300 bg-white/50 dark:bg-slate-950/20 hover:shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition duration-300">
            <i className="fa-solid fa-building-user"></i>
          </div>

          <h4 className="text-lg font-bold font-poppins text-slate-900 dark:text-white mb-1">
            Employer
          </h4>

          <p className="text-xs text-gray-500 dark:text-slate-400 leading-normal">
            Post job openings, browse verified candidates, and scale teams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;