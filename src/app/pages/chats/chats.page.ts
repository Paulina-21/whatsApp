import { Component, OnInit } from "@angular/core";
import chatData from "../../../assets/data/chats.json";

  @Component({
    selector: "app-chats",
    templateUrl: "./chats.page.html",
    styleUrls: ["./chats.page.scss"],
  })
export class ChatsPage implements OnInit {
  chats = chatData;

  constructor() {}

  ngOnInit() {}
  
  startChat() {
  // TODO
  }
}