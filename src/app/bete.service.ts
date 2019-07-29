import { Injectable } from "@angular/core";
import { Bete } from "./betail/bete.model";

import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay } from "rxjs/operators";
import { PlaceLocation } from "./betail/location.model";

@Injectable({
  providedIn: "root"
})
export class BeteService {
  defautlocation: PlaceLocation = {
    lat: -54,
    lng: 58,
    address: "27 Avenue Youssef Ben Tachfin,Rabat,Maroc",
    staticMapImageUrl:
      "https://maps.googleapis.com/maps/api/staticmap?center=33.983451699999996,-6.8675251&zoom=14&size=500x300&maptype=roadmap&markers=color:red%7Clabel:Place%7C34.015156948062696,-6.832916736602783&key=AIzaSyBQe5wCrKjmRviU5tvDq3_kbXSQ2Y88Rd8"
  };

  betes = new BehaviorSubject<Bete[]>([
    {
      reference: "r1",
      categorie: null,
      origine: "Ovin",
      imgURL:
        "https://mcetv.fr/wp-content/uploads/2016/11/Bordeaux-un-homme-tu%C3%A9-par-un-mouton-agressif-grande.jpg",
      age: "8 ans",
      poids: "50kg",
      proprietaire: "XXX",
      race: "Mouton",
      location: this.defautlocation
    },
    {
      reference: "r2",
      categorie: null,
      origine: "Bovin",
      imgURL:
        "https://www.lobservateur.fr/wp-content/uploads/2018/05/b%C5%93uf.jpg",
      age: "7 ans",
      poids: "100kg",
      proprietaire: "XXX",
      race: "Boeuf",
      location: this.defautlocation
    },
    {
      reference: "r3",
      categorie: null,
      origine: "Ovin",
      imgURL:
        "https://www.rustica.fr//images/ouv-chevre-ch120608-060-1435746972-l750-h512.jpg",
      age: "3 ans",
      poids: "30kg",
      proprietaire: "XXX",
      race: "chevre",
      location: this.defautlocation
    },
    {
      reference: "r4",
      categorie: null,
      origine: "Bovin",
      imgURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg/1200px-HF_in_der_Rh%C3%B6n_auf_der_Weide.jpg",
      age: "12ans",
      poids: "120kg",
      proprietaire: "XXX",
      race: "Vache",
      location: this.defautlocation
    },
    {
      reference: "r5",
      categorie: null,
      origine: "Bovin",
      imgURL: "https://cheval.quebec/Image/Le-Cheval/DSCN3038.JPG",
      age: "15 ans",
      poids: "100kg",
      proprietaire: "XXX",
      race: "Cheval",
      location: this.defautlocation
    }
  ]);

  constructor() {}

  getAllBetes() {
    return this.betes.asObservable();
  }

  getBete(beteId: string) {
    return this.betes.pipe(
      take(1),
      map(betes => {
        return { ...betes.find(b => b.reference === beteId) };
      })
    );
  }

  deleteBete(beteId: string) {
    return this.betes.pipe(
      take(1),
      tap(betes =>{
        this.betes.next(betes.filter(b => b.reference !== beteId));
      })
    )
  }
  addBete(
    origine: string,
    age: string,
    poids: string,
    race: string,
    proprietaire: string,
    imgUrl: string,
    location: PlaceLocation
  ) {
    let newBete: Bete;
    /*const imgUrl =
      "https://www.rustica.fr//images/ouv-chevre-ch120608-060-1435746972-l750-h512.jpg";
    */
    newBete = new Bete(
      Math.random().toString(),
      null,
      origine,
      age,
      poids,
      race,
      proprietaire,
      imgUrl,
      location
    );
    return this.betes.pipe(
      take(1),
      delay(1000),
      tap(betes => {
        this.betes.next(betes.concat(newBete));
        console.log(newBete.location.address);
      })
    );
  }

  updateBete(
    reference: string,
    origine: string,
    age: string,
    poids: string,
    race: string,
    proprietaire: string,
    imgURL: string,
    location: PlaceLocation
  ) {
    return this.betes.pipe(
      take(1),
      delay(1000),
      tap(betes => {
        const updatedBeteIndex = betes.findIndex(
          bete => bete.reference === reference
        );
        const updatedBetes = [...betes];
        const oldBete = updatedBetes[updatedBeteIndex];
        updatedBetes[updatedBeteIndex] = new Bete(
          oldBete.reference,
          null,
          origine,
          age,
          poids,
          race,
          proprietaire,
          imgURL,
          location
        );
        this.betes.next(updatedBetes);
      })
    );
  }
}
