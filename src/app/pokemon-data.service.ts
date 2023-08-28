import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  pokemonsPaginatedURL = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0';
  pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';
  

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemondata> {
    return this.http.get<Pokemondata>(this.pokemonsPaginatedURL);
  }

  getPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}

export interface Pokemondata {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
  imageURL: string;
}