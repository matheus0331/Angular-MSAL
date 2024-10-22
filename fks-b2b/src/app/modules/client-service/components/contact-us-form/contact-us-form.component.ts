import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalMessageService, GlobalMessageType, LanguageService} from '@spartacus/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {ContactFormService} from '@core/services/contact-form/contact-form.service';
import {FrankeClientServiceScrollService} from '@core/services/franke-client-service-scroll/franke-client-service-scroll.service';
import {ICategory} from '@shared/models/ContactFormCategories';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {class: 'scroll-section-contact-form'},
})
export class ContactUsFormComponent implements OnInit {
  contactType$: Observable<string[]>;
  translations$: Observable<string[]>;
  files: any;

  options$ = new BehaviorSubject<ICategory[]>([]);

  formOptionsFromChat: Subscription;
  contactFormSubs: Subscription;
  productCategoriesControlSubs: Subscription;
  addTicketSubs: Subscription;
  lastSelectedCategory: string;

  contactForm: UntypedFormGroup = this.fb.group({
    request: ['', Validators.required],
    files: [''],
    fields: this.fb.group({}),
  });

  languageSub: Subscription;
  fieldsKeys = new BehaviorSubject<string[]>([]);

  constructor(
    protected fb: UntypedFormBuilder,
    private contactService: ContactFormService,
    private messageService: GlobalMessageService,
    private clientServiceScrollService: FrankeClientServiceScrollService,
    private languageService: LanguageService,
    protected router: Router
  ) {
  }

  get firstLevel(): string[] {
    return this.options$.value.map((options) => options.code);
  }

  getCategoryFromTree(id: string): ICategory | null {
    const recursiveFind = (
      code: string,
      categories: ICategory[]
    ): ICategory | null => {
      if (categories.length) {
        return categories.reduce((acc, curr) => {
          if (acc) {
            return acc;
          }
          if (curr.code === code) {
            return curr;
          } else {
            return recursiveFind(code, curr.options);
          }
        }, null);
      }
      return null;
    };
    const result = recursiveFind(id, this.options$.value);
    return result;
  }

  ngOnInit(): void {
    this.languageSub = this.languageService.getActive().subscribe(() => {
      const initialFormValue = '';
      this.resetContactForm();
      this.populateContactForm(initialFormValue);
    });
    this.formOptionsFromChat = this.clientServiceScrollService
      .getFormOptions()
      .subscribe((value) => {
        const fields = this.contactForm.get('fields') as UntypedFormGroup;
        if (!fields.get('00')) {
          return;
        }
        if (value === 'TT-INQ') {
          fields.get('00').setValue('TT-INQ');
          this.clientServiceScrollService.setFormOptions('');
        } else if (value === 'TT-CP') {
          fields.get('00').setValue('TT-CP');
          this.clientServiceScrollService.setFormOptions('');
        }
      });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
    }
  }

  deleteFiles(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
    this.files = '';
  }

  submit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.contactForm.markAllAsTouched();

    const formData = new FormData();
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files.item(i));
      }
    }

    const {request, files, orderNumber, funNumber} = this.contactForm.value;
    formData.append(
      'contactUsForm',
      new Blob(
        [
          JSON.stringify({
            request,
            files,
            ...(orderNumber && funNumber && {orderNumber, funNumber}),
            categoryCode: this.lastSelectedCategory,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    this.addTicketSubs = this.contactService.addTicket(formData).subscribe();
    this.messageService.add(
      {key: 'contactForm.ticketAddSucess'},
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.resetContactForm();
  }

  shouldShowField(field: string): any {
    return this.contactForm.get(field);
  }

  populateContactForm(initialFormValue: string): void {
    this.clientServiceScrollService
      .getFormOptions()
      .subscribe((value) => (initialFormValue = value));

    this.contactService.getCategories().subscribe((categories) => {
      this.options$.next(categories);
      categories.forEach((option) => {
        const fields = this.contactForm.get('fields') as UntypedFormGroup;
        fields.addControl(
          option.code,
          new UntypedFormControl('', Validators.required)
        );
        fields.get(option.code).valueChanges.subscribe((value: string) => {
          if (!value) {
            return;
          }

          this.fieldsKeys.value
            .filter((f) => f !== option.code)
            .forEach((f) => fields.removeControl(f));
          if (value === 'TT-CP') {
            this.contactForm.addControl(
              'orderNumber',
              this.fb.control('', Validators.required)
            );
            this.contactForm.addControl('funNumber', this.fb.control(''));
          } else {
            this.contactForm.removeControl('orderNumber');
            this.contactForm.removeControl('funNumber');
          }

          this.lastSelectedCategory = value;
          fields.addControl(value, new UntypedFormControl('', Validators.required));
          this.fieldsKeys.next(
            Object.keys((this.contactForm.get('fields') as UntypedFormGroup).controls)
          );
          fields.get(value).valueChanges.subscribe((value2: string) => {
            this.lastSelectedCategory = value2;
            this.fieldsKeys.value
              .filter((f) => f !== option.code && f !== value)
              .forEach((f) => fields.removeControl(f));
            if (!this.getCategoryFromTree(value2).options.length) {
              // cleanup
              this.fieldsKeys.next(
                Object.keys(
                  (this.contactForm.get('fields') as UntypedFormGroup).controls
                )
              );
              return;
            }
            fields.addControl(value2, new UntypedFormControl('', Validators.required));
            this.fieldsKeys.next(
              Object.keys(
                (this.contactForm.get('fields') as UntypedFormGroup).controls
              )
            );
            fields.get(value2).valueChanges.subscribe((value3) => {
              this.fieldsKeys.next(
                Object.keys(
                  (this.contactForm.get('fields') as UntypedFormGroup).controls
                )
              );
              this.lastSelectedCategory = value3;
            });
          });
        });
        fields.get('00').setValue(initialFormValue);
      });
      this.fieldsKeys.next(
        Object.keys((this.contactForm.get('fields') as UntypedFormGroup).controls)
      );
    });
  }

  resetContactForm(): void {
    const fields = this.contactForm.get('fields') as UntypedFormGroup;
    const keys = Object.keys(fields.controls);
    const firstLevelKeys = this.options$.value.map((option) => option.code);
    keys
      .filter((key) => !firstLevelKeys.includes(key))
      .forEach((key) => {
        fields.removeControl(key);
      });

    Object.values(this.contactForm.controls).forEach((control) => {
      control.reset();
    });

    this.contactForm.removeControl('orderNumber');
    this.contactForm.removeControl('funNumber');
    this.fieldsKeys.next(Object.keys(fields.controls));
  }
}
