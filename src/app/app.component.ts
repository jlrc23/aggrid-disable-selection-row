import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  gridApi = undefined;
  suppressRowClickSelection = false;
  selectedRow: boolean = false;
  timeOut = undefined;
  nodeSelected = undefined
  puedecambiar = new FormControl('YES');
  columnDefs = [
      {headerName: 'Make', field: 'make', sortable: true, filter: true},
      {headerName: 'Model', field: 'model', sortable: true, filter: true },
      {headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];
  rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

    ngOnInit(){
      this.puedecambiar.valueChanges.subscribe((value)=>{
        console.log(value);
        this.suppressRowClickSelection = (value == "NO")
      });
      //this.puedecambiar.setValue("NO");
    }

    onGridReady(params) {
          this.gridApi = params.api;
    }

    onSelectionChanged($event) {
      const selectedRows = this.gridApi.getSelectedNodes();
      console.group("onSelectionChanged");
      console.log("onSelectionChanged");
      console.log(selectedRows[0].data);
      if(selectedRows.length>1){
        console.log(selectedRows[1].data);
      }
      console.log(selectedRows.length);
      console.groupEnd();
  }
  rowClick($event){
    console.log("(rowClick) Se recibio un click");
    console.log($event.data);
    console.log(typeof($event));
    if(this.suppressRowClickSelection){
      if(confirm("¿Deseas guardar tus cambios?")){
        console.log("Si se guardan");
      }else{
        debugger;
        this.suppressRowClickSelection = false;
        $event.node.setSelected(true, true);
        console.log("Se pierden");
      }

    }

  }

  onRowSelected($event){
    /*console.group("onRowSelected")
    console.log("onRowSelected::Data: ")
    console.log("puede cambiar:", this.puedecambiar.value);
  
    this.nodeSelected = $event.node;
     
    console.log($event.node.data)
    console.log("Selected: " + $event.node.selected)
    //window.alert("Row selected: " + $event.node.selected )
    console.groupEnd();*/
  }
  
}
