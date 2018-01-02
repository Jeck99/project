import { Component, OnInit, Output } from '@angular/core';
import { appService } from './appService.service';
import { IModel } from './appModel';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(pipeData:string[], pipeModifier:string): string[] {
        return pipeData.filter((eachItem) => {
          return eachItem['name'].toLowerCase().includes(pipeModifier.toLowerCase());
        });
}}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [appService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: appService) { }
  arUsers: IModel[];
  idDELETE:number;
  userToDelete:string="";
  filterUsers:IModel[];
  ngOnInit() {
    this.service.Get()
      .subscribe(users => {
        this.arUsers = users;
        console.log(this.arUsers);
      },
      (err: Response) => {
        console.log("error : " + err);
      });
  }
  deleteUserModal(i:number){
    this.userToDelete= this.arUsers[i].name;
    this.idDELETE=i;
    }
  deleteUser() {
    this.arUsers.splice(this.arUsers.indexOf(this.arUsers[this.idDELETE]), 1)
  }
  sortByName() {
    this.arUsers.sort(function (name1, name2) {
      if (name1.name < name2.name) {
        return -1;
      } else if (name1.name > name2.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sortByAge() {
    this.arUsers.sort(function (age1, age2) {
      if (age1.age < age2.age) {
        return -1;
      } else if (age1.age > age2.age) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
