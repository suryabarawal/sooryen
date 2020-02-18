import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  addNotesForm: FormGroup;
  userInfo: any;
  notesData: any[] = [];
  errorMsg = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createNotesForm();
  }

  ngOnInit() {
    this.getLoggedInUser();
  }

  // create form
  createNotesForm() {
    return this.addNotesForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

// Get Logged In Use Info
  getLoggedInUser() {
    this.userService.getLoggedInUser().subscribe(
      res => {
        this.userInfo = res;
      }
    );
  }

// Create Note
  addNotes() {
    if(this.addNotesForm.valid) {
      this.errorMsg = false;
      const data = this.addNotesForm.getRawValue();
      data['userName'] = this.userInfo.userName;
      this.notesData.push(data);
      this.createNotesForm();
    } else {
      this.errorMsg = true;
    }
  }

// delete Note
  removeNotes(i) {
    if(this.notesData.length) {
      this.notesData.splice(i, 1)
    }
  }

  // logout
  logout() {
    this.router.navigate(['/']);
  }

}
