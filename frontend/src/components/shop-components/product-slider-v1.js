import React from "react";
import { useState, useEffect, useContext } from "react";
// implementation de la logique de requetes api
import API from "../../API";
import { useParams } from "react-router-dom";

function ProductSliderV1() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  // recuperer l id de l'annonce
  let idAnnonce = useParams().id;

  // recuperer les photos de l'annonce

  const [photos, setPhotos] = useState([]);
  function getPhotos(idAnnonce) {
    console.log(idAnnonce);
    API.get(`/photos/`, { idAnnonce: idAnnonce }).then((res) => {
      setPhotos(
        res.data.filter((photo) => {
          return photo.annonce == idAnnonce;
        })
      );
      /*setPhotos(
        photos.filter((photo) => {
          return photo.annonce === idAnnonce;
        })
      );*/
    });
  }

  useEffect(() => {
    getPhotos(idAnnonce);
  }, [idAnnonce]);

  return (
    <div className="ltn__img-slider-area mb-90">
      {photos.length > 0 ? (
       // <div className="container-fluid">
          <div className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
            {photos.map((item, index) => {
              return (
                
                <div
                  className="col-lg-12"
                  style={{ padding: "0.5%", position: "center" }}
                >
                  <div className="ltn__img-slide-item-4">
                    <a href={item.image} data-rel="lightcase:myCollection">
                      <img
                        style={{
                          width: "1904px",
                          height: "580px",
                          marginTop: "10px",
                        }}
                        src={item.image}
                        alt="Image"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
       // </div>
      ) : (
        <div className="container-fluid">
          <div className="row ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all"></div>
          <div
            className="col-lg-12"
            style={{ padding: "0.5%", position: "center" }}
          >
            <div>
              <a
                href={"http://127.0.0.1:8000/media/img/noImg.png"}
                data-rel="lightcase:myCollection"
              >
                <img
                  style={{
                    width: "1904px",
                    height: "580px",
                    marginTop: "10px",
                  }}
                  src={"http://127.0.0.1:8000/media/img/noImg.png"}
                  alt="Image"
                />
              </a>
            </div>
          </div>
         
        </div>
      )}
    </div>
  );
}

export default ProductSliderV1;