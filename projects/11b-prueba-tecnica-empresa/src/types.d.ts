declare global {
  interface Array<T> {

    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export interface RootObject {
  info: Info
  results: User[]
}

export interface Info {
  page: number
  results: number
  seed: string
  version: string
}

export interface User {
  cell: string
  dob: Dob
  email: string
  gender: Gender
  id: ID
  location: Location
  login: Login
  name: Name
  nat: string
  phone: string
  picture: Picture
  registered: Dob
}

export interface Dob {
  age: number
  date: Date
}

export enum Gender {
  Female = 'female',
  Male = 'male',
}

export interface ID {
  name: string
  value: null | string
}

export interface Location {
  city: string
  coordinates: Coordinates
  country: string
  postcode: number | string
  state: string
  street: Street
  timezone: Timezone
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Street {
  name: string
  number: number
}

export interface Timezone {
  description: string
  offset: string
}

export interface Login {
  md5: string
  password: string
  salt: string
  sha1: string
  sha256: string
  username: string
  uuid: string
}

export interface Name {
  first: string
  last: string
  title: Title
}

export enum Title {
  MS = 'Ms',
  Mademoiselle = 'Mademoiselle',
  Miss = 'Miss',
  Monsieur = 'Monsieur',
  Mr = 'Mr',
  Mrs = 'Mrs',
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country'
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}
