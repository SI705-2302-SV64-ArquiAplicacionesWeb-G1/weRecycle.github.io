import { QuantityOfLikeForPublicationReporteDTO } from './../../../models/QuantityOfLikeForPublicationReporteDTO';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-cantida-de-likes-por-publicacion-reporte',
  templateUrl: './cantida-de-likes-por-publicacion-reporte.component.html',
  styleUrls: ['./cantida-de-likes-por-publicacion-reporte.component.css']
})
export class CantidaDeLikesPorPublicacionReporteComponent implements OnInit{

  barCharOptions:ChartOptions={
    responsive:true, maintainAspectRatio:false,
    aspectRatio: 0.8,
  }

  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private uS: LikeService) {}
ngOnInit(): void {
  this.uS.cantidaDeLikesPorPublicacionReporte().subscribe((data)=>{
    this.barChartLabels=data.map((item)=>item.namePublication);
    this.barChartData=[
      {
        data:data.map((item)=>item.QuantityOfLikes),
        label:'likesnose',
        backgroundColor: ['#00BF35', '#BF0035'],
        borderColor: '#8FBC8F',
        borderWidth: 1,
      }
    ]
  })
}


}
