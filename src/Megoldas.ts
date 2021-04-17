import Sorozat from "./Sorozat";
import fs from "fs";

export default class Megoldas {
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

    public get lattaSzazalek(): number {
        let lattadb: number = 0;
        for (const e of this._epizodok) {
            if (e.latta == true) {
                lattadb++;
            }
        }
        return (lattadb / this._epizodok.length) * 100;
    }

    public get eltoltottIdo(): number {
        let osszesperc: number = 0;
        for (const e of this._epizodok) {
            if (e.latta == true) {
                osszesperc += e.hossz;
            }
        }
        return osszesperc;
    }

    public nemlattaKiir(bedatum: string): string[] {
        const reszek: string[] = [];
        for (const e of this._epizodok) {
            if (Date.parse(e.datum) <= Date.parse(bedatum) && e.latta == false) {
                reszek.push(`${e.resz}\t${e.cim}`);
            }
        }
        return reszek;
    }

    public hetnapja(ev: number, ho: number, nap: number): string {
        const napok: string[] = ["v", "h", "k", "sze", "cs", "p", "szo"];
        const honapok: number[] = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        if (ho < 3) ev--;
        return napok[(ev + Math.floor(ev / 4) - Math.floor(ev / 100) + Math.floor(ev / 400) + honapok[ho - 1] + nap) % 7];
    }

    public adottNapKiir(benap: string): string[] {
        const cimek: string[] = [];
        for (const e of this._epizodok) {
            const aktdatum: string[] = e.datum.split(".");
            if (benap == this.hetnapja(parseInt(aktdatum[0]), parseInt(aktdatum[1]), parseInt(aktdatum[2]))) {
                if (!cimek.includes(e.cim)) {
                    cimek.push(e.cim);
                }
            }
        }
        return cimek;
    }

    public epizodokSzama(cim: string): number {
        let epizodok: number = 0;
        for (const e of this._epizodok) {
            if (cim == e.cim) {
                epizodok++;
            }
        }
        return epizodok;
    }

    public osszHossz(cim: string): number {
        let ossz: number = 0;
        for (const e of this._epizodok) {
            if (cim == e.cim) {
                ossz += e.hossz;
            }
        }
        return ossz;
    }

    public get evadokArray(): string[] {
        const cimek: string[] = [];
        const evadok: string[] = [];
        for (const e of this._epizodok) {
            if (!cimek.includes(e.cim)) {
                evadok.push(`${e.cim} ${this.osszHossz(e.cim)} ${this.epizodokSzama(e.cim)}`);
                cimek.push(e.cim);
            }
        }
        return evadok;
    }

    public constructor(forrás: string) {
        const adatok: string[] = fs.readFileSync(forrás).toString().split("\n");
        for (let i = 0; i < adatok.length; i += 5) {
            const aktadatok: string[] = [];
            aktadatok.push(adatok[i]);
            aktadatok.push(adatok[i + 1]);
            aktadatok.push(adatok[i + 2]);
            aktadatok.push(adatok[i + 3]);
            aktadatok.push(adatok[i + 4]);
            this._epizodok.push(new Sorozat(aktadatok));
        }
    }

    public summaÁllománybaÍr(állomány: string): void {
        const ki: string[] = [];
        this.evadokArray.forEach(i => {
            ki.push(i);
        });
        fs.writeFileSync(állomány, ki.join("\r"));
    }
}
