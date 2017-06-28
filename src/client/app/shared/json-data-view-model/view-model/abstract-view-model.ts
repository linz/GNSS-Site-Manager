export abstract class AbstractViewModel {
    public startDate: string | any = null;
    public endDate: string | any = null;
    public dateInserted: string = null;
    public dateDeleted: string = null;
    public deletedReason: string = null;
    public isDeleted: boolean = false;
}
