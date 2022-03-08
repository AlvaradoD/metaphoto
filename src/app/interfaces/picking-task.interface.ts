export interface PickingTask {
    task_number : number
    user_id : string
    user_text : string
    user_created_id : string
    user_approval_id : string
    product_id : string
    product_text : string
    batch_number : string
    qty : number
    qty_served : number
    qty_pending : number
    qty_checked : number
    qty_rejected : number
    qty_in_target : number
    status_id : string
    status_text : string
    picking_method_id : string
    priority_id : string
    priority_text : string
    reason_id : string
    reason_text : string
    date_created : Date
    date_approval : Date
    date_start : Date
    date_end : Date
    date_checked : Date
    date_dispatch : Date
    location_source_id : string
    location_target_id : string
    customer_id : string
    erp_document : string
    dispatch_number : number
    line_on_erp : number
    pallet_source : string
    company_id : string
    warehouse_id : string
    warehouse_text : string
    measure_unit : string
    product_group_code : string
    product_conversion : number
    product_purchase_unit : string
    product_reference_unit : string
    reference : string
    location_target_text : string
    customer_text : string
    location_source_text : string
    tote_id : string
    lot_number : string
    qty_available : number
    source_is_truck :boolean
    waveInstructions: string
    productInstructions: string
    task_unit: string 
    unit_found: string
}