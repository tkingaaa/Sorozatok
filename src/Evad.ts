export default class Evad {
    private _cim: string;
    private _osszhossz: number;
    private _reszekdb: number;

    constructor(adatok: string[]) {
        const a: string[] = adatok;
        this._cim = a[0];
        this._osszhossz = parseInt(a[1]);
        this._reszekdb = parseInt(a[2]);
    }
}
