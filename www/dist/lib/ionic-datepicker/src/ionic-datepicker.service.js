angular.module("ionic-datepicker.service",[]).service("IonicDatepickerService",function(){this.monthsList=["January","February","March","April","May","June","July","August","September","October","November","December"],this.getYearsList=function(e,r){var t=[],a=1900,i=2100;a=e?new Date(e).getFullYear():a,i=r?new Date(r).getFullYear():i;for(var u=a;u<=i;u++)t.push(u);return t}});