import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  limit: number = 12;
  pokemonsPaginatedURL = 'https://pokeapi.co/api/v2/pokemon?limit=' + this.limit + '&offset=';
  pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';
  

  constructor(private http: HttpClient) { }

  getPokemons(page: number): Observable<Pokemondata> {
    return this.http.get<Pokemondata>(this.pokemonsPaginatedURL + (page * this.limit));
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