import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[50%] flex flex-col justify-end items-start px-[7%] py-[7%] mt-5 "
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path ||
          data.profile_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="">
        <h1 className="font-black text-white text-5xl w-[70%] mt-[50%]">
          {data.name || data.title || data.original_name || data.title}
        </h1>
        <p className="mb-3 w-[70%] mt-3 text-zinc-100">
          {data.overview.slice(0, 230)} ...{" "}
          <Link to={`${data.media_type}/details/${data.id}`} className="text-blue-400 cursor-pointer">more</Link>{" "}
        </p>
        <p className="text-white">
          <i className="text-yellow-500 ri-megaphone-fill" />{" "}
          {data.release_date || "No Information"}
          <i className="ml-3 text-yellow-500 ri-album-fill" />{" "}
          {data.media_type.toUpperCase()}
        </p>
        <Link to={`${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556CD] font-semibold text-white rounded p-4 relative top-8">
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
