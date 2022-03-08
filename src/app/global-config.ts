import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  publicUserName: string = '';
  publicEnvironment: string = '';
  publicReturnCode: string = '';
  publicReturnDesc: string = '';
  publicCodProduct: string = '';
  publicDC: string = 'LOUDC';
  publicSelectedProduct: string = '';
  publicCodCompany: string = "01";
  publicDefaultWH: string = "01";
  publicScanLocationEnforced: boolean = false;
  publicScanProductEnforced: boolean = false;
  relocation_confirm_full_pallet: boolean = false;
  publicScanQuantityEnforced: boolean = false;
  publicScanToteEnforced: boolean = false;
  publicQuantityEnforced: number = 0;
  publicDueDateRequiered: boolean = false;
  publicArrivalsIsRestrictedBy: string = '';
  publicReceivingPreloadLots: boolean = false;
  publicRelocationTaskSearchByPallet:string='1';
  publicForklift: string='';
  publicTimeOffset: number=0;
  publicEnablePageRedirect:boolean =false;
  clearLeadingZeros(barcode: string): string {
    while(barcode.startsWith('0')){
      barcode = barcode.substring(1)
    }
    return barcode
  }
}
