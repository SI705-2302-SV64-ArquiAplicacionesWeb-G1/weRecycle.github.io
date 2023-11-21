import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartType, ChartDataset } from 'chart.js';
import { RolesService } from 'src/app/services/roles.service';
import { UserorService } from 'src/app/services/useror.service';
@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css']
})
export class UsuariosRegistradosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Desactiva el mantenimiento del aspecto

    // Puedes ajustar el ancho y alto según sea necesario
    aspectRatio: 0.8,};


    barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: RolesService) {}

  ngOnInit(): void {
    this.uS.getCount().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.typeAccount);
      this.barChartData = [
        {
          data: data.map((item) => item.quantityAccount),
          label: 'Registrados',
          backgroundColor: ['#00BF35', '#BF0035', '#3500BF' ],
          borderColor: '#8FBC8F',
          borderWidth: 1,
        },
      ];
    });
  }
}
