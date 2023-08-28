import { Component, OnInit } from '@angular/core';
import { PokemonDataService, Pokemondata, Pokemon } from './pokemon-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected pokemonsdata: Pokemondata | undefined;
  pokemonsForDisplay: Pokemon[] | undefined;
  page: number = 0;
  resultsPerPage: number = 12;
  // sortType: Sort = Sort.Id;


  constructor(
    private pokemonDataService: PokemonDataService) {}


  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonDataService.getPokemons()
    .subscribe(pokemonsdata => {
      this.pokemonsdata = pokemonsdata;
      console.log(this.pokemonsdata);
      this.getPokemonsPage(this.page);
    });
  }

  getPokemonsPage(page: number) {
    const sliceBegin = this.page * this.resultsPerPage;
    const sliceEnd = sliceBegin + this.resultsPerPage;
    
    this.pokemonsForDisplay = this.pokemonsdata?.results.slice(sliceBegin, sliceEnd);
    

    this.pokemonsForDisplay?.forEach((result, index) => {
      this.pokemonDataService.getPokemon(result.url).subscribe(pokemon => {
        if (this.pokemonsForDisplay) {
          this.pokemonsForDisplay[index].imageURL = pokemon.sprites.front_default;
        }
      });
    });    
  }

  //TODO: correct type for event
  sortResults(event: any) {
    console.log(this.pokemonsdata);
    this.page = 0;
    const sort = event.target.value;

    if (this.pokemonsdata) {
      // TODO: use enum
      if (sort === 'sort-name') {
        this.pokemonsdata.results.sort((a, b) => a.name.localeCompare(b.name));
        this.getPokemonsPage(this.page);
      } else {
        this.getPokemons();
      }
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getPokemonsPage(this.page);
    }
  }

  nextPage() {
    if (this.pokemonsdata) {
      const totalPages = Math.trunc( this.pokemonsdata.results.length / this.resultsPerPage );
      if (this.page + 1 <= totalPages) {
        this.page++;
        this.getPokemonsPage(this.page);
      }
    }
  }

}

enum Sort {
  Id = "ID",
  Name = "NAME",
}