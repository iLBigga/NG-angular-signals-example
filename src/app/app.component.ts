import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-signals-example';

  theme = signal('light');

  label = this.theme();

  price = 19;

  quantity = signal(10);

  totalPrice = computed(() => this.price * this.quantity());

  products = signal([
    {id: 1, name: "Milk", price: 1.45},
    {id: 2, name: "Bread", price: 3.90},
    {id: 3, name: "Tomatoes", price: 2.20},
  ]);

  filterName = signal('');

  filteredProducts = computed(() => {
    return this.products().filter(
      product => product.name
      .toLowerCase()
      .includes(this.filterName().toLowerCase()))
  });

  changeFilter(event: Event){
    let newFilterName = (event.target as HTMLInputElement).value;
    this.filterName.set(newFilterName);
  }

  changeQuantity(event : Event){
    this.quantity.set((event.target as HTMLInputElement).valueAsNumber);
  }

  constructor(){
    effect(() => {

      this.label = this.theme();

    });
  }
  ngOnInit(){

    // this.theme.set(this.theme() === 'light'? 'dark' : 'light');

    // this.theme.update(currentValue => currentValue === 'light'? 'dark' : 'light');

    // document.body.className = this.theme();
  }

  toggleDarkMode() {
    this.theme.update(currentValue => currentValue === 'light'? 'dark' : 'light');

  }
}
