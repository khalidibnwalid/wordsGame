export interface Card {
    word: string;
    color: TeamInfo['color'] | "neutral";
    revealed: boolean;
}

export interface TeamInfo {
    points: number
    color: "red" | "blue" | "yellow" | "purple"
}

export interface Turn {
    color: TeamInfo['color'],
    player: "teller" | "guesser"
    turns?: number
    spectator?: boolean
}