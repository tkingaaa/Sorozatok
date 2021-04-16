export default class Sorozat{
    private _datum: string;
    private _cim: string;
    private _resz: string;
    private _hossz: number;
    private _latta: boolean;

    public get datum(): string{
        return this._datum;
    }

    constructor(adatok: string[]){
        const a: string[] = adatok;
        this._datum = a[0];
        this._cim = a[1];
        this._resz = a[2];
        this._hossz = parseInt(a[3]);
        if (a[4] == '0') {
            this._latta=true;
        } else {
            this._latta = false;
        }
    }
}