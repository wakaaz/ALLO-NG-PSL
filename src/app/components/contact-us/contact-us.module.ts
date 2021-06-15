import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ContactUsRoutingModule } from "./contact-us-routing.module";

import { ContactUsComponent } from './contact-us.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ContactUsRoutingModule
    ],
    declarations: [
        ContactUsComponent
    ],
})
export class ContactUs {}