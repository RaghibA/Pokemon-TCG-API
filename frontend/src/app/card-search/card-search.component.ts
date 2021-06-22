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
  cards: pkCard[] = []
  
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
      .subscribe((response: any) => {
        response.forEach((element:any)=> {
          // Assign name to card
          if (element.name) {
            this.tempCard.pokemon = element.name
          } else { this.tempCard.pokemon = '' }
          
          // Assign type to card
          if (element.types) {
            this.tempCard.types = element.types
          } else { this.tempCard.types = [] }
          
          // Assign value to card
          if (element.tcgplayer.prices.holofoil) {
            this.tempCard.value = element.tcgplayer.prices.holofoil.market
          } else { this.tempCard.value = 0 }
          
          // Assign img url to card
          if (element.images.small) {
            this.tempCard.img = element.images.small
          } else {
            this.tempCard.img = ''
          }
          
          // push card to cards
          this.cards.push(this.tempCard)

          // init temp card
          this.tempCard = {
            pokemon: '',
            types: [],
            value: 0,
            img: ''
          }
      })
        form.resetForm()
    });

    this.cards = []
  }
}