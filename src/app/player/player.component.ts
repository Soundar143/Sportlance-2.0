import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  playerName = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.playerName = this.dataService.selectedPlayer;
  }

}
