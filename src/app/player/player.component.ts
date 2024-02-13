import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  playerName: any = {};

  EnableCard: boolean = true;

  selectedData: any = {};

  jsonData: any[] = [];

  playersData: any[] = [];

  goalsData: any[] = [];

  matchedGoalsdata: any[] = [];

  goalsChartOptions: any = {
  }

  appearanceData: any[] = [];

  matchedAppearanceData: any[] = [];

  appearanceChartOptions: any = {

  }

  assistsData: any[] = [];

  matchedAssistsData: any[] = [];

  assistsChartOptions: any = {

  }

  penaltiesConceidedData: any[] = [];
  penaltiesSavedData: any[] = [];
  penaltiesChartOptions: any = {
  }
  matchedpenaltiesConceidedData: any[] = [];
  matchedpenaltiesSavedData: any[] = [];

  redCardsData: any[] = [];
  yellowCardsData: any[] = [];
  cardsChartOptions: any = {
  }
  matchedRedCardsData: any[] = [];
  matchedYellowCardsData: any[] = [];

  fusionChartObject = {
    column3d: {
      width: '450',
      height: '400',
      type: "column3d",
      dataFormat: "json"
    },
    line: {
      width: '450',
      height: '400',
      type: "line",
      dataFormat: "json"
    },
    pie3d: {
      width: '450',
      height: '400',
      type: "pie3d",
      dataFormat: "json"
    },
    mssplinearea: {
      width: '450',
      height: '400',
      type: "mssplinearea",
      dataFormat: "json"
    },
    doughnut3d: {
      width: '450',
      height: '400',
      type: "doughnut3d",
      dataFormat: "json"
    }
  };

  chartData: { label: string, y: number }[] = [];

  constructor(
    private http: HttpClient,
    private DataFetchService: DataService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.playerName = this.dataService.selectedPlayer;
    this.selectedData = this.dataService.selectedPlayer;
    this.EnableCard = true;
    // this.http.get(apiUrl, options).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // });

    this.DataFetchService.getPlayers().subscribe((data: any) => {
      this.playersData = data;
    });
    this.DataFetchService.getGoals().subscribe((data: any) => {
      this.goalsData = data;
    });
    this.DataFetchService.getAppearances().subscribe((data: any) => {
      this.appearanceData = data;
    });
    this.DataFetchService.getAssists().subscribe((data: any) => {
      this.assistsData = data;
    });
    this.DataFetchService.getPenaltiesConceided().subscribe((data: any) => {
      this.penaltiesConceidedData = data;
    });
    this.DataFetchService.getPenaltiesSaved().subscribe((data: any) => {
      this.penaltiesSavedData = data;
    });
    this.DataFetchService.getRedcards().subscribe((data: any) => {
      this.redCardsData = data;
    });
    this.DataFetchService.getYellowcards().subscribe((data: any) => {
      this.yellowCardsData = data;
    })
    setTimeout(() => {
      this.onPlayerSelected(this.selectedData);
    }, 100);
  }

  onPlayerSelected(data: any) {
    this.EnableCard = false;
    this.getPlayersGoals(this.selectedData);
    this.getAppearances(this.selectedData);
    this.getAssists(this.selectedData);
    this.getPenalties(this.selectedData);
    this.getCards(this.selectedData)
    setTimeout(() => {
      let fcc = (document.querySelectorAll('.fusioncharts-container'));
      Array.from(fcc).forEach((element: any) => {
        (element as HTMLElement).firstElementChild?.setAttribute('style', 'visibility: hidden;');
        ((element as HTMLElement).firstElementChild?.childNodes[3] as HTMLElement).setAttribute('style', 'visibility: visible;');
        ((element as HTMLElement).firstElementChild?.childNodes[2] as HTMLElement).setAttribute('style', 'visibility: visible;');
        ((element as HTMLElement).firstElementChild?.childNodes[1] as HTMLElement).setAttribute('style', 'visibility: visible;');
        ((element as HTMLElement).firstElementChild?.childNodes[0] as HTMLElement).setAttribute('style', 'visibility: visible;');
      })
    }, 1000);
  }

  getPlayersGoals(selectedValue: any) {
    this.matchedGoalsdata = this.goalsData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    this.goalsChartOptions = {
      chart: {
        caption: "Goal Statistics",
        subcaption: selectedValue.player.name,
        yaxisname: "Goals{br}(in Numbers)",
        decimals: "1",
        enablesmartlabels: "0",
        theme: "fusion",
        usedataplotcolorforlabels: "1",
        xaxisname: "Years"
      },
      data: [
      ]
    };
    let uniqueLabels = new Set();
    (this.goalsChartOptions as any)['data'] = this.matchedGoalsdata.map(item => ({
      "label": item['Initial Year'].toString(),
      "value": item.Stat.toString()
    })).filter(item => {
      if (uniqueLabels.has(item.label)) {
        return false;
      } else {
        uniqueLabels.add(item.label);
        return true;
      }
    });
  }

  getAppearances(selectedValue: any) {
    this.matchedAppearanceData = this.appearanceData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    this.appearanceChartOptions = {
      chart: {
        caption: "Appearances",
        subcaption: selectedValue.player.name.toString(),
        decimals: "1",
        theme: "fusion",
        enablesmartlabels: "0",
        usedataplotcolorforlabels: "1",
        yaxisname: "Appearance in Matches{br}(in Numbers)",
        xaxisname: "Years"
      },
      data: [
      ]
    };
    let uniqueLabels = new Set();
    (this.appearanceChartOptions as any)['data'] = this.matchedAppearanceData.map(item => ({
      "label": item['Initial Year'].toString(),
      "value": item.Stat.toString()
    })).filter(item => {
      if (uniqueLabels.has(item.label)) {
        return false;
      } else {
        uniqueLabels.add(item.label);
        return true;
      }
    });
  }

  getAssists(selectedValue: any) {
    this.matchedAssistsData = this.assistsData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    this.assistsChartOptions = {
      chart: {
        caption: "Assists",
        subcaption: selectedValue.player.name.toString(),
        decimals: "1",
        theme: "fusion",
        enablesmartlabels: "0",
        usedataplotcolorforlabels: "1",
        yaxisname: "Assists in Matches{br}(in Numbers)",
        xaxisname: "Years"
      },
      data: [
      ]
    };
    let uniqueLabels = new Set();
    (this.assistsChartOptions as any)['data'] = this.matchedAssistsData.map(item => ({
      "label": item['Initial Year'].toString(),
      "value": item.Stat.toString()
    })).filter(item => {
      if (uniqueLabels.has(item.label)) {
        return false;
      } else {
        uniqueLabels.add(item.label);
        return true;
      }
    });
  }

  getPenalties(selectedValue: any) {
    this.matchedpenaltiesConceidedData = this.penaltiesConceidedData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    this.matchedpenaltiesSavedData = this.penaltiesSavedData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    console.log(this.matchedpenaltiesConceidedData, this.matchedpenaltiesSavedData);
    this.penaltiesChartOptions = {
      chart: {
        caption: "Penalties",
        yaxisname: "Number of penalties",
        // numbersuffix: "M",
        subcaption: "(Conceided Vs Saved)",
        yaxismaxvalue: "6",
        plottooltext:
          selectedValue?.player?.name + " $seriesName penalty <b>$dataValue</b> times in $label",
        theme: "fusion"
      },
      categories: [
        {
          category: []
        }
      ],
      dataset: [
        {
          seriesname: "Conceided",
          data: []
        },
        {
          seriesname: "Saved",
          data: []
        }
      ]
    };
    (this.penaltiesChartOptions as any)['dataset'][0]['data'] = this.matchedpenaltiesConceidedData.map(item => ({
      "value": item.Stat.toString()
    }));
    (this.penaltiesChartOptions as any)['dataset'][1]['data'] = this.matchedpenaltiesSavedData.map(item => ({
      "value": item.Stat.toString()
    }));

    let uniqueLabels = new Set();
    let conceidedCategories = this.matchedpenaltiesConceidedData.map(item => ({
      "label": item['Initial Year'].toString()
    }));

    let savedCategories = this.matchedpenaltiesSavedData.map(item => ({
      "label": item['Initial Year'].toString()
    }));

    let mergedCategories = [...conceidedCategories, ...savedCategories].filter(item => {
      if (uniqueLabels.has(item.label)) {
        return false;
      } else {
        uniqueLabels.add(item.label);
        return true;
      }
    });

    (this.penaltiesChartOptions as any)['categories'][0]['category'] = mergedCategories;

  }

  getCards(selectedValue: any) {
    this.matchedYellowCardsData = this.yellowCardsData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    this.matchedRedCardsData = this.redCardsData.filter(data =>
      (data?.Player?.toLowerCase().includes(selectedValue?.player?.name?.toLowerCase())) &&
      data?.Nationality?.toLowerCase().includes(selectedValue?.player?.nationality?.toLowerCase())
    );
    this.cardsChartOptions = {
      chart: {
        caption: "Red Card vs Yellow Card",
        subcaption: selectedValue?.player?.name,
        enablesmartlabels: "1",
        showlabels: "1",
        showpercent: "1",
        numbersuffix: " MMbbl",
        usedataplotcolorforlabels: "1",
        plottooltext: "$label, <b>$value</b>",
        theme: "fusion"
      },
      data: [
        {
          label: "Red Card",
          value: "0"
        },
        {
          label: "Yellow Card",
          value: "0"
        }
      ]
    };
    (this.cardsChartOptions as any)['data'][0]['value'] = this.matchedRedCardsData.reduce((total, item) => total + item.Stat, 0);
    (this.cardsChartOptions as any)['data'][1]['value'] = this.matchedYellowCardsData.reduce((total, item) => total + item.Stat, 0);
  }

}
