import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private categoryService: CategoryService) {
  }

  popupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/([А-Я]{1}[а-яё]{1,23})/)]],
    phone: ['', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]],

  });

  isShowPopup: boolean = false;
  isPopupConsultation: boolean = false;
  isPopupSuccess: boolean = false;

  ngOnInit(): void {
  }

  showPopup() {
    this.isShowPopup = true;
    this.isPopupConsultation = true;
    this.popupForm.reset();
  }

  showPopupSuccess() {
    this.isShowPopup = true;
    this.isPopupConsultation = false;
    this.isPopupSuccess = true;
    this.requestConsultation();

  }
  hidePopup() {
    this.isShowPopup = false;
  }
  hideShowPopupSuccess() {
    this.router.navigate(['/']);
    this.isShowPopup = false;
    this.isPopupSuccess = false;
  }

  requestConsultation() {
    this.categoryService.requestConsultation(this.popupForm.value.name,
      this.popupForm.value.phone, 'recall', 'order')
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message);
            throw new Error(data.message);
          }

          // this.isPopupConsultation = false;
          // this.isPopupSuccess = true;
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          } else {
            this._snackBar.open('Ошибка оформления звонка');
          }
        }
      })
  }
}
