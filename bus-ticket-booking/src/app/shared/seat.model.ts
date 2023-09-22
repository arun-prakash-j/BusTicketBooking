export interface Seat {
  id: string;
  deck: 'lower' | 'upper';
  type: 'seater' | 'sleeper';
  isBooked: boolean;
  isSelected?: boolean;
  gender?: 'male' | 'female' | 'other'; // Add gender property if needed
}
