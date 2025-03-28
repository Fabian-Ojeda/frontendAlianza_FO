export interface Client {
  sharedKey: string;
  businessId: string;
  name?: string;
  lastName?: string;
  email: string;
  phone: string;
  dataStart: Date;
  dataFinish: Date;
}
