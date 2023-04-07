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
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions  } from 'ngx-progressive-image-loader';
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
    // EllipsisPipe,
    // FilterPipe
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
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '30px',
      threshold: 0.1,
      // css filter
      filter: 'blur(3px)',
      // image width / height ratio for image holder
      imageRatio: 16 / 9,
      // loading image in placeholder. Can be URL or base64
      placeholderImageSrc:
        // tslint:disable-next-line:max-line-length
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
    }),
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
    TableComponent
  ]
})
export class SharedModule { }
