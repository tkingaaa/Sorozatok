import Sorozat from "./Sorozat";
import fs from "fs";

export default class Megoldas{
    private _epizodok: Sorozat[] = [];

    public get megjelentEpizodokSzama(): number {
        let db: number = 0;
        for (const e of this._epizodok) {
            if (e.datum != "NI") {
                db++;
            }
        }
        return db;
    }

    public get lattaSzazalek(): number{
        let lattadb: number = 0;
        for (const e of this._epizodok) {
            if (e.latta == true) {
                lattadb++;
            }
        }
        return (lattadb / this._epizodok.length)*100;
    }

    public get eltoltottIdo(): number{
        let osszesperc: number = 0;
        for (const e of this._epizodok) {
            if (e.latta == true) {
                osszesperc += e.hossz;
            }
        }
        return osszesperc;
    }

    public constructor(forrás: string){
        const adatok: string[] = fs.readFileSync(forrás).toString().split('\n');
        for (let i = 0; i < adatok.length; i+=5) {
            let aktadatok: string[] = [];
            aktadatok.push(adatok[i]);
            aktadatok.push(adatok[i+1]);
            aktadatok.push(adatok[i+2]);
            aktadatok.push(adatok[i+3]);
            aktadatok.push(adatok[i+4]);
            this._epizodok.push(new Sorozat(aktadatok));
        }
    }
}