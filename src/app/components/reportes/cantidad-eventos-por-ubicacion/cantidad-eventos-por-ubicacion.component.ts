import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType, ChartDataset } from 'chart.js';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-cantidad-eventos-por-ubicacion',
  templateUrl: './cantidad-eventos-por-ubicacion.component.html',
  styleUrls: ['./cantidad-eventos-por-ubicacion.component.css']
})
export class CantidadEventosPorUbicacionComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive:true,
    maintainAspectRatio: false,
    aspectRatio: 0.9,
  };
  

  barchartLabels:string[]=[];
  barChartType: ChartType = 'pie';
  barChartLegend = true
  barChartData: ChartDataset[] = [];
  constructor(private eS:EventsService){}


  ngOnInit(): void {
      this.eS.getQuantityOfEventsForUbication().subscribe((data) => { 
        this.barchartLabels=data.map((item)=>item.city);
        this.barChartData=[
        {
          data: data.map((item) => item.QuantityOfEvents),
          label: 'Total de eventos',
        },
      ];
    });
  }
}
