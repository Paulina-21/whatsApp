import { Component, OnInit, QueryList, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import callsData from "../../../assets/data/calls.json"
import { AnimationController, IonItemSliding } from '@ionic/angular';
import { trigger, transition, style, animate, query } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [
        style({ opacity: 0, height: 0, top: '-40px' }),
        animate('250ms ease-out',
        style({ opacity: 1, height: '58px', top: 0 }))],
      { optional: true }
    ),
    query(':leave',
      [
        style({ opacity: 1 }),
        animate('250ms ease-out',
        style({ opacity: 0, height: 0, top: '-58px' }))],
      { optional: true }
    )
  ])
]);

@Component({
  selector: 'app-calls',
  templateUrl: './calls.page.html',
  styleUrls: ['./calls.page.scss'],
  animations: [listAnimation]
})
export class CallsPage implements OnInit {
  allCalls = callsData.sort((a,b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  calls = this.allCalls;
  segmentFilter = "all";
  @ViewChildren(IonItemSliding) items: QueryList<IonItemSliding>;

  edit = false;
  searching = false;

  @ViewChild('headerwrapper', { read: ElementRef }) headerWrapper: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('condenseheader', { read: ElementRef }) condenseheader: ElementRef;

  constructor(private animationCtrl: AnimationController) { }

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

  swipeDelete(item) {
    this.removeCall(item);
  }

  filterCalls(event) {
    this.calls = this.allCalls
    .filter(call => call.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase()));
  }

  async toggleSearch(){
    this.animateSearch();
    
    setTimeout(() => {
      this.searching = !this.searching;
    }, 100);
  }

  animateSearch(){
    const titleToolbar = this.condenseheader.nativeElement;

    //Fade out the status bar area
    // const toolbarFade = this.animationCtrl.create('fade')
    //   .addElement(this.headerWrapper.nativeElement)
    //   .fromTo('opacity', 1, 0)
    //   .fromTo('height', '90px', '36px')
    //   .afterStyles({'z-index': -1});

    // Fade out the condensed header
    const titleFade = this.animationCtrl.create('header')
      .addElement(titleToolbar)
      .fromTo('opacity', 1, 0)
      .fromTo('height', '48px', '0px')
      .afterStyles({'z-index': -1});

      // Fade in/put the background overlay
    const overlayFade = this.animationCtrl.create('overlay')
      .addElement(this.overlay.nativeElement)
      .fromTo('opacity', 0, 1)
      .duration(200);
    
    // Chain all animations
    const wrapper = this.animationCtrl.create('wrapper')
      .addAnimation([titleFade])
      .easing('ease-in')
      .duration(200);
  
    if (this.searching) {
      wrapper.direction('reverse').play();
      overlayFade.direction('reverse')
      .afterStyles({'z-index': 0})
      .play();
    } else {
      wrapper.play();
      overlayFade
      .beforeStyles({'z-index': 2})
      .play();
    }
  }

}
