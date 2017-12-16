import { Component, OnInit } from '@angular/core';
 
import { User } from '../users';
import { UserService } from '../user.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
 
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(this.currentUser);
    }
 
    ngOnInit() {
    }
 
}
