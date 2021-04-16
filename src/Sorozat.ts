export default class Sorozat{
    private _datum: string;
    private _cim: string;
    private _resz: string;
    private _hossz: number;
    private _latta: boolean;

    public get datum(): string{
        return this._datum;
    }

    public get hossz(): number{
        return this._hossz;
    }

    public get latta(): boolean{
        return this._latta;
    }

    constructor(adatok: string[]){
        const a: string[] = adatok;
        this._datum = a[0].trim();
        this._cim = a[1].trim();
        this._resz = a[2].trim();
        this._hossz = parseInt(a[3]);
        if (a[4].trim() == '0') {
            this._latta=false;
        } else {
            this._latta = true;
        }
    }
}