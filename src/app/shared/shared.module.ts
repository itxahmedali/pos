import { NgbCarouselModule, NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ItemComponent } from './item/item.component';
import { CartitemComponent } from './cartitem/cartitem.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MyorderComponent } from './myorder/myorder.component';
import { TableComponent } from './table/table.component';
import { OrderComponent } from './order/order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestedItemComponent } from './suggested-item/suggested-item.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormComponent } from './form/form.component';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from '../pipes/filter.pipe';
import { EllipsisPipe } from '../pipes/ellipses.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImgComponent } from './img/img.component';
// import { EllipsisPipe } from '../pipes/ellipses.pipe';
// import { FilterPipe } from '../pipes/filter.pipe';
@NgModule({
  declarations: [
    ItemComponent,
    CartComponent,
    CartitemComponent,
    ItemDetailComponent,
    WelcomeComponent,
    MyorderComponent,
    TableComponent,
    OrderComponent,
    SuggestedItemComponent,
    FormComponent,
    EllipsisPipe,
    FilterPipe,
    ImgComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    CarouselModule,
    NgbTooltip,
    LazyLoadImageModule,
    ToastrModule.forRoot({
    preventDuplicates: true,
    }),

  ],
  exports:[
    ItemComponent,
    CartComponent,
    ItemDetailComponent,
    MyorderComponent,
    OrderComponent,
    NgSelectModule,
    SuggestedItemComponent,
    FormComponent,
    TableComponent,
    EllipsisPipe,
    FilterPipe,
    ImgComponent
  ]
})
export class SharedModule { }
