import { MatSnackBarComponent } from './../shared/mat-snack-bar/mat-snack-bar.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BookService, Message } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  animations: [
    trigger('title', [
      state('show', style({
        marginTop: 'calc(2rem + 2vh)',
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          marginTop: '0',
          opacity: 0
        }),
        animate('1.5s 0s ease')
      ]),      
    ]),
    trigger('appear', [
      state('show', style({
        opacity: 1
      })),
      transition('* => show', [
        style({ 
          opacity: 0
        }),
        animate('0.5s 0s ease')
      ]),      
    ]),
    trigger('appear2', [
      state('show', style({
        transform: 'scale(1)'
      })),
      transition('* => show', [
        style({ 
          transform: 'scale(0)'
        }),
        animate('1.5s {{time}}s ease')
      ], {params: {time: '0'}}),      
    ]),
  ]
})
export class BookComponent implements OnInit {
  // loaders
  isLoading = true
  isLoadingData = true
  isAddLoading = false

  isNewMessageOpen = false
  form = new FormGroup({})

  messages: Message[] = []

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private snackBar: MatSnackBarComponent
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.getMessages()
  }

  // FORM
  createForm() {
    this.form = this.fb.group({
      style: ['../../../assets/images/sheet0.png'],
      text: [null, Validators.required],
      sender: [null, Validators.required]
    })
  }

  switchNewMessageForm(isOpen: boolean) {
    this.isNewMessageOpen = isOpen
  }

  // DATA
  addMessage() {
    this.form.disable()
    this.isAddLoading = true

    this.bookService.addMessage(
      this.formText.value, 
      this.formSender.value,
      this.formStyleSrc.value
    ).then(res => {
      this.snackBar.openSuccess('Dodano prawidłowo!')
      this.createForm()
      this.isNewMessageOpen = false
      this.isAddLoading = false
      this.getMessages()
    }).catch(err => {
      this.snackBar.openError('Wystąpił błąd!')
      this.form.enable()
      this.isAddLoading = false
    })
  }

  getMessages() {
    this.isLoadingData = true
    this.messages = []
    this.bookService.getMessages().subscribe(messages => {
      this.messages = messages
      this.isLoadingData = false
    })
  }

  // UTIL
  setLoader(loading: boolean) {
    this.isLoading = loading
  }

  // GETTERS
  get selectedStyle(): string {
    return this.form.get('style')!!.value
  }

  private get formText(): AbstractControl {
    return this.form.get('text')!!
  }

  private get formSender(): AbstractControl {
    return this.form.get('sender')!!
  }

  private get formStyleSrc(): AbstractControl {
    return this.form.get('style')!!
  }
}
