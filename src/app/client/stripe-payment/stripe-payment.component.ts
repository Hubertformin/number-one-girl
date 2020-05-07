import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectorRef,
  Input,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter
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
  @ViewChild('pay-button', {static: false}) payButton: ElementRef;
  @Output() onTransactionStarted = new EventEmitter<any>();
  @Output() onTransactionComplete = new EventEmitter<any>();
  

  stripe;
  card;
  cardErrors;
  clientSecret;
  transactionFinished: boolean;
  error: any;
  paymentId: any;
  disableButton: boolean = false;

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
    //Then create payment method here and pass to client secret

    this.card.addEventListener('change', ({error}) =>{
      this.cardErrors = error && error.message;
    });
  }

  async onSubmit(event){
    event.preventDefault();
    this.onTransactionStarted.emit();
    this.disableButton = true;
    //Disable pay button

     this.stripe.createPaymentMethod({type: 'card', card: this.card}).then((result) => {
       if (result.error){
          console.log(result.error);
          this.outputError(result)

       } else {
          this.paymentId = result.paymentMethod.id;
          //call the pay function then

          this.stripeBackend.pay({ item: this.item, currency: 'xaf', paymentMethodId: this.paymentId}).then((response) => {
            if(response.error){
              //show error if it is an error
              console.log(response.error)
              this.outputError(response);

            } else if (response.requiresAction){
              //and handle actions if it needs to do so
              this.handleAction(response.clientSecret);
            } else {
              //output result and trigger event
              this.orderComplete(response.clientSecret);
              console.log(result);
            }
          });
       }
     });

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

  handleAction(clientSecret) {
    this.stripe.handleCardAction(clientSecret).then((data) => {
      if (data.error){
        console.log(data.error);
        this.outputError(data)
      } else if ( data.paymentIntent.status === 'requires_confirmation'){
        //send to pay cloud function and console.log result
        this.stripeBackend.pay({paymentIntentId: data.paymentIntent.id}).then((result) => {
          if(result.error){
            console.log(result.error);
            this.outputError(result);
          } else {
            this.orderComplete(clientSecret);
            console.log(result);
            //trigger output event
          }
        });
      }
    });
  }

  orderComplete(clientSecret) {
    this.stripe.retrievePaymentIntent(clientSecret).then((result) => {
      this.onTransactionComplete.emit({error: false, data: result});
    });
    // this.disableButton = false;
  }

  outputError(data) {
    this.onTransactionComplete.emit({
      error: true,
      data: data.error
    });
    //this.disableButton = false;
  }

}
