

export class Device{
    id: number;
    serial_number: number;
    description: string;
    type: number;//1 or 2 or 3
    owner: null|number;

    constructor(id: number, serial_number: number,description: string,type:number,owner:number|null ){
      this.id = id;
      this.serial_number = serial_number;
      this.description = description;
      this.type = type;
      this.owner = owner;
    }


}
