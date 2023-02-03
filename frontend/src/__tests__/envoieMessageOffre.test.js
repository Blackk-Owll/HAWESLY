import { postMessageOffre } from "../Controllers/detailsController";
import API from "../API";
test('envoie message d_offre', ()=>{
  let messages=[];
  expect(postMessageOffre("message d'offre XXX TEST ",1,1)).toBeTrue;
 
});








