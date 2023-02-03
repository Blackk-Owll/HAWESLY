import API from "../API";


export  function refreshAnnonce(setAnnonce,idAnnonce) {
 
  API.get(`/annonces/${idAnnonce}`).then((res) => {
      setAnnonce(res.data);
      console.log("res",res.data);
    });
  }

export function getChamps (annonce,setCategorie,setType,setAnnonceur,setWilaya,setCommune){
  if (annonce !== undefined) {
    API.get(`/categories/${annonce.categorie}`).then((res) => {
      setCategorie(res.data.label);
      // console.log(res.data.label);
    });

    API.get(`/types/${annonce.type}`).then((res) => {
      setType(res.data.type);
      // console.log(res.data.type);
    });

    API.get(`/wilayas/${annonce.wilaya}`).then((res) => {
      setWilaya(res.data.nom);
      // console.log(res.data);
    });

    API.get(`/communes/${annonce.commune}`).then((res) => {
      setCommune(res.data.nom);
      // console.log(res.data.nom);
    });

    // recuperé le propriètaire de l'annocnce
    API.get(`/users/${annonce.user}`).then((res) => {
      setAnnonceur(res.data);
    });
  }
}

export function getAnnoncerAdress(annonceur,setAnnonceurWilaya,setAnnonceurCommune,setAnnonceurId){
  API.get(`/wilayas/${annonceur.wilaya}`).then((res) => {
    setAnnonceurWilaya(res.data.nom);
  });

  API.get(`/communes/${annonceur.commune}`).then((res) => {
    setAnnonceurCommune(res.data.nom);

    setAnnonceurId(annonceur.annonceurId);
  });
}

export function postMessageOffre (contenu,idAnnonce,emetteur){
let success = false;
  API.post(
    `/messagesOffres/`,
    {
      contenu: contenu,
      Annonce: idAnnonce,
      emetteur: emetteur,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    {
      success: success,
    }
  )
    .then((response,success) => {
      success=true; // return true for the unit test 
      console.log(response);
      
    })
    .catch((error) => {
      console.log(error.response);
      
    });
    
   return (success);  

  }

 