import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiotapiService {

  public headers: any = { 'Authorization': 'RGAPI-cff4585a-ac90-4996-bb09-453d71dfe073', 'My-Custom-Header': 'foobar' }

  private versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
  private itemsUrl = "http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/item.json"; 
  private championsUrl = "http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion.json"  

  private patch: string;

  constructor(private http: HttpClient) { }


  public getVersions(){
    return new Promise((resolve, reject)=>{ 
      
      this.http.get(this.versionsUrl).subscribe((data:any) => {      
          this.patch = data[0];    
          resolve(data);
        });    
 
    })
 
  }

  public getItems(): any {
    
    return new Promise((resolve, reject)=>{
      let items: any = [];

      let prom = this.getVersions().then(response=>{ 
        return response[0];
      });
      prom.then(response=>{
        
        this.http.get(this.getVersionedUrlItems(response)).subscribe((data:any) => {              
          Object.keys(data.data).map((index)=>{
              let element = data.data[index];
              items.push(element);
          });    
          if(items != undefined){
            resolve(items);
          }
          else{
            reject('failed');
          }
      })
      })



    });
  }

  public getChampions(): any {
    
    return new Promise((resolve, reject)=>{
      let champions: any = [];
      this.http.get(this.getVersionedUrlChamps(this.patch)).subscribe((data:any) => {              
        Object.keys(data.data).map((index)=>{
            let element = data.data[index];
            champions.push(element);
        });    
        if(champions != undefined){
          resolve(champions);
        }
        else{
          reject('failed');
        }
    })

    });
  }

  public getItemImageUrl(itemUrl){

    let url = 'http://ddragon.leagueoflegends.com/cdn/'+this.patch+'/img/item/' + itemUrl
    
    return url;
  }


  private getVersionedUrlItems(patch){
    return "http://ddragon.leagueoflegends.com/cdn/" +patch+ "/data/en_US/item.json"
  }

  private getVersionedUrlChamps(patch){
    return  "http://ddragon.leagueoflegends.com/cdn/"+ patch +"/data/en_US/champion.json"
  }
 
 


}
