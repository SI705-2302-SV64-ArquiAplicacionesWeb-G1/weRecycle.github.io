import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FrequenQuestions } from 'src/app/models/frequenQuestions';
import { FrequenQuestionsService } from 'src/app/services/frequen-questions.service';

@Component({
  selector: 'app-creaedita-frequenquestions',
  templateUrl: './creaedita-frequenquestions.component.html',
  styleUrls: ['./creaedita-frequenquestions.component.css']
})
export class CreaeditaFrequenquestionsComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  preguntafrecuente: FrequenQuestions = new FrequenQuestions();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  /*tipos: { value: string; viewValue: string }[] = [
    { value: 'Pública', viewValue: 'Pública' },
    { value: 'Privada', viewValue: 'Privada' },
  ];*/

  constructor(
    private uS: FrequenQuestionsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idFrequenQuestions: [''],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      category: ['', Validators.required],
      dificultYLevel: ['', Validators.required],
      updateDate: ['', Validators.required],
      publicationStatus: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.preguntafrecuente.idFrequenQuestions = this.form.value.idFrequenQuestions;
      this.preguntafrecuente.question = this.form.value.question;
      this.preguntafrecuente.answer = this.form.value.answer;
      this.preguntafrecuente.category = this.form.value.category;
      this.preguntafrecuente.dificultYLevel = this.form.value.dificultYLevel;
      this.preguntafrecuente.updateDate = this.form.value.updateDate;
      this.preguntafrecuente.publicationStatus = this.form.value.publicationStatus;

      this.uS.insert(this.preguntafrecuente).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['frequentquestioncontroller']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
