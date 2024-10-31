import {
  LibraryBooks,
  Splitscreen,
  Work,
  School,
  Home,
  FamilyRestroom,
  HealthAndSafety,
  AttachMoney,
  Flight,
  SportsEsports,
  Group,
  Computer,
  DesignServices,
  Code,
  Create,
  Campaign,
  PointOfSale,
  Business,
  People,
  LocalLibrary,
  Science,
  EmojiObjects,
  Book,
  Event,
  AccessTime,
  Dashboard,
  Description,
  Folder,
  BarChart,
  FormatListBulleted,
  Note,
  Palette,
  Photo,
  PlayArrow,
  Settings,
  ShoppingCart,
  Star,
  Assignment,
  Groups,
  Build,
  Videocam,
  AccessAlarm,
  AirlineSeatFlat,
  Apartment,
  DirectionsBike,
  BusinessCenter,
  DirectionsCar,
  CreditCard,
  EventAvailable,
  FlightTakeoff,
  Restaurant,
} from "@mui/icons-material";
import { IconData } from "./types";

export const allProjectIcons: IconData[] = [
  { id: 1, name: "default", IconComponent: LibraryBooks },
  { id: 2, name: "project", IconComponent: Splitscreen },
  { id: 3, name: "work", IconComponent: Work },
  { id: 4, name: "school", IconComponent: School },
  { id: 5, name: "home", IconComponent: Home },
  { id: 6, name: "family", IconComponent: FamilyRestroom },
  { id: 7, name: "health", IconComponent: HealthAndSafety },
  { id: 8, name: "finance", IconComponent: AttachMoney },
  { id: 9, name: "travel", IconComponent: Flight },
  { id: 10, name: "hobbies", IconComponent: SportsEsports },
  { id: 11, name: "social", IconComponent: Group },
  { id: 12, name: "tech", IconComponent: Computer },
  { id: 13, name: "design", IconComponent: DesignServices },
  { id: 14, name: "development", IconComponent: Code },
  { id: 15, name: "writing", IconComponent: Create },
  { id: 16, name: "marketing", IconComponent: Campaign },
  { id: 17, name: "sales", IconComponent: PointOfSale },
  { id: 18, name: "management", IconComponent: Business },
  { id: 19, name: "consulting", IconComponent: People },
  { id: 20, name: "education", IconComponent: LocalLibrary },
  { id: 21, name: "research", IconComponent: Science },
  { id: 22, name: "creative", IconComponent: EmojiObjects },
  { id: 23, name: "book", IconComponent: Book },
  { id: 24, name: "calendar", IconComponent: Event },
  { id: 25, name: "clock", IconComponent: AccessTime },
  { id: 26, name: "code", IconComponent: Code },
  { id: 27, name: "dashboard", IconComponent: Dashboard },
  { id: 28, name: "document", IconComponent: Description },
  { id: 29, name: "folder", IconComponent: Folder },
  { id: 30, name: "graph", IconComponent: BarChart },
  { id: 31, name: "list", IconComponent: FormatListBulleted },
  { id: 32, name: "note", IconComponent: Note },
  { id: 33, name: "paint", IconComponent: Palette },
  { id: 34, name: "photo", IconComponent: Photo },
  { id: 35, name: "play", IconComponent: PlayArrow },
  { id: 36, name: "settings", IconComponent: Settings },
  { id: 37, name: "shopping_cart", IconComponent: ShoppingCart },
  { id: 38, name: "star", IconComponent: Star },
  { id: 39, name: "task", IconComponent: Assignment },
  { id: 40, name: "teamwork", IconComponent: Groups },
  { id: 41, name: "tools", IconComponent: Build },
  { id: 42, name: "videocam", IconComponent: Videocam },
  { id: 43, name: "access_alarm", IconComponent: AccessAlarm },
  { id: 44, name: "airline_seat_flat", IconComponent: AirlineSeatFlat },
  { id: 45, name: "apartment", IconComponent: Apartment },
  { id: 46, name: "bike", IconComponent: DirectionsBike },
  { id: 47, name: "business_center", IconComponent: BusinessCenter },
  { id: 48, name: "car", IconComponent: DirectionsCar },
  { id: 49, name: "credit_card", IconComponent: CreditCard },
  { id: 50, name: "event", IconComponent: EventAvailable },
  { id: 51, name: "flight_takeoff", IconComponent: FlightTakeoff },
  { id: 52, name: "restaurant", IconComponent: Restaurant },
];

export type IconName =
  | "default"
  | "project"
  | "work"
  | "school"
  | "home"
  | "family"
  | "health"
  | "finance"
  | "travel"
  | "hobbies"
  | "social"
  | "tech"
  | "design"
  | "development"
  | "writing"
  | "marketing"
  | "sales"
  | "management"
  | "consulting"
  | "education"
  | "research"
  | "creative"
  | "book"
  | "calendar"
  | "clock"
  | "code"
  | "dashboard"
  | "document"
  | "folder"
  | "graph"
  | "list"
  | "note"
  | "paint"
  | "photo"
  | "play"
  | "settings"
  | "shopping_cart"
  | "star"
  | "task"
  | "teamwork"
  | "tools"
  | "videocam"
  | "access_alarm"
  | "airline_seat_flat"
  | "apartment"
  | "bike"
  | "business_center"
  | "car"
  | "credit_card"
  | "event"
  | "flight_takeoff"
  | "restaurant";
