import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./TabBar.scss"
const meta = require("./metadata.json");

const StyledTab2 = (props) => {

  function handleClick() {
    props.onClick(props.id);
  }
  return (
    <>
      <div
        className={`tab ${props.active === props.id ? 'active' : ''}`}
        onClick={handleClick}

      ><span className="tabLabel">{props.label}</span>
        <div className={`tabIndicator  ${props.active === props.id ? 'active' : ''}`} ></div>
      </div>
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
          break;
        }
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    const parentEle = document.getElementsByClassName("tabScroller")[0];
    const selEle = document.getElementsByClassName("tab active")[0];
    const scrollTo = selEle.offsetLeft - parentEle.offsetLeft;

    parentEle.scroll({
      left: scrollTo,
      behavior: "smooth",
    });

  }, [value]);

  const handleChange = (newValue) => {
    const parentEle = document.getElementsByClassName("detailMain")[0];
    const selEle = document.getElementsByClassName("detailItem")[newValue];
    const scrollTop = selEle.offsetTop - parentEle.offsetTop;
    parentEle.scroll({
      top: scrollTop,
      behavior: "smooth",
    });

    setValue(newValue);
  };

  function scrollLeft() {
    const parentEle = document.getElementsByClassName("tabScroller")[0];
    const scrollTo = parentEle.scrollLeft - 200;

    parentEle.scroll({
      left: scrollTo,
      behavior: "smooth",
    });

  }

  function scrollRight() {
    const parentEle = document.getElementsByClassName("tabScroller")[0];
    const scrollTo = parentEle.scrollLeft + 200;

    parentEle.scroll({
      left: scrollTo,
      behavior: "smooth",
    });


  }

  const catList = meta.reduce((list, item) => list.includes(item.category) ? list : [...list, item.category], []);

  // const tabList = catList.reduce((tabList, category) => {
  //   if (Object.keys(data).includes(category)) tabList.push(category)
  //   return tabList;
  // }, [])

  return (
    <>
      <hr />

      <div className="tabsContainer">
        <div className="scrollButtons" onClick={scrollLeft}>
          <FiChevronLeft ></FiChevronLeft>
        </div>

        <div className="tabScroller">
          <div className="tabs" >
            {catList.map((labelName, index) => {
              if (labelName) {
                return (
                  <StyledTab2 label={labelName} key={index} id={index} active={value} onClick={handleChange} />
                )
              }
              else return (<Fragment key={index}> </Fragment>)

            })}
          </div>
        </div>
        <div className="scrollButtons" onClick={scrollRight}>
          <FiChevronRight  ></FiChevronRight>
        </div>
      </div>
      <hr />
    </>

  );
};

export default TabBar;
