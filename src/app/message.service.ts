import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  //Add a string to the list of messages
  add(message: string) {
    this.messages.push(message);
  }
  //Remove all messages
  clear() {
    this.messages.length = 0;
  }
}
