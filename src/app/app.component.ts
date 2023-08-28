import { Component, OnInit } from '@angular/core';
import { PokemonDataService, Pokemondata } from './pokemon-data.service';
import { Pokemon } from './pokemon-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  protected pokemonsdata: Pokemondata | undefined;
  protected pokemon: any;
  private page = 0;

  constructor(
    private pokemonDataService: PokemonDataService) {}


  ngOnInit(): void {
    this.getPokemons();
    
  }

  getPokemons(): void {
    this.pokemonDataService.getPokemons(this.page)
    .subscribe(pokemonsdata => {
      this.pokemonsdata = pokemonsdata;
      
      this.pokemonsdata.results.forEach((result, index) => {
        console.log(result);
        this.pokemonDataService.getPokemon(result.url).subscribe(pokemon => {
          if (this.pokemonsdata) {
            this.pokemonsdata.results[index].imageURL = pokemon.sprites.front_default;
          }
          
        });
      });
      console.log("DERP", this.pokemonsdata)
      //this.pokemonDataService.getPokemon(pokemonsdata.name);
    });
  }

}
