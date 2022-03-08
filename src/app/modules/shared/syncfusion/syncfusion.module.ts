import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  GridModule,
  SortService,
  GroupService,
  FilterService,
  PageService,
  ResizeService,
  EditService,
  ToolbarService,
  CommandColumnService
} from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DataStateChangeEventArgs, DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    GridModule,
    DropDownListModule,
    TabModule,
    DatePickerModule,
    TextBoxModule,
    DialogModule
  ],
  providers: [
    SortService,
    GroupService,
    FilterService,
    PageService,
    ResizeService,
    EditService,
    ToolbarService,
    CommandColumnService,
  ],
  exports: [
    ButtonModule,
    GridModule,
    DropDownListModule,
    TabModule,
    DatePickerModule,
    TextBoxModule,
    DialogModule
  ]
})
export class SyncfusionModule { }
