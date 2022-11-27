import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public produto = '';
  public preco: any;
  public quantidade: any;
  public arrControle: any = [];

  constructor(
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.storage.get('controleGastos').then((controleGastos) => {
      this.arrControle = [];
      if(controleGastos){
        this.arrControle = controleGastos;
      }
    });
  }

  controleGastos(){
    this.arrControle.push({
      produto: this.produto,
      preco: this.preco,
      qtd: this.quantidade
    });

    this.storage.set('controleGastos', this.arrControle);
  }

}
