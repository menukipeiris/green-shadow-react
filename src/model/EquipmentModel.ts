export class EquipmentModel {
    name: string;
    type: string;
    status: string;
    remarks: string;
    staffId: string;
    fieldId: string;

    constructor(name: string, type: string, status: string, remarks: string,staffId: string, fieldId: string) {
        this.name = name;
        this.type = type;
        this.status = status;
        this.remarks = remarks;
        this.staffId = staffId;
        this.fieldId = fieldId;
    }
}