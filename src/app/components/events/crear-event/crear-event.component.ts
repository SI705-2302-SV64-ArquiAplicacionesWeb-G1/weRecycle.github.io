import { Component, OnInit } from '@angular/core';
import { Ubication } from 'src/app/models/ubication';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { UbicationService } from 'src/app/services/ubication.service';
import { Events } from 'src/app/models/events';
import { map, startWith } from 'rxjs';
import { Useror } from 'src/app/models/useror';
import { UserorService } from 'src/app/services/useror.service';

@Component({
  selector: 'app-crear-event',
  templateUrl: './crear-event.component.html',
  styleUrls: ['./crear-event.component.css']
})


export class CrearEventComponent implements OnInit {
  form: FormGroup= new FormGroup({});;
  event: Events = new Events();
  mensaje: string = '';
  listaUbicacion: Ubication[] = [];
  filteredTipoCiudad: any;
  cityUbication= new FormControl();
  userLast:Useror=new Useror()
  edicion: boolean = false;
  id: number = 0;
  minDate = new Date(); 


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
  
  tipoLugar: { value: string; viewValue: string }[] = [
    { value: 'Centro de reciclaje comunitario', viewValue: 'Centro de reciclaje comunitario' },
    { value: 'Centro de reciclaje de plásticos', viewValue: 'Centro de reciclaje de plásticos' },
    { value: 'Centro de reciclaje de textiles', viewValue: 'Centro de reciclaje de textiles' },
    { value: 'Centro de reciclaje de residuos orgánicos', viewValue: 'Centro de reciclaje de residuos orgánicos' },
    { value: 'otros', viewValue: 'otros' },
    ];
  constructor(
    private eS: EventsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UbicationService,
    private userS:UserorService,
    private route: ActivatedRoute


  ) {
    
  }

  ngOnInit(): void {

    const currentUser = this.userS.getCurrentUser();

        if (currentUser) {
            this.userLast=currentUser;
        }
        else {
          console.error('Usuario actual no encontrado');
        }
        
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log(this.edicion);

      this.init();
    });



    this.form = this.formBuilder.group({
      idEvent:[''],
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      numberParticipant: ['', Validators.required],
      idUbication: [0, Validators.required],
      addressUbication:['', Validators.required],
      cityUbication:['', Validators.required],
      contactUbication:['', [Validators.required, this.validateContactNumber.bind(this)]],
      typeUbication:['', Validators.required],
      descUbication:['',],
    });

    this.filteredTipoCiudad = this.cityUbication.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  validateContactNumber(control: AbstractControl): ValidationErrors | null {
    const contactNumber = control.value;
    if (contactNumber && contactNumber.toString().length === 9) {
      return null; 
    } else {
      return { invalidContactNumber: true }; 
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
            addressUbication: this.form.get('addressUbication')?.value,
            ubicationDate: new Date(this.form.get('date')?.value),
            cityUbication: this.form.get('cityUbication')?.value,
            contactUbication: this.form.get('contactUbication')?.value,
            typeUbication: this.form.get('typeUbication')?.value,
            descUbication: this.form.get('descUbication')?.value,
            idUsuario:this.userLast
          };

        this.uS.insert(newUbication).subscribe({
          next: (createdUbication: Ubication) => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
            this.uS.list().subscribe({
              next: (ubications: Ubication[]) => {
                const lastUbication = ubications[ubications.length - 1];
                this.addEvent(lastUbication);
              },
              error: (error) => {
                console.error('Error al obtener las ubicaciones', error);
              }
            });
          },
          error: (error) => {
            console.error('Error al insertar la ubicación', error);
          }
        });
       }
       
    }
  }


  addEvent(ubication: Ubication) {
    if(this.form)
    {
      this.event.title = this.form.value.title;
    this.event.date = this.form.value.date;
    this.event.description = this.form.value.description;
    this.event.hora = this.form.value.hora;
    this.event.numberParticipant=this.form.value.numberParticipant;
    this.event.idUbication = ubication;
    
      this.eS.insert(this.event).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });
      this.router.navigate(['components/event']);
    }
      
  }


  update(){

    this.event.title = this.form.value.title;
    this.event.date = this.form.value.date;
    this.event.description = this.form.value.description;
    this.event.hora = this.form.value.hora;
    this.event.numberParticipant=this.form.value.numberParticipant;
    
    this.event.idUbication.addressUbication = this.form.value.addressUbication;
    this.event.idUbication.cityUbication = this.form.value.cityUbication;
    this.event.idUbication.contactUbication = this.form.value.contactUbication;
    this.event.idUbication.typeUbication = this.form.value.typeUbication;
    this.event.idUbication.descUbication = this.form.value.descUbication;
  
    this.eS.update(this.event).subscribe(
      () => {
        console.log(this.event)

        console.log('Evento actualizado exitosamente.');
        this.router.navigate(['components/event/mis-eventos']);
      },
      (error) => {
        console.error('Error al actualizar el evento', error);
      }
    );

  }

  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data) => {
        console.log('Data from listId:', data);
        this.event=data;
      
        let addressUbication= data.idUbication.addressUbication;
        let cityUbication=data.idUbication.cityUbication;
        let contactUbication= data.idUbication.contactUbication;
        let typeUbication= data.idUbication.typeUbication;
        let descUbication= data.idUbication.descUbication;
       
        this.form = this.formBuilder.group({
          idEvent: [data.idEvent],
          title: [data.title],
          date: [data.date],
          description: [data.description],
          numberParticipant: [data.numberParticipant],
          hora: [data.hora],
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


