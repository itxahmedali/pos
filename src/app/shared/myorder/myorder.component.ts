import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversalService } from './../../services/universal.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FilterPipe } from 'src/app/pipes/filter.pipe'
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss'],
})
export class MyorderComponent implements OnInit {
  @Input() tables: any;
  @Input() opt: any;
  @Output() id = new EventEmitter<any>();
  modalReference: any;
  selectedTable: any;
  duePage: any;
  total: any;
  selectedCategory: any;
  selectedCategoryName: any;
  public searchInput:any;
  public CartItems:any =[{img: 'assets/menu items/soup.webp', item: 'Chicken Soup', description: 'Soup is a primarily liquid food, generally served …of meat or vegetables with stock, milk, or water.', price: 80}]
  public EmployeeDetail:any;
  @Output() employeeDetailEmitter = new EventEmitter<any>();
  constructor(private modalService: NgbModal, private router: Router, private cd: ChangeDetectorRef) { }
  public image:any
  views = [
    { id: 1, name: 'Grid View' },
    { id: 2, name: 'List View' },
  ];
  selectedView: any = this.views[0].name;
  sorts = [
    { id: 1, name: 'Sort By Name' },
    { id: 2, name: 'Sort By Date' },
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
  selectedSort: any = this.sorts[0].name;
  ngOnChanges(){
    console.log('====================================');
    console.log(this.tables);
    console.log('====================================');
  }
  ngOnInit(): void {
    // UniversalService.headerHeading.next(localStorage.getItem('heading'))
    this.observe()
  }
  addTable() {
    UniversalService.TableModal.next(true);
  }
  addMenu(){
    UniversalService.headerHeading.next('Add Item')
  }
  addMenuMaster(){
    UniversalService.headerHeading.next('Add Item')
  }
  addMenuMasterCategory(data:any){
    if(data.condition == 'add'){
      this.id.emit({id:data.id,state:'add'});
    }
    else if(data.condition == 'edit'){
      this.id.emit({id:data.id,state:'edit'});
    }
    else{
      this.id.emit({id:data.id,state:'delete'});
    }
  }
  editStaff(item:any){
    UniversalService.editModal.next(item)
  }
  change(event:any,id:any){
    if(event.target.checked == true){
      this.id.emit({id:id,state:'change',value:1})
    }
    else{
      this.id.emit({id:id,state:'change',value:0})
    }
  }
  back() {
    UniversalService.cartShow.next(false);
    UniversalService.Orders.next(false);
  }
  open(content: any, modal: any) {
    this.selectedTable = modal
    if(modal == 'newOrder' || modal == 'cancelconfirmation'){
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
        size: 'md'
      });
    }
    else{
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
        size: 'xl'
      });
    }
  }
  proceed() {
    this.modalReference.close();
    UniversalService.cartShow.next(false);
  }
  staffDetailView(data:boolean){
    UniversalService.StaffDetailView.next(data)
  }
  async observe() {
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
  orderView(event:any){
    UniversalService.OrderDetailView.next(true);
    UniversalService.cartPreviousState.next(false);
  }
}
