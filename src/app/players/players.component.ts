import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playersData = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPlayers().subscribe(players => {
      this.playersData = players;
      console.log(players);
    })
  }

  viewPlayer(name: string) {
    this.dataService.setSelectedPlayer(name);
  }

}
