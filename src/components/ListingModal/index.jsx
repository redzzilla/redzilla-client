import React, { useEffect, useState } from "react";
import { detailEndpoint } from "../../services/DetailService";
import { FaTimes } from "react-icons/fa";
import Gallery from "./Gallery";
import Detail from "./Detail";
import "./index.scss";

const ListingModal = (props) => {
  const { itemId, closeModal } = props;

  const [data, setData] = useState(null);
  const [galleryData, setGalleryData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log("popup select================================");
      console.log('itemId =>'+itemId);
      let url = detailEndpoint(itemId);
      console.log(url);
      let res = await fetch(url);
      let result = await res.json();
      console.log(result);
      setData(result);
      console.log("popup select result================================");
      url = result._PhotoGalleryURL;
      console.log(url);
      res = await fetch(url);
      console.log(res);
      result = await res.json();
      console.log(result);
      setGalleryData(result);
    }
    fetchData();
  }, [itemId]);

  return (
    galleryData &&
    data && (
      <div className="modal">
        <div className="modalWrapper">
          <Gallery galleryData={galleryData} data={data} />
          <Detail data={data} />
        </div>
        <span className="closeWrapepr" onClick={closeModal}>
          <FaTimes />
        </span>
      </div>
    )
  );
};
export default ListingModal;
