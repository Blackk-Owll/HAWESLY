import API from "../API";


export function postMessageOffre(contenu, idAnnonce, emetteur, annonceurId) {
  let success = false;
  console.log("inside function ", annonceurId);
  API.post(
    `/messagesOffres/`,
    {
      contenu: contenu,
      Annonce: idAnnonce,
      emetteur: emetteur,
      annonceur: annonceurId,
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
    .then((response, success) => {
      console.log(" success ");
      success = true; // return true for the unit test
      console.log(response);
    })
    .catch((error) => {
      console.log(" error ! ");

      console.log(error.response);
    });

  return success;
}