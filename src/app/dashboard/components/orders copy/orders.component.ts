import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversalService } from 'src/app/services/universal.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  active = 1;
  public MenuSelected: any;
  public itemDetailView: boolean = false;
  public itemDetail: any;
  public theBoundCallback: Function;
  public MyOrderView: boolean = true;
  public modalView: boolean = false;
  public Waitertables: any = [
    { no: '00012', name: 'Jennifer', amount: 100, items: 2, tables: 'T4', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00012', name: 'Jennifer', amount: 100, items: 2, tables: 'T4', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00012', name: 'Jennifer', amount: 100, items: 2, tables: 'T4', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00012', name: 'Jennifer', amount: 100, items: 2, tables: 'T4', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00016', name: 'Jennifer', amount: 100, items: 2, tables: 'T4', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00013', name: 'Jennifer', amount: 14, items: 2, tables: 'T6', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00016', name: 'Jennifer', amount: 100, items: 2, tables: 'T4', status: 'In process', waiter: 'Lawrence', payment: 'Card', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00019', name: 'Jennifer', amount: 12, items: 2, tables: 'T1', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00011', name: 'Jennifer', amount: 200, items: 2, tables: 'T5', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 12, items: 2, tables: 'T1', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00011', name: 'Jennifer', amount: 200, items: 2, tables: 'T5', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 12, items: 2, tables: 'T1', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00011', name: 'Jennifer', amount: 200, items: 2, tables: 'T5', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 12, items: 2, tables: 'T1', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '00011', name: 'Jennifer', amount: 200, items: 2, tables: 'T5', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
    { no: '0020', name: 'Jennifer', amount: 34, items: 2, tables: 'T7', status: 'Complete', waiter: 'Lawrence', payment: 'Cash', action: { process: 'process', edit: 'edit', cancel: 'cancel' } },
  ];
  public Menus: any = [

    {
      img: 'assets/menu items/baconring.webp',
      item: 'Bacon Rings',
      description: 'Wrap 2 slices of bacon through the middle of each onion ring and fully around to cover, leaving the center of the ring open',
      price: 50,
    },
    {
      img: 'assets/menu items/soup.webp',
      item: 'Chicken Soup',
      description: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water.',
      price: 80,
    },
    {
      img: 'assets/menu items/salad.webp',
      item: 'Mixed Salad',
      description: 'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient.',
      price: 150,
    },
    {
      img: 'assets/menu items/wonton.webp',
      item: 'Chicken Wonton',
      description: 'Wonton are Chinese dumpling filled with meat, typically served in a flavorful clear broth or dressed in sauce.',
      price: 250,
    },
    {
      img: 'assets/menu items/springroll.webp',
      item: 'Spring Rolls',
      description: 'A spring roll is a Chinese food consisting of a small roll of thin pastry filled with vegetables and sometimes meat, and then fried.',
      price: 550,
    },
    {
      img: 'assets/menu items/baconring.webp',
      item: 'Bacon Rings',
      description: 'Wrap 2 slices of bacon through the middle of each onion ring and fully around to cover, leaving the center of the ring open',
      price: 50,
    },
    {
      img: 'assets/menu items/soup.webp',
      item: 'Chicken Soup',
      description: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water.',
      price: 80,
    },
    {
      img: 'assets/menu items/salad.webp',
      item: 'Mixed Salad',
      description: 'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient.',
      price: 150,
    },
    {
      img: 'assets/menu items/wonton.webp',
      item: 'Chicken Wonton',
      description: 'Wonton are Chinese dumpling filled with meat, typically served in a flavorful clear broth or dressed in sauce.',
      price: 250,
    },
    {
      img: 'assets/menu items/springroll.webp',
      item: 'Spring Rolls',
      description: 'A spring roll is a Chinese food consisting of a small roll of thin pastry filled with vegetables and sometimes meat, and then fried.',
      price: 550,
    },
    {
      img: 'assets/menu items/baconring.webp',
      item: 'Bacon Rings',
      description: 'Wrap 2 slices of bacon through the middle of each onion ring and fully around to cover, leaving the center of the ring open',
      price: 50,
    },
    {
      img: 'assets/menu items/soup.webp',
      item: 'Chicken Soup',
      description: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water.',
      price: 80,
    },
    {
      img: 'assets/menu items/salad.webp',
      item: 'Mixed Salad',
      description: 'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient.',
      price: 150,
    },
    {
      img: 'assets/menu items/wonton.webp',
      item: 'Chicken Wonton',
      description: 'Wonton are Chinese dumpling filled with meat, typically served in a flavorful clear broth or dressed in sauce.',
      price: 250,
    },
    {
      img: 'assets/menu items/springroll.webp',
      item: 'Spring Rolls',
      description: 'A spring roll is a Chinese food consisting of a small roll of thin pastry filled with vegetables and sometimes meat, and then fried.',
      price: 550,
    },
    {
      img: 'assets/menu items/baconring.webp',
      item: 'Bacon Rings',
      description: 'Wrap 2 slices of bacon through the middle of each onion ring and fully around to cover, leaving the center of the ring open',
      price: 50,
    },
    {
      img: 'assets/menu items/soup.webp',
      item: 'Chicken Soup',
      description: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water.',
      price: 80,
    },
    {
      img: 'assets/menu items/salad.webp',
      item: 'Mixed Salad',
      description: 'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient.',
      price: 150,
    },
    {
      img: 'assets/menu items/wonton.webp',
      item: 'Chicken Wonton',
      description: 'Wonton are Chinese dumpling filled with meat, typically served in a flavorful clear broth or dressed in sauce.',
      price: 250,
    },
    {
      img: 'assets/menu items/springroll.webp',
      item: 'Spring Rolls',
      description: 'A spring roll is a Chinese food consisting of a small roll of thin pastry filled with vegetables and sometimes meat, and then fried.',
      price: 550,
    },
    {
      img: 'assets/menu items/baconring.webp',
      item: 'Bacon Rings',
      description: 'Wrap 2 slices of bacon through the middle of each onion ring and fully around to cover, leaving the center of the ring open',
      price: 50,
    },
    {
      img: 'assets/menu items/soup.webp',
      item: 'Chicken Soup',
      description: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water.',
      price: 80,
    },
    {
      img: 'assets/menu items/salad.webp',
      item: 'Mixed Salad',
      description: 'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient.',
      price: 150,
    },
    {
      img: 'assets/menu items/wonton.webp',
      item: 'Chicken Wonton',
      description: 'Wonton are Chinese dumpling filled with meat, typically served in a flavorful clear broth or dressed in sauce.',
      price: 250,
    },
    {
      img: 'assets/menu items/springroll.webp',
      item: 'Spring Rolls',
      description: 'A spring roll is a Chinese food consisting of a small roll of thin pastry filled with vegetables and sometimes meat, and then fried.',
      price: 550,
    },
    {
      img: 'assets/menu items/ApplePie.webp',
      item: 'Apple Pie',
      description: 'It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips). The bottom crust may be baked separately ("blind") to prevent it from getting soggy. Deep-dish apple pie often has a top crust only.',
      price: 50,
    },
    {
      img: 'assets/menu items/Brownies.webp',
      item: 'Brownies',
      description: 'A chocolate brownie or simply a brownie is a chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.',
      price: 80,
    },
    {
      img: 'assets/menu items/cheesecake.webp',
      item: 'Cheese Cake',
      description: 'cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items.',
      price: 150,
    },
    {
      img: 'assets/menu items/redvelvetcake.webp',
      item: 'Red Velvet Cake',
      description: 'Red velvet cake tastes like very mild cocoa with a slightly tart edge. The cream cheese frosting is the most forward flavor. Perhaps even more important than the taste is the texture: smooth, soft, tender and light with creamy icing.',
      price: 250,
    },
    {
      img: 'assets/menu items/ApplePie.webp',
      item: 'Apple Pie',
      description: 'It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips). The bottom crust may be baked separately ("blind") to prevent it from getting soggy. Deep-dish apple pie often has a top crust only.',
      price: 50,
    },
    {
      img: 'assets/menu items/Brownies.webp',
      item: 'Brownies',
      description: 'A chocolate brownie or simply a brownie is a chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.',
      price: 80,
    },
    {
      img: 'assets/menu items/cheesecake.webp',
      item: 'Cheese Cake',
      description: 'cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items.',
      price: 150,
    },
    {
      img: 'assets/menu items/redvelvetcake.webp',
      item: 'Red Velvet Cake',
      description: 'Red velvet cake tastes like very mild cocoa with a slightly tart edge. The cream cheese frosting is the most forward flavor. Perhaps even more important than the taste is the texture: smooth, soft, tender and light with creamy icing.',
      price: 250,
    },
    {
      img: 'assets/menu items/ApplePie.webp',
      item: 'Apple Pie',
      description: 'It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips). The bottom crust may be baked separately ("blind") to prevent it from getting soggy. Deep-dish apple pie often has a top crust only.',
      price: 50,
    },
    {
      img: 'assets/menu items/Brownies.webp',
      item: 'Brownies',
      description: 'A chocolate brownie or simply a brownie is a chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.',
      price: 80,
    },
    {
      img: 'assets/menu items/cheesecake.webp',
      item: 'Cheese Cake',
      description: 'cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items.',
      price: 150,
    },
    {
      img: 'assets/menu items/redvelvetcake.webp',
      item: 'Red Velvet Cake',
      description: 'Red velvet cake tastes like very mild cocoa with a slightly tart edge. The cream cheese frosting is the most forward flavor. Perhaps even more important than the taste is the texture: smooth, soft, tender and light with creamy icing.',
      price: 250,
    },
    {
      img: 'assets/menu items/ApplePie.webp',
      item: 'Apple Pie',
      description: 'It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips). The bottom crust may be baked separately ("blind") to prevent it from getting soggy. Deep-dish apple pie often has a top crust only.',
      price: 50,
    },
    {
      img: 'assets/menu items/Brownies.webp',
      item: 'Brownies',
      description: 'A chocolate brownie or simply a brownie is a chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.',
      price: 80,
    },
    {
      img: 'assets/menu items/cheesecake.webp',
      item: 'Cheese Cake',
      description: 'cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items.',
      price: 150,
    },
    {
      img: 'assets/menu items/redvelvetcake.webp',
      item: 'Red Velvet Cake',
      description: 'Red velvet cake tastes like very mild cocoa with a slightly tart edge. The cream cheese frosting is the most forward flavor. Perhaps even more important than the taste is the texture: smooth, soft, tender and light with creamy icing.',
      price: 250,
    },
    {
      img: 'assets/menu items/ApplePie.webp',
      item: 'Apple Pie',
      description: 'It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips). The bottom crust may be baked separately ("blind") to prevent it from getting soggy. Deep-dish apple pie often has a top crust only.',
      price: 50,
    },
    {
      img: 'assets/menu items/Brownies.webp',
      item: 'Brownies',
      description: 'A chocolate brownie or simply a brownie is a chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.',
      price: 80,
    },
    {
      img: 'assets/menu items/cheesecake.webp',
      item: 'Cheese Cake',
      description: 'cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items.',
      price: 150,
    },
    {
      img: 'assets/menu items/redvelvetcake.webp',
      item: 'Red Velvet Cake',
      description: 'Red velvet cake tastes like very mild cocoa with a slightly tart edge. The cream cheese frosting is the most forward flavor. Perhaps even more important than the taste is the texture: smooth, soft, tender and light with creamy icing.',
      price: 250,
    },
    {
      img: 'assets/menu items/ApplePie.webp',
      item: 'Apple Pie',
      description: 'It is generally double-crusted, with pastry both above and below the filling; the upper crust may be solid or latticed (woven of crosswise strips). The bottom crust may be baked separately ("blind") to prevent it from getting soggy. Deep-dish apple pie often has a top crust only.',
      price: 50,
    },
    {
      img: 'assets/menu items/Brownies.webp',
      item: 'Brownies',
      description: 'A chocolate brownie or simply a brownie is a chocolate baked confection. Brownies come in a variety of forms and may be either fudgy or cakey, depending on their density. Brownies often, but not always, have a glossy "skin" on their upper crust.',
      price: 80,
    },
    {
      img: 'assets/menu items/cheesecake.webp',
      item: 'Cheese Cake',
      description: 'cheesecake, a dessert consisting of a thick, creamy filling of cheese, eggs, and sugar over a thinner crust and topped with sweet or sometimes salty items.',
      price: 150,
    },
    {
      img: 'assets/menu items/redvelvetcake.webp',
      item: 'Red Velvet Cake',
      description: 'Red velvet cake tastes like very mild cocoa with a slightly tart edge. The cream cheese frosting is the most forward flavor. Perhaps even more important than the taste is the texture: smooth, soft, tender and light with creamy icing.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },
    {
      img: 'assets/menu items/burger.webp',
      item: 'Burger',
      description: 'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
      price: 50,
    },
    {
      img: 'assets/menu items/pizza.webp',
      item: 'Pizza',
      description: 'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
      price: 80,
    },
    {
      img: 'assets/menu items/clubsandwich.webp',
      item: 'Club Sandwich',
      description: 'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
      price: 150,
    },
    {
      img: 'assets/menu items/lasagne.webp',
      item: 'Lasagne',
      description: 'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
      price: 250,
    },

    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },
    {
      img: 'assets/menu items/BBQChickenWings..webp',
      item: 'Bbq Chicken Wings',
      description: 'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
      price: 50,
    },
    {
      img: 'assets/menu items/bbq.webp',
      item: 'Chicken Tikka',
      description: 'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
      price: 80,
    },
    {
      img: 'assets/menu items/kebab.webp',
      item: 'Beef Kebab',
      description: 'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
      price: 150,
    },

    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
    {
      img: 'assets/menu items/Lemonade.webp',
      item: 'Lemonade',
      description: 'Lemonade is a sweetened beverage made from lemons, sugar, and water.',
      price: 50,
    },
    {
      img: 'assets/menu items/Icedtea.webp',
      item: 'Iced Tea',
      description: 'Iced tea (or ice tea) is a form of cold tea. Though it is usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar or syrup.',
      price: 80,
    },
    {
      img: 'assets/menu items/Hotchocolate..webp',
      item: 'Hot Chocolate',
      description: 'Hot chocolate, also known as hot cocoa or drinking chocolate, is a heated drink consisting of shaved chocolate, melted chocolate or cocoa powder, heated milk or water, and usually a sweetener like whipped cream or marshmallows.',
      price: 150,
    },
    {
      img: 'assets/menu items/Coffee.webp',
      item: 'Coffee',
      description: 'Coffee is a beverage brewed from the roasted and ground seeds of the tropical evergreen coffee plant. Coffee is one of the three most popular beverages in the world (alongside water and tea), and it is one of the most profitable international commodities.',
      price: 250,
    },
  ];
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef, private router: Router) { }
  async observePath(path: string) {
    // if (path) {
    //   this.router.navigate([`master/${path}`]);
    // }
    // UniversalService.routePath.subscribe((res: string) => {
    //   let path = res.toLowerCase();
    //   this.router.navigate([`master/${path}`]);
    //   this.cd.detectChanges();
    // });
  }

  modalReference: any;
  ngOnInit(): void {
    // this.observePath('orderstatus');
    if (localStorage.getItem('orderview') == 'false') {
      this.MyOrderView = false
    }
    else {
      this.MyOrderView = true
    }

    UniversalService.modules.next(true)
    // this.observe();
  }
  open(content: any, modal: string) {
    this.modalReference = this.modalService.open(content, { centered: true, backdrop: 'static', windowClass: 'checkoutModal' });
  }
  proceed() {
    this.modalReference.close();
  }
  async observe() {
    // UniversalService.routePath.subscribe((res: string) => {
    //   let path = res.toLowerCase();
    //   this.router.navigate([`master/${path}`]);
    //   // debugger
    //   this.cd.detectChanges();
    // }), (err: any) => console.log(err);
    // ;
    UniversalService.itemDetailView.subscribe((res) => {
      if (res) {
        this.itemDetailView = true;
      } else {
        this.itemDetailView = false;
      }
      this.cd.detectChanges();
    });
    UniversalService.itemDetail.subscribe(res => {
      if (res) {
        this.itemDetail = res
      }
      else {
        this.itemDetail = res
      }
      this.cd.detectChanges();
    })
    UniversalService.Orders.subscribe(res => {
      if (res) {
        this.MyOrderView = res
      }
      else {
        this.MyOrderView = res
      }
      this.cd.detectChanges();
    })
    UniversalService.TableModal.subscribe(res => {
      if (res) {
        this.modalView = true
        setTimeout(() => {
          $("#qrCode").trigger('click')
        }, 500);
      }
      else {
        this.proceed()
        this.modalView = false
      }
      this.cd.detectChanges();
    })
  }
  scan() {
    this.proceed()
    localStorage.setItem('orderview', 'false')
    UniversalService.SideBar.next(true)
    UniversalService.Orders.next(false)
    UniversalService.TableModal.next(false)
  }
  counter(state: string, event: any, id: number) {
    let value: any = $(event?.target?.parentNode?.parentNode).find('.value')[0].innerHTML
    if (state == 'plus') {
      value++
    }
    if (state == 'minus' && value > 0) {
      value--
    }
    $(event?.target?.parentNode?.parentNode).find('.value')[0].innerHTML = value
  }
}
