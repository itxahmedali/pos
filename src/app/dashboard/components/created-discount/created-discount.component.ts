import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-created-discount',
  templateUrl: './created-discount.component.html',
  styleUrls: ['./created-discount.component.scss']
})
export class CreatedDiscountComponent {
  public Menus: any = [
    {
      Fast_Food: [
        {
          img: 'assets/menu items/burger.webp',
          itemName: 'Burger',
          description:
            'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
          price: 50,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/pizza.webp',
          itemName: 'Pizza',
          description:
            'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
          price: 80,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/clubsandwich.webp',
          itemName: 'Club Sandwich',
          description:
            'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
          price: 150,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/lasagne.webp',
          itemName: 'Lasagne',
          description:
            'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
          price: 250,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/burger.webp',
          itemName: 'Burger',
          description:
            'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
          price: 50,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/pizza.webp',
          itemName: 'Pizza',
          description:
            'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
          price: 80,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/clubsandwich.webp',
          itemName: 'Club Sandwich',
          description:
            'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
          price: 150,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/lasagne.webp',
          itemName: 'Lasagne',
          description:
            'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
          price: 250,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/burger.webp',
          itemName: 'Burger',
          description:
            'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
          price: 50,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/pizza.webp',
          itemName: 'Pizza',
          description:
            'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
          price: 80,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/clubsandwich.webp',
          itemName: 'Club Sandwich',
          description:
            'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
          price: 150,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/lasagne.webp',
          itemName: 'Lasagne',
          description:
            'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
          price: 250,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/burger.webp',
          itemName: 'Burger',
          description:
            'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
          price: 50,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/pizza.webp',
          itemName: 'Pizza',
          description:
            'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
          price: 80,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/clubsandwich.webp',
          itemName: 'Club Sandwich',
          description:
            'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
          price: 150,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/lasagne.webp',
          itemName: 'Lasagne',
          description:
            'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
          price: 250,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/burger.webp',
          itemName: 'Burger',
          description:
            'A burger is a flat round mass of minced meat or vegetables, which is fried and often eaten in a bread roll. ...',
          price: 50,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/pizza.webp',
          itemName: 'Pizza',
          description:
            'A delicious pizza has an intensely cheesy flavor. The combination of tomato sauce and cheese creates a perfect marriage of flavor. The ingredients begin to brown during the baking process, which makes pizza taste so delicious.',
          price: 80,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/clubsandwich.webp',
          itemName: 'Club Sandwich',
          description:
            'A club sandwich, also called a clubhouse sandwich, is a sandwich consisting of bread (traditionally toasted), sliced cooked poultry, ham, fried bacon, lettuce, tomato, and mayonnaise. It is often cut into quarters or halves and held together by cocktail sticks.',
          price: 150,
          category: 'Fast Food',
        },
        {
          img: 'assets/menu items/lasagne.webp',
          itemName: 'Lasagne',
          description:
            'Lasagna is a wide, flat sheet of pasta. Lasagna can refer to either the type of noodle or to the typical lasagna dish which is a dish made with several layers of lasagna sheets with sauce and other ingredients, such as meats and cheese, in between the lasagna noodles.',
          price: 250,
          category: 'Fast Food',
        },
      ],
    },
    {
      BBQ: [
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/BBQChickenWings..webp',
          itemName: 'Bbq Chicken Wings',
          description:
            'Boneless wings are essentially small pieces of skinless, boneless chicken breast that are coated in flour and spices, then fried or baked.',
          price: 50,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/bbq.webp',
          itemName: 'Chicken Tikka',
          description:
            'It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi or over charcoal after marinating in Indian spices and dahi (yogurt)—essentially a boneless version of tandoori chicken.',
          price: 80,
          category: 'BBQ',
        },
        {
          img: 'assets/menu items/kebab.webp',
          itemName: 'Beef Kebab',
          description:
            'A kebab is pieces of meat or vegetables grilled on a long thin stick, or slices of grilled meat served in flat bread.',
          price: 150,
          category: 'BBQ',
        },
      ],
    },
  ];
  public MenuSelected: any;
  public addCategory: boolean = false;
  public addMenu: boolean = false;
  public itemDetailView: boolean = false;
  public itemDetail: any;
  public theBoundCallback: Function;
  public modalReference: any;
  public image: any;
  constructor(private cd: ChangeDetectorRef, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.Menus.map((e: any) => {
      const head: any = localStorage.getItem('heading')
      let word: any = head?.replace(/ /g, '_')
      if (word == 'Add_Item') {
        this.addMenu = true;
        this.addCategory = false;
      }
      if (word == 'Category') {
        this.addCategory = true;
        this.addMenu = false;
      }
      else {
        if (e.hasOwnProperty(word)) {
          this.MenuSelected = e[word];
        }
      }
    });
    this.observe();
    this.observePath();
  }
  backMenu(){
    UniversalService.headerHeading.next(localStorage.getItem('beforeAddMenu'))
  }
  async observe() {
    // UniversalService.headerHeading.subscribe((res: string) => {
    //   const word = res.replace(/ /g, '_');
    //   if (word == 'Add_Item') {
    //     this.addMenu = true;
    //     this.addCategory = false;
    //   }
    //   if (word == 'Category') {
    //     this.addCategory = true;
    //     this.addMenu = false;

    //   } else {
    //     this.Menus.map((e: any) => {
    //       if (e.hasOwnProperty(word)) {
    //         this.MenuSelected = e[word];
    //         this.addMenu = false;
    //         this.addCategory = false;
    //       }
    //     });
    //   }
    //   this.cd.detectChanges();
    // }),
      // (err: any) => console.log(err);
    UniversalService.cartShow.subscribe((res) => {
      if (res) {
        const word = JSON.stringify(localStorage.getItem('heading')).replace(
          / /g,
          '_'
        );
        this.Menus.map((e: any) => {
          if (e.hasOwnProperty(word)) {
            this.MenuSelected = e[word];
          }
        });
      }
      this.cd.detectChanges();
    }),
      (err: any) => console.log(err);
    UniversalService.itemDetailView.subscribe((res) => {
      if (res) {
        this.itemDetailView = true;
      } else {
        this.itemDetailView = false;
      }
      this.cd.detectChanges();
    }),
      (err: any) => console.log(err);
    UniversalService.itemDetail.subscribe((res) => {
      if (res) {
        this.itemDetail = res;
      } else {
        this.itemDetail = res;
      }
      this.cd.detectChanges();
    }),
      (err: any) => console.log(err);
  }
  async observePath() {
    // if (path) {
    //   this.router.navigate([`counter/${path}`]);
    // }
    // UniversalService.routePath.subscribe((res: string) => {
    //   let path = res.toLowerCase();
    //   this.router.navigate([`master/${path}`]);
    //   this.cd.detectChanges();
    // }),
    //   (err: any) => console.log(err);
  }
  open(content: any, modal: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  proceed() {
    this.modalReference.close();
  }
}
