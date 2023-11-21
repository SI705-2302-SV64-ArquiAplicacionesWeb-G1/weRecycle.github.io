import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publicacion-por-tipo',
  templateUrl: './publicacion-por-tipo.component.html',
  styleUrls: ['./publicacion-por-tipo.component.css']
})
export class PublicacionPorTipoComponent implements OnInit{

  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabel:String[]=[];
  barCharType:ChartType='bar';
  barChartLegend=true
  barChartData:ChartDataset[]=[]


  constructor(private pS:PublicationService){}

  ngOnInit(): void {
    this.pS.getCount().subscribe(data=>{
      this.barChartLabel=data.map((item)=>item.typeRecursotype);
      this.barChartData=[{
        data:data.map((item)=>item.quantityPublication),
        label:'Cantida de Publicaciones por Tipo',
        backgroundColor: '#2AC95A'
      },
      ]
    })
      
  }
}
