import { Ubication } from 'src/app/models/ubication';
import { Component, OnInit } from '@angular/core';
import { RecyclingCenterService } from 'src/app/services/recycling-center.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecyclingCenter } from 'src/app/models/RecyclingCenter';
import { UbicationService } from 'src/app/services/ubication.service';
import { startWith, map } from 'rxjs/operators';
import { Useror } from 'src/app/models/useror';
import { UserorService } from 'src/app/services/useror.service';



@Component({
  selector: 'app-crear-recycling-center',
  templateUrl: './crear-recycling-center.component.html',
  styleUrls: ['./crear-recycling-center.component.css']
})
export class CrearRecyclingCenterComponent implements OnInit {
  form: FormGroup= new FormGroup({});;
  recyclingCenter: RecyclingCenter = new RecyclingCenter();
  mensaje: string = '';
  cityUbication= new FormControl();
  filteredTipoCiudad: any;
  userLast:Useror=new Useror();
  edicion: boolean = false;
  id: number = 0;
  tipoCiudad = [
    { value: 'Ancón', viewValue: 'Ancón' },
    { value: 'Ate', viewValue: 'Ate' },
    { value: 'Breña', viewValue: 'Breña' },
    { value: 'Carabayllo', viewValue: 'Carabayllo' },
    { value: 'Chaclacayo', viewValue: 'Chaclacayo' },
    { value: 'Cieneguilla', viewValue: 'Cieneguilla' },
    { value: 'Comas', viewValue: 'Comas' },
    { value: 'El Agustino', viewValue: 'El Agustino' },
    { value: 'Independencia', viewValue: 'Independencia' },
    { value: 'Jesús Maria', viewValue: 'Jesús Maria' },
    { value: 'La Victoria', viewValue: 'La victoria' },
    { value: 'Los Olivos', viewValue: 'Los Olivos' },
    { value: 'San Juan de Lurigancho', viewValue: 'San Juan de Lurigancho' },
    { value: 'Lurín', viewValue: 'Lurín' },
    { value: 'Pueblo Libre', viewValue: 'Pueblo Libre' },
    { value: 'Miraflores', viewValue: 'Miraflores' },
    { value: 'Pachacamac', viewValue: 'Pachacamac' },
    { value: 'Punta Hermosa', viewValue: 'Punta Hermosa' },
    { value: 'Rimac', viewValue: 'Rimac' },
    { value: 'San Isidro', viewValue: 'San Isidro' },
    { value: 'Barranco', viewValue: 'Barranco' },
    { value: 'San Borja', viewValue: 'San Borja' },
    { value: 'Surco', viewValue: 'Surco' },
    { value: 'La Molina', viewValue: 'La Molina' },
    { value: 'Lince', viewValue: 'Lince' },
    { value: 'Chorrillos', viewValue: 'Chorrillos' },
  ];
  
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Centro de reciclaje comunitario', viewValue: 'Centro de reciclaje comunitario' },
    { value: 'Centro de reciclaje de plásticos', viewValue: 'Centro de reciclaje de plásticos' },
    { value: 'Centro de reciclaje de textiles', viewValue: 'Centro de reciclaje de textiles' },
    { value: 'Centro de reciclaje de residuos orgánicos', viewValue: 'Centro de reciclaje de residuos orgánicos' },
    { value: 'otros', viewValue: 'otros' },
    ];
  constructor(
    private rS: RecyclingCenterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UbicationService,
    private userS:UserorService,
    private route: ActivatedRoute

  ) {
    
  }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log(this.edicion);

      this.init();
    });

    const currentUser = this.userS.getCurrentUser();

    if (currentUser) {
        this.userLast=currentUser;
    }
    else {
      console.error('Usuario actual no encontrado');
    }
 


    this.form = this.formBuilder.group({
      idRecyclingCenter:[''],
      nameRecyclingCenter: ['', Validators.required],
      licenseRecyclingCenter: ['', Validators.required],
      openinghourRecyclingCenter: ['', [Validators.required, Validators.max(24), Validators.min(0)]],
      closingtimeRecyclingCenter: ['', [Validators.required]],
      idUbication: ['0', Validators.required],
      addressUbication:['', Validators.required],
      cityUbication:['', Validators.required],
      contactUbication:['', [Validators.required, this.validateContactNumber.bind(this)]],
      descUbication:['',],
      typeUbication:['',Validators.required]
    });

    this.filteredTipoCiudad = this.cityUbication.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  validateContactNumber(control: AbstractControl): ValidationErrors | null {
    const contactNumber = control.value;
    if (contactNumber && contactNumber.toString().length === 9) {
      return null; // La validación pasa si el número tiene 9 dígitos
    } else {
      return { invalidContactNumber: true }; // La validación falla si el número no tiene 9 dígitos
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tipoCiudad
      .filter(option => option.viewValue.toLowerCase().includes(filterValue))
      .map(option => option.viewValue);
  }
  

  
  onSubmit() {

    if(this.edicion){

      this.update();
      
     }

     else{
      if (this.form.valid) {
        let newUbication: Ubication = {
          idUbication: 0,
          ubicationDate: new Date(),
          addressUbication: this.form.get('addressUbication')?.value,
          cityUbication: this.form.get('cityUbication')?.value,
          contactUbication: this.form.get('contactUbication')?.value,
          typeUbication: this.form.get('typeUbication')?.value,
          descUbication: this.form.get('descUbication')?.value,
          idUsuario:this.userLast
        };
        
         
        this.uS.insert(newUbication).subscribe({
          next: (createdUbication: Ubication) => {
            this.uS.list().subscribe({
              next: (ubications: Ubication[]) => {
                const lastUbication = ubications[ubications.length -1];
                console.log(lastUbication.idUsuario)
                this.addRecyclingCenter(lastUbication);
              },
              error: (error) => {
                console.error('Error al obtener las ubicaciones', error);
              }
            });
          },
          error: (error) => {
            console.error('Error al insertar la ubicación', error);
          }
        });}
     }
  }
  addRecyclingCenter(ubication: Ubication) {
    this.recyclingCenter.nameRecyclingCenter = this.form.value.nameRecyclingCenter;
    this.recyclingCenter.licenseRecyclingCenter = this.form.value.licenseRecyclingCenter;
    this.recyclingCenter.openinghourRecyclingCenter = this.form.value.openinghourRecyclingCenter;
    this.recyclingCenter.closingtimeRecyclingCenter = this.form.value.closingtimeRecyclingCenter;
    this.recyclingCenter.idUbication = ubication;
  
    this.rS.insert(this.recyclingCenter).subscribe(
      () => {
        console.log('Recycling Center inserted successfully.');
        this.router.navigate(['components/center-recycling']);
      },
      (error) => {
        console.error('Error al insertar el centro de reciclaje', error);
      }
    );
  }

  checkValue(): void {
    const input1 = document.getElementById("openinghourRecyclingCenter") as HTMLInputElement;
    const value1 = parseInt(input1.value, 10);

    const input2 = document.getElementById("closingtimeRecyclingCenter") as HTMLInputElement;
    const value2 = parseInt(input2.value, 10);
  
    if (value1 > 24) {
      alert("La hora no puede ser mayor que 24.");
      input1.value = "24";
    }
    if (value1 < 1) {
      alert("La hora no puede ser menor que 0.");
      input1.value = "1";
    }

    if (value2 > 24) {
      alert("La hora no puede ser mayor que 24.");
      input2.value = "24";
    }
    if (value2 < 1) {
      alert("La hora no puede ser menor que 0.");
      input2.value = "1";
    }

    if (value1 > value2) {
      alert("La hora de apertura no puede ser mayor a la hora de cierre.");
      input1.value = input2.value;

    } else if (value2 < value1) {
      alert("La hora de cierre no puede ser menor que la hora de apertura.");
      input2.value = input1.value;
    }

  }


     
  url: string | ArrayBuffer | null = null;

onSelect(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        this.url = event.target.result;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}


  update(){

    this.recyclingCenter.nameRecyclingCenter=this.form.value.nameRecyclingCenter;
    this.recyclingCenter.licenseRecyclingCenter=this.form.value.licenseRecyclingCenter;
    this.recyclingCenter.openinghourRecyclingCenter=this.form.value.openinghourRecyclingCenter;
    this.recyclingCenter.closingtimeRecyclingCenter=this.form.value.closingtimeRecyclingCenter;


    this.recyclingCenter.idUbication.addressUbication = this.form.value.addressUbication;
    this.recyclingCenter.idUbication.cityUbication = this.form.value.cityUbication;
    this.recyclingCenter.idUbication.contactUbication = this.form.value.contactUbication;
    this.recyclingCenter.idUbication.typeUbication = this.form.value.typeUbication;
    this.recyclingCenter.idUbication.descUbication = this.form.value.descUbication;

    this.rS.update(this.recyclingCenter).subscribe(
      () => {
        console.log(this.recyclingCenter)

        console.log('Evento actualizado exitosamente.');
        this.router.navigate(['components/center-recycling']);
      },
      (error) => {
        console.error('Error al actualizar el centro', error);
      }
    );

  }


  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data) => {
        console.log('Data from listId:', data);
        this.recyclingCenter=data;
      
        let addressUbication= data.idUbication.addressUbication;
        let cityUbication=data.idUbication.cityUbication;
        let contactUbication= data.idUbication.contactUbication;
        let typeUbication= data.idUbication.typeUbication;
        let descUbication= data.idUbication.descUbication;
       
        this.form = this.formBuilder.group({
          
          nameRecyclingCenter:[data.nameRecyclingCenter],
          licenseRecyclingCenter:[data.licenseRecyclingCenter],
          openinghourRecyclingCenter:[data.openinghourRecyclingCenter],
          closingtimeRecyclingCenter:[data.closingtimeRecyclingCenter],

          idUbication: [data.idUbication.idUbication],
          addressUbication: [addressUbication],
          cityUbication: [cityUbication],
          contactUbication: [contactUbication, [Validators.required, this.validateContactNumber.bind(this)]],
          typeUbication: [typeUbication],
          descUbication: [descUbication],
        });
      })
    }
  }
  
}


