
import { shell, app } from "electron";
import fs from "node:fs"
import path from "node:path"
//TODO: Find out how to use "import fs from "node:fs"" instead of this window.require crap,
//      so that TypeScript actually works someday.

export interface GameInfo {
    name:string;
    coverCardPath: string;
    coverCardStream: string;
    executablePath: string; 
    studiosName: string; 
    publishersName: string; 
    bgColor: string; 
    textColor: string; 
    bgCoverPath: string; 
    bgCoverStream: string; 
    description: string[]; 
    screenshotsPaths: string[]; 
    screenshotsStreams: string[]; 
    twitterHandle: string; 
    bskyHandle: string; 
    instagramHandle: string; 
    tiktokHandle: string; 
    website: string; 
    fullExecutablePath: string;
}

function GetFullPath(after: string)
{
    return "Games/" + after;
}

export function LoadGames() {
    const folders: string[] = fs.readdirSync("Games");
    const result: GameInfo[] = []
    folders.forEach((f) => {
        try {
            if(f.includes("sample.info.json"))
            {
                return;
            }
            const info = fs.readFileSync(GetFullPath(f + "/info.json" )).toString();
            const game: GameInfo = JSON.parse(info)

            game.coverCardStream = fs.readFileSync(GetFullPath(f + "/" + game.coverCardPath)).toString("base64");

            game.fullExecutablePath = GetFullPath(f + "/" + game.executablePath)

            result.push(game)
            console.log("Game loaded: " + game.name + " by " + game.studiosName)

        } catch (error) {
            console.log(error)
        }
    })
    return result;
}

export function StartGame(gameExecutablePath: string)
{
    let fullPath = app.getAppPath() + "\\" + path.join(gameExecutablePath);
    console.log(fullPath);
    shell.openExternal(fullPath)
}