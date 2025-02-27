export class VehicleModel {
    licensePlateNumber: string;
    vehicleCategory: string;
    fuelType: string;
    Status: string;
    remarks: string;
    staffName: string;

    constructor(licensePlateNumber: string, vehicleCategory: string, fuelType: string, Status: string, remarks: string, staffName: string) {
        this.licensePlateNumber = licensePlateNumber;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.Status = Status;
        this.remarks = remarks;
        this.staffName = staffName;

    }
}