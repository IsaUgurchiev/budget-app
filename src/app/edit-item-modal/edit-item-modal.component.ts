import { Component, OnInit } from '@angular/core';
import {BudgetItem} from '../../shared/models/budget-item.model';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitted(item: BudgetItem) {

  }

}
