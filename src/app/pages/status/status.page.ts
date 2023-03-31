import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StoryPage } from '../story/story.page';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openStory() {
    const modal = await this.modalCtrl.create({
      component: StoryPage
    });

    await modal.present();
  }

}
