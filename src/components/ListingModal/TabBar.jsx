import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./TabBar.scss"
const meta = require("./metadata.json");

const StyledTab2 = (props) => {
  return (
    <>
      <div
        className={`tab ${props.active === props.id ? 'active' : ''}`}
        onClick={props.onClick}

      >{props.label}</div>
    </>)
};

const TabBar = (props) => {
  const { scrollTop } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    const ele = document.getElementsByClassName("detailItem");
    if (ele != null) {
      const parentEle = document.getElementsByClassName("detailMain")[0];
      for (let i = 0; i < ele.length; i++) {
        const selEle = document.getElementsByClassName("detailItem")[i];
        const eleTop = selEle.offsetTop - parentEle.offsetTop;
        if (eleTop >= scrollTop && eleTop <= scrollTop + 520) {
          setValue(i);
          // console.log("VALUE IS : ", value);
          break;
        }
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    const selEle = document.getElementsByClassName("tab active")[0];
    selEle.scrollIntoView()
  }, [value]);

  const handleChange = (newValue) => {
    const parentEle = document.getElementsByClassName("detailMain")[0];
    const selEle = document.getElementsByClassName("detailItem")[newValue];
    console.log("selected elem: ",selEle , newValue);
    const scrollTop = selEle.offsetTop - parentEle.offsetTop;
    parentEle.scroll({
      top: scrollTop,
      behavior: "smooth",
    });

    setValue(newValue);
  };

  const catList = meta.reduce((list, item) => list.includes(item.category) ? list : [...list, item.category], []);

  // const tabList = catList.reduce((tabList, category) => {
  //   if (Object.keys(data).includes(category)) tabList.push(category)
  //   return tabList;
  // }, [])

  return (
    <>
      <hr />

      <div className="tabsContainer">
        <FiChevronLeft></FiChevronLeft>

        <div className="tabScroller">
          <div className="tabs" >
            {catList.map((labelName, index) => {
              if (labelName) {
                // console.log("index: ", index, "name: ", labelName );
                return (
                  <StyledTab2 label={labelName} key={index} id={index} active={value} Han  />
                )
              }
            })}
          </div>
        </div>
        <FiChevronRight ></FiChevronRight>

      </div>
      <hr />
    </>

  );
};

export default TabBar;
