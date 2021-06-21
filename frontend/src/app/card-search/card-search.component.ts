import { FormsModule, NgForm } from "@angular/forms";
import { Component } from "@angular/core";

import { SearchService } from "../services/search.service";

import { pkCard } from "../models/card.model";
import { from } from "rxjs";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent{
  pokemon = ''
  cards: pkCard[] = [{
    pokemon: '',
    types: [],
    value: 0,
    img: ''
  }]
  
  tempCard = {
    pokemon: '',
    types: [],
    value: 0,
    img: ''
  }

  constructor(private searchService: SearchService) { }
  
  // find cards
  onFindCards(form: NgForm) {
    this.pokemon = form.value.pokemon

    //Search Service
    this.searchService.findCards(this.pokemon)
      .subscribe((element) => {

        console.log(element[0].tcgplayer.prices);
        
          // Assign name to card
          if (element[0].name) {
            this.tempCard.pokemon = element[0].name
          } else { this.tempCard.pokemon = '' }
          
          // Assign type to card
          if (element[0].types) {
            this.tempCard.types = element[0].types
          } else { this.tempCard.types = [] }
          
          // Assign value to card
          if (element[0].tcgplayer.prices.holofoil) {
            this.tempCard.value = element[0].tcgplayer.prices.holofoil.market
          } else { this.tempCard.value = 0 }
          
          // Assign img url to card
          if (element[0].images.small) {
            this.tempCard.img = element[0].images.small
          } else {
            this.tempCard.img = ''
          }
        console.log(this.tempCard);
      })
    
    form.resetForm()
    this.tempCard = {
      pokemon: '',
      types: [],
      value: 0,
      img: ''
    }
  }
}