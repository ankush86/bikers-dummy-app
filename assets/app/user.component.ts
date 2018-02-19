import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'user-section',
    templateUrl: 'templates/user.component.html'
})

export class UserComponent implements OnInit {
  userForm: FormGroup;
  days_arr:any;
  users: any = [];
  show_error: string = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.days_arr = [
      { name: 'Sun',  selected: false },
      { name: 'Mon',  selected: false },
      { name: 'Tue',  selected: false },
      { name: 'Wed',  selected: false },
      { name: 'Thu',  selected: false },
      { name: 'Fri',  selected: false },
      { name: 'Sat',  selected: false },
    ];
  }

  ngOnInit(){
    this.userForm = this.fb.group({
      'full_name': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
      'city': [null],
      'ride_in_group': [null, Validators.required],
      'days': this.fb.array([], Validators.required)
    });

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(
      response => {
        if(response.status == 200) {
          this.users = response.data;
        } 
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  saveData(data: any) {
    this.show_error = null;
    this.userService.saveData(data)
    .subscribe(
      data => {
        if(data.status == 201) {
          this.getUsers();
          this.userForm.reset();
          this.userForm.setControl('days', new FormArray([]));
          this.days_arr.forEach((item: any) => {
            item.selected = false;
          })
        } else {
          this.show_error = data.error;
        }
      },
      error => {
        this.show_error = error;
        return Observable.throw(error);
      }
    );
  }

  deleteUser(user:any, index:number) {
    if(confirm("Are you sure want to delete user "+user.full_name+" ?")) {
      this.userService.deleteUser(user.id).subscribe(response =>{
        this.users.splice(index, 1);
      });
    }
  }

  onChange(name:string, isChecked: boolean) {
    const daysFormArray = <FormArray>this.userForm.controls.days;

    if(isChecked && name != null) {
      daysFormArray.push(new FormControl(name));
    } else {
      let index = daysFormArray.controls.findIndex(x => x.value == name)
      daysFormArray.removeAt(index);
    }
  }




}
