import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public arrCalculo: any = [];

  constructor(
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.storage.get('controleGastos').then((controleGastos) => {
      
      this.arrCalculo = [];

      if(controleGastos){

        for(let i = 0; i < controleGastos.length; i++){
          this.arrCalculo.push({
            produto: controleGastos[i].produto,
            valorTotal: controleGastos[i].preco * controleGastos[i].qtd
          })
        }
      
      }

    });
  }

}
