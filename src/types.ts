export interface Card {
    word: string;
    color: TeamInfo['color'] | "neutral";
    revealed: boolean;
}

export interface TeamInfo {
    points: number
    color: "red" | "blue"
}

export interface Turn {
    color: TeamInfo['color'],
    player: "teller" | "guesser"
    turns?: number
}

export interface GameSettings {
    cardsData: Card[]
    turns: number
    teamSize: number
    modes: string
}