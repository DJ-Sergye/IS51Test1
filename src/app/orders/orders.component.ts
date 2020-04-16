import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  name: string;
  errorMessage = '';
  confirmMessage = '';
  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {

  }

  async ngOnInit() {
    this.loadDefaultOrders();
  }

  calculate() {
    const total = this.orders.reduce((inc, item, i, arr) => {
      inc += item.price * item.quantity;
      return inc;
    }, 0);
    const taxAmount = total * .1;
    const subTotal = total - taxAmount;
    return {
      total: total,
      taxAmount: taxAmount,
      subTotal: subTotal
    }
  }

  submit() {
    const commaIndex = this.name.indexOf(', ');
    console.log('this.name', this.name, 'comma index', commaIndex);
    let error = false;


    if (this.name === '') {
      console.log('Name must not be empty');
      this.errorMessage = 'Name must not be empty';
      error = true;
      else if (commaIndex === -1) {
        this.errorMessage = 'Name must have comma';
        error = true;
      }
    }
    if (!error) {
      const firstName = this.name.slice(commaIndex + 1, this.name.length);
      const lastName = this.name.slice(0, commaIndex);
      const fullName = firstName + ' ' + lastName;
      const calculation = this.calculate();
      this.confirmMessage = `Thank you for your order ${fullName}. Your sub total is ${calculation.subTotal}. Your tax amount is ${calculation.taxAmount}. Your total is ${calculation.total}`;
      this.flexModal.openDialog('confirm-modal');
    } else {
      this.flexModal.openDialog('error-modal');
    }
  }

  loadDefaultOrders() {
    this.orders = [{
      'pid': '1',
      'image': 'assets/sm_android.jpeg',
      'description': 'Android',
      'price': 150.00,
      'quantity': 2
    }, {
      'pid': '2',
      'image': 'assets/sm_iphone.jpeg',
      'description': 'Iphone',
      'price': 200.00,
      'quantity': 1
    }, {
      'pid': '3',
      'image': 'assets/sm_windows.jpeg',
      'description': 'Windows phone',
      'price': 110.00,
      'quantity': 2
    }];
  }

  delete(index: number) {
    this.orders.splice(index, 1);
  }

  addItem(item: string) {
    switch (item) {
      case 'Android':
        this.orders.unshift({
          'pid': '1',
          'image': 'assets/sm_android.jpeg',
          'description': 'Android',
          'price': 150.00,
          'quantity': 0
        });
        break;
      case 'Iphone':
        this.orders.unshift({
          'pid': '2',
          'image': 'assets/sm_iphone.jpeg',
          'description': 'Iphone',
          'price': 200.00,
          'quantity': 0
        });
        break;
      case 'Windows Phone':
        this.orders.unshift({
          'pid': '3',
          'image': 'assets/sm_windows.jpeg',
          'description': 'Large Windows Phone',
          'price': 110.00,
          'quantity': 0
        });
        break;
    }
  }
