import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
  Input,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { PaymentService } from 'src/app/providers/payment.service';


@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() item: string;
  @ViewChild('cardInfo', {static: false}) cardElement: ElementRef;

  stripe;
  card;
  cardErrors;
  clientSecret;
  loading = false;
  transactionFinished: boolean;
  error: any;

  constructor(private stripeBackend: PaymentService) { }

  async ngOnInit() {

    // this.clientSecret = await this.stripeBackend.getPaymentIntent(this.item);
    this.transactionFinished = false;

    this.stripe = Stripe(environment.stripePublishableKey);
  }

  ngAfterViewInit(): void {
    const elements = this.stripe.elements();
    console.log(this.cardElement);
    this.card = elements.create('card', {
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#fff',
          fontWeight: 500,
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#87BBFD',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    });
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({error}) =>{
      this.cardErrors = error && error.message;
    });
  }

  async onSubmit(event){
    event.preventDefault();

    // Use PaymentIntent created to pay for card
    // this.stripe.confirmCardPayment(this.clientSecret, {
    //   payment_method: {
    //     card: this.card,
    //   }
    // }).then((result) => {
    //   if(result.error){
    //     console.log(result.error.message);
    //     // Notify user of any errors that occured
    //   } else {
    //     if (result.paymentIntent.status === 'succeeded'){
    //       localStorage.removeItem('stripe-payment-intent'); // Remove the client-secret from local storage
    //       this.transactionFinished = true;
    //       // Show success message to usr
    //       // Also set up webhook to get the status update
    //     }
    //   }
    // })
  }

  ngOnDestroy(){
    if ( !this.transactionFinished ) {
      localStorage.setItem('stripe-payment-intent', this.clientSecret); //save the client-secret to localstorage
    } else {
      localStorage.removeItem('stripe-payment-intent');
    }
  }

}
