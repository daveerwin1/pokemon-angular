import { Component, OnInit } from '@angular/core';
import { PokemonDataService, Pokemondata } from './pokemon-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected pokemonsdata: Pokemondata | undefined;

  constructor(
    private pokemonDataService: PokemonDataService) {}


  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonDataService.getPokemons()
    .subscribe(pokemonsdata => {
      this.pokemonsdata = pokemonsdata;
      //console.log(this.pokemonsdata);
      
      this.pokemonsdata.results.forEach((result, index) => {
        this.pokemonDataService.getPokemon(result.url).subscribe(pokemon => {
          if (this.pokemonsdata) {
            this.pokemonsdata.results[index].imageURL = pokemon.sprites.front_default;
          }
        });
      });
      
    });
  }

  previousPage() {
    if (this.pokemonsdata?.previous) {
      this.pokemonDataService.pokemonsPaginatedURL = this.pokemonsdata.previous;
      this.getPokemons();
    }
  }
  nextPage() {
    if (this.pokemonsdata?.next) {
      this.pokemonDataService.pokemonsPaginatedURL = this.pokemonsdata.next;
      this.getPokemons();
    }
  }

}
