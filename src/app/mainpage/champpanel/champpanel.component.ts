import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-champpanel',
  templateUrl: './champpanel.component.html',
  styleUrls: ['./champpanel.component.scss']
})
export class ChamppanelComponent implements OnInit {

  @Input("items") items: any;
  @Input("champions") champions: any;

  constructor() { }

  ngOnInit() {
  }

}
