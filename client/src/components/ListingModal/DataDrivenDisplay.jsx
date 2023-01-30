import React from "react";
import Contact from "./Contact";
import OverviewDetail from "./Overview";
const meta = require("./metadata.json");

const DataDrivenDisplay = (props) => {
  const { data, onScroll } = props;

  const validCateNam = Object.keys(data).filter((cateNam) =>
    meta.some((item) => item.category === cateNam)
  );

  return (
    <div className="detailMain" onScroll={onScroll}>
      <OverviewDetail data={data} />
      <Contact data={data} />
      {validCateNam.map((categoryName) => (
        <div className="detailItem" key={categoryName}>
          <div className="itemOne">
            <div className="itemTitle">{categoryName}</div>
            <div className="mb1">
              {Object.keys(data[categoryName]).map((fieldName) => {
                const obj = meta.find(
                  (item) =>
                    item.unifiedName === fieldName &&
                    item.category === categoryName
                );
                let name = obj?.longName || fieldName;
                return (
                  <div key={fieldName}>
                    <span
                      className="w50"
                      style={{ overflowWrap: "break-word" }}
                    >
                      {name}
                    </span>
                    :{" "}
                    <span
                      className="font500"
                      style={{ overflowWrap: "break-word" }}
                    >
                      {data[categoryName][fieldName]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
export default DataDrivenDisplay;
