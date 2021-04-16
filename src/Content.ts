import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Sorozatok</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        const mo: Megoldas = new Megoldas("lista.txt");

        res.write(`2. feladat: A listában ${mo.megjelentEpizodokSzama} db vetítési dátummal rendelkező epizód van.\n`);
        res.write(`3. feladat: A listában lévő epizódok ${mo.lattaSzazalek.toFixed(2)}%-át látta.\n`);
        res.write(`4. feladat: Sorozatnézéssel ${Math.floor(mo.eltoltottIdo / 1440)} napot ${Math.floor((mo.eltoltottIdo % 1440) / 60)} órát és ${mo.eltoltottIdo % 60} percet töltött.\n`);
        res.write("5. feladat:\n");
        const datum: string = params.datum as string;
        res.write(`Adjon meg egy dátumot! Dátum =  <input type='text' name='datum' value='${datum}' style='max-width:100px;' onChange='this.form.submit();'>\n`);
        const reszek: string[] = mo.nemlattaKiir(datum);
        for (const r of reszek) {
            res.write(`${r}\n`);
        }
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
