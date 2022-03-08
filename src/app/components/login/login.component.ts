import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DefDomainsService } from 'src/app/services/def-domains.service';
import { ServerData } from 'src/app/interfaces/server-data.interface';
import { environment } from '../../../environments/environment';
import { DistributionCentersService } from 'src/app/services/distribution-centers.service';
import { TranslationsService } from 'src/app/services/translations.service';
import { LangService } from '../../services/lang.service';
import { Globals } from 'src/app/global-config';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../interfaces/user.interface';
import { EwmsUser } from '../../interfaces/ewms-user';
import Swal from 'sweetalert2';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { NgxSpinnerService } from "ngx-spinner";

import { DeviceUUID } from 'device-uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  returnUrl: string
  error: string = ''
  environment: string
  owner: string
  dataServer: string
  //database: string
  serverName: string
  version: string
  warehouse: string
  distributionCenters: { [key: string]: Object }[]
  cmbDistributionCenterFields: Object = { text: 'text', value: 'id' }
  dcPlaceholder: string = "Distribution Center"
  cmbDistributionCenterError: string
  localIp: string
  lblUsername: string
  lblPassword: string
  lblForklift: string
  requiredField: string
  lblButton: string
  loadingData: boolean = false

  @ViewChild('distributionDropdown') distributionCenterDropDown: DropDownListComponent
  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private defDomainsService: DefDomainsService,
    private distributionCentersService: DistributionCentersService,
    private translationsService: TranslationsService,
    private zone: NgZone,
    private langService: LangService,
    private globals: Globals,
    private storageService: StorageService,
    private arrivalsService: ArrivalsService,
    private parametersServices: ParametersService,
    private storage: StorageService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {   
    this.loginForm = this.formBuilder.group({
      username: [{ value: '', disabled: this.loadingData }, Validators.required],
      password: [{ value: '', disabled: this.loadingData }],
      forklift: [{ value: '', disabled: this.loadingData }],
      //distributioncenter: [{ value: '', disabled: this.loadingData }, Validators.required]
    })

    this.version = environment.version
    this.warehouse = this.storageService.getLocalStorageValue("publicDefaultWH")

    // reset login status
    this.authService.logout()
    // get the return url
    this.returnUrl = this.authService.redirectUrl

    // get domian values
    this.defDomainsService.getServerData().subscribe(
      data => {
        this.setEnvironmentData(data)
      },
      error => {
        this.error = error
      }
    )

  
    // set translations
    this.translationsService.init(environment.defaultLang)

    //localstorage    
    var globalprop = JSON.stringify(this.globals).replace("{", "").replace("}", "").split(",");

    globalprop.forEach(item => {
      var _item = item.split(':');
      this.storage.setLocalStorageValue(JSON.parse(_item[0]), JSON.parse(_item[1]));
    });

    // set global values
    setTimeout(() => this.setLabels(), 100);
  }

  get f() { return this.loginForm.controls }

  onSubmit() {
    if (this.loginForm.invalid) return

    this.spinner.show()
    this.loadingData = true


   // var uuid = new DeviceUUID().get();
   // console.log(uuid);




        this.authService.getAuthorizeDevice("1", "1").subscribe(result => {

            this.spinner.hide()
            this.loadingData = false
            if (result.success) {


             this.authService.login(this.f.username.value, this.f.password.value, "1", "")
            .subscribe(

              
              data => {
                this.spinner.hide()
                this.loadingData = false
                console.log(data.success);

                if (data.success) {

                  var usr = data.related_data as EwmsUser
                 
                  console.log(usr);
                  console.log("antes de guardar las variasbes");
                           
                  //save global variables
                  //nuewvariables
                  this.storage.setLocalStorageValue("UserNoPhotos", usr.UserNoPhotos);
                  this.storage.setLocalStorageValue("UserNoAlbums", usr.UserNoAlbums);
                  this.storage.setLocalStorageValue("UserName", usr.UserName);
                  this.storage.setLocalStorageValue("UserUsername", usr.UserUsername);
                  this.storage.setLocalStorageValue("UserEmail", usr.UserEmail);
                  this.storage.setLocalStorageValue("UserId", usr.USER_ID);
                  this.storage.setLocalStorageValue("UserAlbums", JSON.stringify(usr.UserAlbums));
                  this.storage.setLocalStorageValue("UserPhotos", JSON.stringify(usr.UserPhotos));
                
                  
              
               

                  //oldvariables
                  this.storage.setLocalStorageValue("publicDC", "1");
                  this.storage.setLocalStorageValue("publicUserName", `${usr.LASTNAME} ${usr.FIRSTNAME}`)
                  this.storage.setLocalStorageValue("publicForklift", this.f.forklift.value);
                  this.authService.setLogin(this.f.username.value.trim())
                  this.storage.setLocalStorageValue("publicTimeOffset", new Date().getTimezoneOffset())
                  
                  

                  //go to de main page
                  this.router.navigateByUrl('/others/inventory/init');
                  
                 

                } else {

                  console.log("no existe el usiao");

                  if (data.error_code == "500X") {
                    Swal.fire('Warning', data.message, 'warning');
                  } else if (data.error_code == "500E") {
                    Swal.fire('Error', data.message, 'error');
                  }
                }
              },
              error => {

                console.log("error2");

                this.error = error
                Swal.fire('Error', error.message, 'error');

                this.loadingData = false
              }
            )

        
        } else {
         
          //alert("fracaso");
        }

      })

  }

  setEnvironmentData(data: ServerData) {
    this.owner = data.Owner
    this.environment = environment.sEnviroment
    //this.database = data.Database
    this.dataServer = data.Dataserver
    this.serverName = data.ServerName
  }

  

  setLabels() {
 

    this.lblUsername = "User";
    this.lblPassword = "Password";
    this.requiredField = "This field is required";
    this.cmbDistributionCenterError = "You must select a distribution center";
    this.dcPlaceholder  = "Distribution Center";
    this.lblButton = "LOG IN";



    this.goToUsername();

  }

  goToUsername() {
    this.renderer.selectRootElement('#username').focus()
  }

  checkPasswordKeyPressed(event) {
    if (event.key === 'tab') {
      event.preventDefault()
      this.goToForkLift()
    }

  }

  goToPassword() {
    this.renderer.selectRootElement('#password').focus()
  }

  goToForkLift() {
    this.renderer.selectRootElement('#forklift').focus()
  }

  private determineLocalIp() {
    const pc = new RTCPeerConnection({ iceServers: [] })

    pc.createDataChannel('')
    pc.createOffer().then(pc.setLocalDescription.bind(pc))
    pc.onicecandidate = (ice) => {
      this.zone.run(() => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          return;
        }
        //this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1]
        this.localIp = ''

        pc.onicecandidate = () => { }
        pc.close()
      })
    }
  }

}
