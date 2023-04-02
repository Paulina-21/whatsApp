import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  } from "@angular/core";

  import {
    Platform,
    ModalController,
    GestureController,
    IonContent,
    IonTextarea,
   } from "@ionic/angular";

import { Keyboard, KeyboardResize } from "@capacitor/keyboard";

import storyData from "../../../assets/data/story.json";


@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit, AfterViewInit {

  @ViewChild('msginput') msginput: IonTextarea;

  info = storyData as {
    stories: [{ date: string; text: string; img: string }];
    from: string;
    image: string;
    };

  activeStory = null;
  progress = [];
  timer = 0;
  runningTimer = null;
  pauseTimer = false;
  replyVisible = false;
  hideBar = false;

  constructor(
    private plt: Platform,
    private modalCtrl: ModalController,
    private gestureCtrl: GestureController
  ) { }

  ngOnInit() {
    this.activeStory = 0;
    this.progress = this.info.stories.map(() => 0); // why?!
    this.startTimer();
  }

  ngAfterViewInit(): void {
    
  }  

  startTimer() {
    this.timer = 0;
    // Reset any running timer
    clearTimeout(this.runningTimer);
    // Start the timer
    this.runTimer();
  }

  runTimer() {
    this.runningTimer = setTimeout(() => {
      if (this.pauseTimer) {
        this.runTimer();
        return;
      }

      this.timer += 10;
      this.progress[this.activeStory] = this.timer / 50;
      if (this.timer === 5000) {
        this.nextStory();
      } else {
        this.runTimer();
      }
    }, 10); // Run after 10ms
  }

  nextStory() {
    this.progress[this.activeStory] = 100;

    if (this.activeStory + 1 < this.info.stories.length) {
      this.activeStory += 1;
      this.startTimer();
    } else {
      this.close();
    }
  }

  previousStory() {
    this.progress[this.activeStory] = 0;
    if (this.activeStory > 0) {
      this.activeStory -= 1;
      this.startTimer();
    }
  }

  close() {
    this.modalCtrl.dismiss().then(() => {});
  }

  getImage() {    
    let url = `url(${this.info.stories[this.activeStory].img}) no-repeat center center`;
    return url;
  }

  tapBg(ev) {
    if (this.replyVisible) {
      this.replyVisible = false;
      return;
    }

    // X value of the tap event in left or right half of the screen
    if (ev.clientX > this.plt.width() / 2) {
      this.nextStory();
    } else {
      this.previousStory();
    }
  }

  reply() {
    this.replyVisible = true;
    this.msginput.setFocus();
  }
}
