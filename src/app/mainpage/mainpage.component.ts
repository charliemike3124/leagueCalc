import { Component, OnInit } from '@angular/core';
import { RiotapiService} from '../../app/services/riotapi/riotapi.service'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  providers: [RiotapiService]
})
export class MainpageComponent implements OnInit {

  public items: any = [];
  public champions: any = [];
  public champPanels: any = [1];

  constructor(private riot: RiotapiService){

  }

  ngOnInit() { 
    
    this.initializeLists();
  }
 

  public initializeLists(){
    let prom = this.riot.getItems().then(response =>{
      this.items = response;
      console.log(this.items);
      return response;
    })
    prom.then(response =>{
      let champProm = this.riot.getChampions().then(response=>{
        this.champions = response;
        console.log(this.champions);
        return response;
      })
    })


  }


  public getImg(itemUrl):string{
    return this.riot.getItemImageUrl(itemUrl);
  }

  addPanel(){
    this.champPanels.push(1);
  }
  removePanel(){
    this.champPanels.pop();
  }
}
