import { Component, OnInit, Input } from '@angular/core';
import { RiotapiService} from '../../../app/services/riotapi/riotapi.service'
import { OverlayPanel } from 'primeng/overlaypanel/public_api';
import { rejects } from 'assert';

@Component({
  selector: 'app-champpanel',
  templateUrl: './champpanel.component.html',
  styleUrls: ['./champpanel.component.scss']
})
export class ChamppanelComponent implements OnInit {

  @Input("items") items: any;
  @Input("champions") champions: any; 
  public overlayPanel: OverlayPanel;

  public SRitems: any = [];
  public selectedChampion: any;
  public championsOptions: any = [];
  public searchedItem: string = ''; 
  public goldCost: number = 0;
  public csNeeded: number = 0;

  public champLevel: number = 0;
  public gameTime: number = 0;

  public BonusHP: number = 0;
  public BonusHPregen: number = 0;
  public BonusMP: number = 0;
  public BonusMPregen: number = 0;
  public BonusArmor: number = 0;
  public BonusMr: number = 0;
  public BonusAD: number = 0;
  public BonusAP: number = 0;
  public BonusAS: number = 0;
  public Crit: number = 0;
  public BonusMS: number = 0;
  public BonusRange: number = 0;
  public CDR: number = 0;
  public lifeSteal: number = 0;
  public spellVamp: number = 0; 
  public tenacity: number = 0;
  public goldPerMinute: number = 122.4;

