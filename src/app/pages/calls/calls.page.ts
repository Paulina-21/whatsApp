import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import callsData from "../../../assets/data/calls.json"
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.page.html',
  styleUrls: ['./calls.page.scss'],
})
export class CallsPage implements OnInit {
  allCalls = callsData.sort((a,b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  calls = this.allCalls;
  segmentFilter = "all";
  @ViewChildren(IonItemSliding) items: QueryList<IonItemSliding>;
  edit = false;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event){
    this.segmentFilter = event.detail.value;
    if (this.segmentFilter == "all"){
      this.calls = this.allCalls;
    } else {
      this.calls = this.allCalls.filter(call=>call.missed);
    }
  }

  toggleEdit(){
    this.edit = !this.edit;

    this.items.forEach(item=> {
      if (this.edit) {
        item.open('start');
      } else {
        item.close()
      }
    })
  }

  removeCall(call){
    // for testing it's filter, needs a delete implementation wher it actually is removed
    this.calls = this.calls.filter(c=>c.id != call.id);
  }

}
