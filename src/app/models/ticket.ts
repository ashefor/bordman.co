// tslint:disable-next-line
export interface tickets {
    potPrice: number;
    open: boolean;
    match: string;
    openingStake: number;
    createdAt: number;
    player1: player1;
    player2?: player1;
}

// tslint:disable-next-line
export interface player1 {
    outcome: string;
    createdAt: number;
    stake: number;
    userId?: string;
    userName?: string;
    userEmail?: string;
    ticketId?: string;
}
