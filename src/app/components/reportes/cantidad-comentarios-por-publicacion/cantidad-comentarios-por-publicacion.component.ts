import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommenttsService } from 'src/app/services/commentts.service';

@Component({
  selector: 'app-cantidad-comentarios-por-publicacion',
  templateUrl: './cantidad-comentarios-por-publicacion.component.html',
  styleUrls: ['./cantidad-comentarios-por-publicacion.component.css']
})
export class CantidadComentariosPorPublicacionComponent implements OnInit {
  barChartOptions: ChartOptions= {
    responsive:true,
  };
  barChartLabels: string[]=[];
  barChartType: ChartType ='doughnut';
  barChartLegend = true;
  barChartData : ChartDataset[]=[];
  constructor(private cs: CommenttsService){}
  ngOnInit(): void {
    this.cs.getCount().subscribe((data)=>{
      this.barChartLabels = data.map((item)=>item.namePublication);
      this.barChartData = [
        {
          data: data.map((item)=>item.QuantityOfComments),
          label:'Cantidad de Cursos por Universidad'
        }
      ]
    });
  }
}
