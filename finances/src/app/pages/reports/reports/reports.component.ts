import { CategoryService } from './../../categories/shared/category.service';
import { EntryService } from './../../entries/shared/entry.service';
import { Entry } from './../../entries/shared/entry.model';
import { Category } from './../../categories/shared/category.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      y: [
        { ticks: { beginAtZero: true } }
      ]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month', null) month: ElementRef = null;
  @ViewChild('year', null) year: ElementRef = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  generateReport() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if (!month || !year) {
      alert('Select month and year to generate reports');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this));
    }
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(element => {
      if (element.type === 'revenue') {
        revenueTotal += currencyFormatter.unformat(element.amount, { code: 'BRL' });
      } else {
        expenseTotal += currencyFormatter.unformat(element.amount, { code: 'BRL' });
      }
    });

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL' });
  }

  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Graph Revenue', '#9CCC65');

    this.expenseChartData = this.getChartData('expense', 'Graph Expense', '#e03131');
  }


  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    this.categories.forEach(category => {
      // filtering entries by categories and type
      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId === category.id) && (entry.type === entryType)
      );

      // if found entries, them sun entries amount and add to chartdata
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }), 0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount,
        });
      }
    });
    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }

}
