import Sorozat from "./Sorozat";
import fs from "fs";

export default class Megoldas{
    private _epizodok: Sorozat[] = [];

    public get epizodokSzama(): number {
        return this._epizodok.length;
    }

    public constructor(forrás: string){
        const adatok: string[] = fs.readFileSync(forrás).toString().split("\n");
        for (let i = 0; i < adatok.length; i+=5) {
            const aktadatok: string[] = [];
            aktadatok.push(adatok[i]);
            aktadatok.push(adatok[i+1]);
            aktadatok.push(adatok[i+2]);
            aktadatok.push(adatok[i+3]);
            aktadatok.push(adatok[i+4]);
            this._epizodok.push(new Sorozat(aktadatok));
        }
    }
}