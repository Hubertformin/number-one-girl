import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private stripe;

  constructor(private functions: AngularFireFunctions) {
    this.stripe = Stripe(environment.stripePublishableKey);
  }

  async getPaymentIntent(item: string): Promise<string> {
    const client_secret = localStorage.getItem('stripe-payment-intent')

    if(client_secret == null){
      // create new payment intent from server for particular item
      const createFunction = this.functions.httpsCallable('createPaymentIntent');
      return createFunction({item: item}).toPromise();
    } else {
      // retrieve payment intent from server and update it with requested item
      let intent_id = this.stripe.paymentIntents.retrieve(client_secret).id;

      const updateFunction = this.functions.httpsCallable('updatePaymentIntent');
      return updateFunction({item: item, id: intent_id}).toPromise();
    }
  }

  async pay(data): Promise<any>{
    //we will call our pay cloud function here
    const createFunction = this.functions.httpsCallable('pay');
      return createFunction({data: data}).toPromise();
  }
}
