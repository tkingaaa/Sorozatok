export default class Evad {
    private _cim: string;
    private _osszhossz: number;
    private _reszekdb: number;

    public get cim(): string {
        return this._cim;
    }

    public get osszhossz(): number {
        return this._osszhossz;
    }

    public get reszekdb(): number {
        return this._reszekdb;
    }

    constructor(adatok: string[]) {
        const a: string[] = adatok;
        this._cim = a[0];
        this._osszhossz = parseInt(a[1]);
        this._reszekdb = parseInt(a[2]);
    }
}
