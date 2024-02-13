import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private leaguesUrl = 'assets/data/leagues.json'; // Adjust the path based on your project structure

  private countriesUrl = 'assets/data/teams-countries.json';

  private goalsUrl = 'assets/data/goals.json';

  private playersUrl = 'assets/data/players.json';

  private aerialBattlesUrl = 'assets/data/aerialbattleslost.json';

  private appearances = 'assets/data/appearances.json';

  private assists = 'assets/data/assists.json';

  selectedPlayer = '';

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<any> {
    return this.http.get(this.leaguesUrl);
  }
  getcountries(): Observable<any> {
    return this.http.get(this.countriesUrl);
  }

  getGoals(): Observable<any> {
    return this.http.get(this.goalsUrl);
  }

  getPlayers(): Observable<any> {
    return this.http.get(this.playersUrl);
  }

  getAerialBattles(): Observable<any> {
    return this.http.get(this.aerialBattlesUrl);
  }

  getAppearances(): Observable<any> {
    return this.http.get(this.appearances);
  }

  getAssists(): Observable<any> {
    return this.http.get(this.assists);
  }

  setSelectedPlayer(player: string) {
    this.selectedPlayer = player;
  }
}
