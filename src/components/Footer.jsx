import React from "react";

const Footer = (props) => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-sky-300 w-full py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="text-white font-semibold text-lg">
          &copy; {new Date().getFullYear()} {props.tittle}. All rights reserved.
        </div>
        </div>
    </footer>
  );
};

export default Footer;