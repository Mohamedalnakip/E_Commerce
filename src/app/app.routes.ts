import { authGuard } from './core/guard/auth.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes: Routes = [
    
    {path:"",component:AuthLayoutComponent, children:[
        {path:"",redirectTo:"login",pathMatch:'full'},
        {path:"login",component:LoginComponent,title:"login"},
        {path:"forget-password",loadComponent:()=>import('./pages/forget-password/forget-password.component').then((classes)=>classes.ForgetPasswordComponent),title:"forget password"},
        {path:"verify-code",loadComponent:()=>import('./pages/verify-code/verify-code.component').then((classes)=>classes.VerifyCodeComponent),title:"verify code"},
        {path:"reset-password",loadComponent:()=>import('./pages/reset-password/reset-password.component').then((classes)=>classes.ResetPasswordComponent),title:"reset password"},
        {path:"register",loadComponent:()=>import("./pages/register/register.component").then((classes)=>classes.RegisterComponent),title:"register"},
    ]},

    {path:"",component:MainLayoutComponent,canActivate:[authGuard] ,children:[
        {path:"",redirectTo:"home",pathMatch:'full'},
        {path:"home",component:HomeComponent,title:"Home"},
        {path:"products",loadComponent:()=>import("./pages/products/products.component").then((classes)=>classes.ProductsComponent),title:"Product"},
        {path:"brands",loadComponent:()=>import("./pages/brands/brands.component").then((classes)=>classes.BrandsComponent),title:"Brands"},
        {path:"categories",loadComponent:()=>import("./pages/categories/categories.component").then((classes)=>classes.CategoriesComponent),title:"Categories"},
        {path:"cart",loadComponent:()=>import("./pages/carts/carts.component").then((classes)=>classes.CartsComponent),title:"Cart"},
        {path:"checkout/:c_id",loadComponent:()=>import("./pages/checkout/checkout.component").then((classes)=>classes.CheckoutComponent),title:"check out"},
        {path:"allorders",loadComponent:()=>import("./pages/allorders/allorders.component").then((classes)=>classes.AllordersComponent),title:"all orders"},
        {path:"wish-list",loadComponent:()=>import("./pages/wish-list/wish-list.component").then((classes)=>classes.WishListComponent),title:"wish list"},

        {path:"product-details/:p_id",loadComponent:()=>import("./pages/product-details/product-details.component").then((classes)=>classes.ProductDetailsComponent),title:"Cart"},

        {path:"**",component:NotFoundComponent,title:"Error 404"},
    ]},   
];
