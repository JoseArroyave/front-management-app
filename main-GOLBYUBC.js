import{a as R}from"./chunk-JB2BBJUD.js";import"./chunk-V3WSD4SW.js";import{Ba as v,Ca as P,P as c,ba as u,i,l as a,pa as l,s,t as m,ta as f,ua as d,va as h,wa as C,xa as H,ya as b}from"./chunk-6PQSHQPV.js";var e=class t{static \u0275fac=function(o){return new(o||t)};static \u0275cmp=m({type:t,selectors:[["management-root"]],standalone:!0,features:[u],decls:1,vars:0,template:function(o,n){o&1&&c(0,"router-outlet")},dependencies:[l,b]})};var r=class{toast=s(R);intercept(p,o){return o.handle(p).pipe(a(n=>{switch(n.status){case 401:this.toast.setToastPopup("Por favor intenta nuevamente","error");break;case 500:this.toast.setToastPopup("Ha ocurrido un error, comun\xEDcate con un asesor","error");break;case 404:this.toast.setToastPopup("Acci\xF3n inexistente, comun\xEDcate con un asesor","error");break;default:this.toast.setToastPopup("Ha ocurrido un error, contacta un asesor","error");break}return i(n)}))}};var g=[{path:"public",loadComponent:()=>import("./chunk-QVUENCLC.js").then(t=>t.PublicComponent),loadChildren:()=>import("./chunk-NCCSY5JN.js").then(t=>t.PublicRoutes)},{path:"pages",loadComponent:()=>import("./chunk-D2M52E7Y.js").then(t=>t.PageComponent),loadChildren:()=>import("./chunk-VLKNCUNY.js").then(t=>t.PageRoutes)},{path:"**",redirectTo:"public/not-found"}];var T={providers:[d(h(),C()),v(g,P()),{provide:f,useClass:r,multi:!0}]};H(e,T).catch(t=>console.error(t));
