export class FieldModel{
    fieldName: string;
    location: string;
    extentSize: string;
    fieldImage1: File| null;
    fieldImage2: File | null;

    constructor(fieldName: string, location: string, extentSize: string, fieldImage1: File | null, fieldImage2: File | null) {
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
    }
}