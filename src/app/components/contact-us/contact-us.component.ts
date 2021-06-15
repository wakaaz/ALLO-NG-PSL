import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GenericService } from "src/app/_services/generic-service";

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

    name: string;
    email: string;
    subject: string;
    message: string;
    emailPattern: RegExp;
    submitted: boolean;
    hasSuccess: boolean;
    hasError: boolean;

    constructor(
        private genericService: GenericService
    ) {
    }

    ngOnInit() {
        this.emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    }

    sendMessage(messageForm: NgForm): void {
        if (!this.email || !this.name || !this.message || !this.emailPattern.test(this.email) || this.submitted) {
            return;
        } else {
            this.submitted = true;
            this.genericService.sendMessage({email: this.email, name: this.name, message: this.message, subject: this.subject}).subscribe(res => {
                this.submitted = false;
                this.hasSuccess = true;
                this.hasError = false;
                messageForm.resetForm();
                this.resetValues();
            }, error => {
                this.hasSuccess = false;
                this.hasError = true;
                messageForm.resetForm();
                this.submitted = false;
                this.resetValues();
                console.log('Error :>> ', error);
            });
        }
    }

    resetValues(): void {
        setTimeout(() => {
            this.hasError = false;
            this.hasSuccess = false;
        }, 5000);
    }

}