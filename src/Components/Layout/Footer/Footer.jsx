import React from "react";
import scss from "./Footer.module.scss";

const Footer = (props) => {
  return (
      <div className={scss.Footer}>
          <div className={scss.Copyright}>
              <span>Designed by n0na7773</span>
          </div>
      </div>
  );
}

export default Footer;
