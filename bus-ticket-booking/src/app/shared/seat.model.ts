export class Seat {
  id: number;
  deck: string;
  type: string;
  isBooked: boolean;
  gender: string;
  isSelected?: boolean;
  x: number;
  y: number;

  constructor(
    id: number,
    deck: string,
    type: string,
    isBooked: boolean,
    gender: string
  ) {
    this.id = id;
    this.deck = deck;
    this.type = type;
    this.isBooked = isBooked;
    this.gender = gender;
    this.isSelected = false;
    this.x = 0;
    this.y = 0;
  }
}
