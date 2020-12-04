import clsx from "clsx";
import React from "react";
import logo from "./logo.svg";
import "./Spinner.css";

export const Spinner = () => {
    return (
        <div className={clsx("container")}>
            <img src={logo} className={clsx("logo")} alt="logo"/>
        </div>
    );
};
