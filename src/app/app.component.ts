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
      {headerName: 'id', field: 'id', sortable: true, filter: true},
      {headerName: 'value', field: 'value', sortable: true, filter: true }
  ];
  rowData = [
      { id: '1', value: 'Refrescos Individual'},
      { id: '2', value: 'Refrescos Familiar'},
      { id: '3', value: 'Otros' }
  ];

    ngOnInit(){
      this.puedecambiar.valueChanges.subscribe((value)=>{
        console.log(value);
        this.suppressRowClickSelection = (value == "NO")
      });
      
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
      if(confirm("¿Deseas cambiar de valor, tus cambios se van a perder?")){
        this.suppressRowClickSelection = false;
        $event.node.setSelected(true, true);
        console.log("Se pierden");
        this.puedecambiar.setValue("YES");
      }else{
        console.log("Si se guardan");
      }

    }

  }
}
