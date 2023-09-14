import React, { Component } from "react";
import { useState, useEffect, useHistory } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import L from "leaflet";
import AsyncSelect from "react-select/async";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Button } from "react-bootstrap-buttons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import API from "./API";
<script></script>;
const AddListing_Test = () => {
  //let history = useHistory();
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [user, setUser] = useState({});
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState(0);
  const [surface, setSurface] = useState(0);
  const [wilaya, setWilaya] = useState(16);
  const [wilayatxt, setWilayatxt] = useState("");
  const [commune, setCommune] = useState(1413);
  const [communetxt, setCommunetxt] = useState("");
  const [adresse, setAdresse] = useState("");
  const [categorie, setCategorie] = useState(1);
  const [categorietxt, setCategorietxt] = useState("Vente");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [type, setType] = useState(1);
  const [typetxt, setTypetxt] = useState("Maison");
  const [titre, setTitre] = useState("");
  const [mapX, setMapX] = useState(0);
  const [mapY, setMapY] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [photo, setPhoto] = useState([]);

  const handleChangeCat = (value) => {
    setCategorie(value.categorieId);
    setCategorietxt(value.label);
    console.log("categorie", categorie);
  };

  const handleChangeWil = (value) => {
    setWilaya(value.wilayaId);
    setWilayatxt(value.nom);
    console.log("wilaya", wilaya);
  };

  const handleChangeTy = (value) => {
    setType(value.typeId);
    setTypetxt(value.type);
    console.log("type", type);
  };

  const handleChangeCom = (value) => {
    setCommune(value.communeId);
    setCommunetxt(value.nom);
    console.log("commune", commune);
  };

  const recupererCategorie = () => {
    return API.get(`categories/`).then((res) => {
      res = res.data;
      return res;
    });
  };

  const recupererWilaya = () => {
    return API.get(`wilayas/`).then((res) => {
      res = res.data;
      return res;
    });
  };

  const recupererType = () => {
    return API.get(`types/`).then((res) => {
      res = res.data;
      return res;
    });
  };

  const recupererCommune = () => {
    return API.get(`communes/`).then((res) => {
      res = res.data;
      return res;
    });
  };

  const Addmap = (e) => {
    let mapOptions = {
      center: [36.77628132792588, 363.0378913879395],
      zoom: 10,
      height: 80,
    };

    let map = new L.map("map", mapOptions);
    let layer = new L.TileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );

    map.addLayer(layer);
    const myIcon = L.icon({
      iconUrl: "logo192.png",
      iconSize: [20, 20],
      iconAnchor: [2, 2],
      popupAnchor: [0, -2],
      // ...
    });

    let marker = null;
    map.on("click", (event) => {
      if (marker !== null) {
        map.removeLayer(marker);
      }

      marker = L.marker([event.latlng.lat, event.latlng.lng], {
        icon: myIcon,
      }).addTo(map);

      document.getElementById("latitude").value = event.latlng.lat;
      document.getElementById("longitude").value = event.latlng.lng;

      setMapX(document.getElementById("latitude").value);
      setMapY(document.getElementById("longitude").value);
      console.log(map.getBounds());
      console.log(myIcon);
    });
  };

  const addNewAnnonce = (e) => {
    e.preventDefault();

    API.post(
      `annonces/`,
      {
        user: 1,
        wilaya: wilaya,
        description: description,
        prix: prix,
        titre: titre,
        surface: surface,
        commune: commune,
        adresse: adresse,
        categorie: categorie,
        type: type,
        mapX: 36.77628132792588,

        mapY: 363.0378913879395,
        zoom: zoom,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      console.log(response);
      console.log(
        "Ajout avec succés , id annonce est : ",
        response.data.annonceId
      );

      var i = 0;
      while (photo[i] !== undefined) {
        let formData = new FormData();
        formData.append("image", photo[i]);
        formData.append("annonce", response.data.annonceId);
        API.post(`/photos/`, formData, {
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        })

          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response);
          });
        i++;
      }
    });
  };

  return (
    <div className="ltn__appointment-area pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__appointment-inner">
              <form action="#">
                <h6> Titre</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        placeholder="Titre"
                        name="titre"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <br></br>
                <h2> Description </h2>

                <h6>Description du bien</h6>

                <div className="row">
                  <div className="col-md-12">
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        required
                      />
                    </div>
                  </div>
                </div>

                <br></br>

                <h6>Prix / Surface</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        placeholder="Prix en Dinar algerien (juste le nombre)"
                        name="prix"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        placeholder="surface en m2 (juste le nombre)"
                        name="surface"
                        value={surface}
                        onChange={(e) => setSurface(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <h6>Catégorie/Type du bien </h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item" name="type">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={categories}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.categorieId}
                        loadOptions={recupererCategorie}
                        onChange={handleChangeCat}
                        placeholder={categorietxt}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={types}
                        getOptionLabel={(e) => e.type}
                        getOptionValue={(e) => e.typeId}
                        loadOptions={recupererType}
                        onChange={handleChangeTy}
                        placeholder={typetxt}
                      />
                    </div>
                    <br></br>
                  </div>
                </div>

                <h2>2. Media</h2>
                <h6>Photos du bien</h6>
                <div className="container">
                  <input
                    type="file"
                    id="file-input"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setPhoto(e.target.files)}
                    multiple
                  ></input>
                  <label htmlFor="file-input"></label>
                  <div id="images"></div>
                </div>
                <br></br>

                <h2>3.Emplacement</h2>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={communes}
                        getOptionLabel={(e) => e.nom}
                        getOptionValue={(e) => e.communeId}
                        loadOptions={recupererCommune}
                        onChange={handleChangeCom}
                        placeholder={communetxt}
                      />
                      <br></br> <br></br> <br></br>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={wilayas}
                        getOptionLabel={(e) => e.nom}
                        getOptionValue={(e) => e.wilaya}
                        loadOptions={recupererWilaya}
                        onChange={handleChangeWil}
                        placeholder={wilayatxt}
                      />
                    </div>{" "}
                  </div>

                  <div className="col-md-6">
                    <div className="input-item input-item-name ltn__custom-icon">
                      <input
                        type="text"
                        name="adresse"
                        placeholder="Adresse"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div id="map" align="center">
                    <button
                      variant="warning"
                      size="lg"
                      onClick={Addmap}
                      active
                      style={{
                        width: "440px",
                        height: "180px",
                        backgroundColor: "#f44336",
                      }}
                    >
                      <h3 style={{ color: "white" }}>
                        Ajouter La Localisation Map{" "}
                        <i class="fa-solid fa-map-location-dot fa-lg"></i>{" "}
                      </h3>
                    </button>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          id="latitude"
                          placeholder="latitude"
                          value={mapX}
                          onChange={(e) => setMapX(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          id="longitude"
                          placeholder="longitude"
                          value={mapY}
                          onChange={(e) => setMapY(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning d-none" role="alert">
                  Please note that the date and time you requested may not be
                  available. We will contact you to confirm your actual
                  appointment details.
                </div>
                <form>
                  <div className="btn-wrapper text-center mt-30">
                    <button id="confirmer"
                      onClick={addNewAnnonce}
                      type="submit"
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    >
                      <Link   to="/shop-left-sidebar">Confirmer</Link>
                    </button>
                  </div>
                </form>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing_Test;