  //REGEX
  private HPRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Health)');
  private HPRegenRegex: RegExp = new RegExp('(\d+)% (Base Health Regen)');
  private MPRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Mana)');
  private CDRRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Cooldown Reduction)');
  private MPRegenRegex: RegExp = new RegExp('(\d+)% (Base Mana Regen)');
  private ArmorRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Armor)');
  private MRRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Magic Resist)'); 
  private ADRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Attack Damage)');
  private APRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Ability Power)');
  private CritRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Critical Strike Chance)');
  private MsRegex: RegExp = new RegExp('(\d+)[^,.\d\n]+?(?=Movement Speed)');

  public equippedItems: any = [undefined,undefined,undefined,undefined,undefined,undefined];
  public itemTooltipDisabled: boolean = false;
  

  public Stats: any = [{value: 0,imgUrl:"assets/health_icon.png",name:'HP'},
                                {value: 0, imgUrl: "assets/health_regen_icon.png",name:'HPregen'},
                                {value: 0, imgUrl: "assets/Mana_icon.png",name:'MP'},
                                {value: 0, imgUrl: "assets/Mana_regeneration_icon.png",name:'MPregen'},
                                {value: 0, imgUrl: "assets/Armor_icon.png",name:'Armor'},
                                {value: 0, imgUrl:"assets/Magic_resistance_icon.png",name:'Mr'},
                                {value: 0, imgUrl: "assets/Attack_damage_icon.png",name:'AD'},
                               {value: 0, imgUrl: "assets/Ability_power_icon.png",name:'AP'},
                               {value: 0, imgUrl:"assets/Attack_speed_icon.png",name:'AS' },
                               {value: 0, imgUrl:"assets/Critical_strike_damage_icon.png",name:'Crit' },
                               {value: 0,imgUrl: "assets/Life_steal_icon.png",name:'LS'},
                               {value: 0, imgUrl: "assets/Spell_vamp_icon.png",name:'SV'},
                               {value: 0,imgUrl: "assets/Movement_speed_icon.png",name:'MS'},
                                {value:0,imgUrl: "assets/Range_icon.png",name:'Range'},
                                {value:0,imgUrl: "assets/Cooldown_reduction_icon.png",name:'CDR'}
                              ];
 
  constructor(private riotapi: RiotapiService) { }

  ngOnInit() {
    setTimeout(() => {
      for(let champ of this.champions){
        this.championsOptions.push({label: champ.name, value: champ})
      }  
      for(let item of this.items){
        if(item.maps[11] && !item.consumed && item.requiredChampion == undefined && item.gold.purchasable)
          this.SRitems.push(item);
      }
      console.log(this.SRitems)
      
    }, 300);

  } 

  public getChampUrl(url:string){  
    return this.riotapi.getChampionImageUrl(url);
  }

  public getItemUrl(url:string){
    return this.riotapi.getItemImageUrl(url);
  }

  public increaseLevel(increase:boolean){
    if(increase){
      if(this.champLevel != 17)
        this.champLevel++;
    }
    else{
      if(this.champLevel != 0)
        this.champLevel--;
    }
    
  }
  
  public increaseGameTime(increase:boolean){
    if(increase){
      if(this.gameTime != 60)
        this.gameTime+= 10;
    }
    else{
      if(this.gameTime != 0)
        this.gameTime-= 10;
    }
    
  }
 
  public round(number){
    return Math.round(number);

  }
  public onChampSelect(selectedChampion){
     

    this.riotapi.getChampionSpecific(selectedChampion.name).then(response =>{
      console.log(response);
    })
  }

  public calcStat(baseStat,statPerLvl, bonus,decimals,stat:string ){
    let result = baseStat + (this.champLevel * statPerLvl) + bonus;
    let dec = 1 * Math.pow(10,decimals); 
    let total = Math.round(result * dec)/dec;

    switch(stat){
      case 'hp':
        this.Stats[0].value = total;
        break;
      case 'hpregen':
        this.Stats[1].value = total;
        break;
      case 'mp':
        this.Stats[2].value = total;
        break;
      case 'mpregen':
        this.Stats[3].value = total;
        break;
      case 'armor':
        this.Stats[4].value = total;
        break;
      case 'mr':
        this.Stats[5].value = total;
        break;
      case 'ad':
        this.Stats[6].value = total;
        break;
      case 'ap':
        this.Stats[7].value = total;
        break;
      case 'as':
        this.Stats[8].value = total;
        break;
      case 'crit':
        this.Stats[9].value = total;
        break;
      case 'ls':
        this.Stats[10].value = total;
        break;
      case 'sv':
        this.Stats[11].value = total;
        break;
      case 'ms':
        this.Stats[12].value = total;
        break;
      case 'range':
        this.Stats[13].value = total;
        break;
      case 'cdr':
        this.Stats[14].value = total;
        break;
    }

    return total
  }

  public calcAS(baseStat,statPerLvl, bonus,decimals,stat:string ){
    let result = baseStat *(1 + (this.champLevel * statPerLvl/100) + bonus);
    let dec = 1 * Math.pow(10,decimals); 

    if(Math.round(result * dec)/dec >= 2.5){
      return 2.5
    }

    return Math.round(result * dec)/dec;
  }
 
  public toggleOverlayPanel(event,op){ 
    this.overlayPanel = event;
    op.show(event)

  }

  public getItemTooltip(item){
    if(typeof(item) == "number"){
      return this.getItemTooltip(this.equippedItems[item]);
    }
    else{
    let tooltip = ""; 
    let uniqueRegex = new RegExp('(<passive>)|(<unique>)') 
    let uniqueRegexClosing = new RegExp('(<\/passive>)|(<\/unique>)')  
    tooltip += '<img src="'+this.getItemUrl(item.image.full)+'" width="20px">&nbsp;' + item.name + '<br>'+ '<img src="assets/items.png"/>&nbsp;' + item.gold.total + '<br><br>' + item.description; 
    tooltip = tooltip.replace(uniqueRegex, '<span style="color: #ffcf4a;">'); 
    tooltip = tooltip.replace(uniqueRegexClosing, '</span>'); 
    

    
    return tooltip;
    }
  }

  public equipItem(item, itemBox,op,itemIndex){  

      op.hide(this.overlayPanel)   

      if(this.equippedItems[itemIndex] != undefined){ 
        this.unequipItem(itemBox,itemIndex);
      }

      setTimeout(() => {
        this.equippedItems[itemIndex] = item;
        itemBox.style.background = 'url(' +this.getItemUrl(item.image.full) + ')'; 
        if(item.stats.FlatHPPoolMod){
          this.BonusHP += item.stats.FlatHPPoolMod;
        } 
        if(item.stats.FlatMPPoolMod){
          if(this.selectedChampion.partype == "Mana")
            this.BonusMP += item.stats.FlatMPPoolMod;
        } 
        if(item.stats.FlatArmorMod){
          this.BonusArmor += item.stats.FlatArmorMod;
        } 
        if(item.stats.FlatSpellBlockMod){
          this.BonusMr += item.stats.FlatSpellBlockMod;
        } 
        if(item.stats.FlatPhysicalDamageMod){
          this.BonusAD += item.stats.FlatPhysicalDamageMod;
        } 
        if(item.stats.FlatMagicDamageMod){
          this.BonusAP += item.stats.FlatMagicDamageMod;
        } 
        if(item.stats.FlatCritChanceMod){
          this.Crit += item.stats.FlatCritChanceMod * 100;
        } 
        if(item.stats.FlatMovementSpeedMod){
          this.BonusMS += item.stats.FlatMovementSpeedMod;
        } 
        if(item.stats.PercentLifeStealMod){
          this.lifeSteal += item.stats.PercentLifeStealMod * 100;
        } 
        if(item.stats.PercentAttackSpeedMod){
          this.BonusAS += item.stats.PercentAttackSpeedMod;
        } 
        if(item.stats.PercentMovementSpeedMod){
          this.BonusMS += this.selectedChampion.stats.movespeed * item.stats.PercentMovementSpeedMod;
        }   
        this.goldCost += item.gold.total; 
      }, 20); 



  }

  public unequipItem(itemBox, itemIndex){  
 

      if(this.equippedItems[itemIndex]== undefined) { 
        return false;
      } 
      else{
        itemBox.style.background = ''; 
        if(this.equippedItems[itemIndex].stats.FlatHPPoolMod){
          this.BonusHP -= this.equippedItems[itemIndex].stats.FlatHPPoolMod;
        } 
        if(this.equippedItems[itemIndex].stats.FlatMpPoolMod){
          if(this.selectedChampion.partype == "Mana")
            this.BonusMP -= this.equippedItems[itemIndex].stats.FlatMpPoolMod;
        } 
        if(this.equippedItems[itemIndex].stats.FlatArmorMod){
          this.BonusArmor -= this.equippedItems[itemIndex].stats.FlatArmorMod;
        } 
        if(this.equippedItems[itemIndex].stats.FlatSpellBlockMod){
          this.BonusMr -= this.equippedItems[itemIndex].stats.FlatSpellBlockMod;
        } 
        if(this.equippedItems[itemIndex].stats.FlatPhysicalDamageMod){
          this.BonusAD -= this.equippedItems[itemIndex].stats.FlatPhysicalDamageMod;
        } 
        if(this.equippedItems[itemIndex].stats.FlatMagicDamageMod){
          this.BonusAP -= this.equippedItems[itemIndex].stats.FlatMagicDamageMod;
        } 
        if(this.equippedItems[itemIndex].stats.FlatCritChanceMod){
          this.Crit -= this.equippedItems[itemIndex].stats.FlatCritChanceMod * 100;
        } 
        if(this.equippedItems[itemIndex].stats.FlatMovementSpeedMod){
          this.BonusMS -= this.equippedItems[itemIndex].stats.FlatMovementSpeedMod;
        } 
        if(this.equippedItems[itemIndex].stats.PercentLifeStealMod){
          this.lifeSteal -= this.equippedItems[itemIndex].stats.PercentLifeStealMod * 100;
        } 
        if(this.equippedItems[itemIndex].stats.PercentAttackSpeedMod){
          this.BonusAS -= this.equippedItems[itemIndex].stats.PercentAttackSpeedMod;
        } 
        if(this.equippedItems[itemIndex].stats.PercentMovementSpeedMod){
          this.BonusMS -= this.selectedChampion.stats.movespeed * this.equippedItems[itemIndex].stats.PercentMovementSpeedMod;
        }      
        
        this.goldCost -= this.equippedItems[itemIndex].gold.total;
    
        this.equippedItems[itemIndex] = undefined;
 
        return false;
      } 

    
    // item.stats.FlatMovementSpeedMod
    // item.stats.FlatHPPoolMod
    // item.stats.FlatCritChanceMod
    // item.stats.FlatMagicDamageMod
    //item.stats.FlatPhysicalDamageMod
    //item.stats.FlatMpPoolMod
    //item.stats.FlatMagicDamageMod
    

  }

  public calculateCs(){
    let timeGold = (this.goldPerMinute * this.gameTime) - 224.4;
    let meleeMinions = 0;




  }
 
}
