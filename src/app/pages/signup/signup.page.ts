import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CityDTO } from 'src/models/city.dto';
import { StateDTO } from 'src/models/state.dto';
import { CityService } from 'src/services/domain/city.service';
import { ClientService } from 'src/services/domain/client.service';
import { StateService } from 'src/services/domain/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  states: StateDTO[];
  cities: CityDTO[];

  constructor(
    private formBuilder: FormBuilder, 
    private cityService: CityService, 
    private stateService: StateService,
    private clientService: ClientService,
    private alertCtrl: AlertController) { 

    this.formGroup = formBuilder.group({
      name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      type: ['1', [Validators.required]],
      idNumber: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      password: ['123', [Validators.required]],
      streetName: ['Rua Vila', [Validators.required]],
      number: ['25', [Validators.required]],
      additionalInfo: ['Apto 3', [Validators.required]],
      district: ['Copacabana', [Validators.required]],
      zipcode: ['10828333', [Validators.required]],
      phone1: ['977261827', [Validators.required]],
      phone2: ['', []],
      phone3: ['', []],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.stateService.findAll().subscribe(
      response => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },
      error => { });
  }

  signupUser() {
    this.clientService.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

 async showInsertOk() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      buttons: ['OK']
    });
    await alert.present();
  }

  updateCities() {
    let state_Id = this.formGroup.value.stateId;
    this.cityService.findAll(state_Id).subscribe(
      response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      error => { });
  }
}
