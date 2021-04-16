import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService, Gag } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-gag',
  templateUrl: './new-gag.page.html',
  styleUrls: ['./new-gag.page.scss'],
})
export class NewGagPage implements OnInit {
  gag: Gag = {
    title: '',
    image: null,
    creator: null
  };

  constructor(
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async save(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.dataService.addGag(this.gag).then(res => {
      console.warn('Afted ADD: ', res);
      loading.dismiss();
      this.router.navigateByUrl('/');
    });
  }

}
