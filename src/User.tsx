import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { ExerciseName } from "./ExerciseName";
import { database } from "./auth";
import { Alert } from "react-native";
import { err } from "react-native-svg/lib/typescript/xml";
import { Exercise } from "./Exercise";

export type PR = {
  name: string;
  weight?: number;
  timestamp?: number;
}
export type Weight = {
  weight: number;
  timestamp: number;
}

type Changes = {
  weight : boolean,
  height : boolean,
  PRs : number[]
}

export class User {
  readonly email: string;
  private weight?: number;
  private height?: number;
  private PRs: PR[];
  private changes : Changes = {
    weight: false,
    height: false,
    PRs: []
  };
  readonly userDocPath: DocumentReference<DocumentData>;

  constructor(email: string);
  constructor(user: User);
  constructor(user: DocumentData);
  constructor(user: string | User | DocumentData) {
    if (typeof user === "string") {
      this.email = user;
      this.PRs = [];
    } else if(user.constructor == User){
      this.email = user.email;
      this.weight = user.weight? user.weight : 0;
      this.height = user.height? user.height : 0;
      this.PRs = user.PRs;
      this.changes = user.changes;
    }
    else{
      this.email = user.email;
      this.weight = user.weight??0;
      this.height = user.height??0;
      this.PRs = user.PRs??[];
    }
    this.userDocPath = doc(database, "users", this.email);
  }

  public getWeight() {
    return this.weight;
  }

  public setWeight(weight: number) {
    this.weight = weight;
    this.changes.weight = true;    
  }

  public getHeight() {
    return this.height;
  }

  public getPRs(){
    return this.PRs;
  }

  public setHeight(height: number) {
    this.height = height;
    this.changes.height = true;
  }

  public setPRs(prs : PR[]){
    prs.forEach((element, index) => {
      if(!this.PRs.some(item => item.name == element.name))
        this.changes.PRs.push(index);
    })
    this.PRs = prs;
  }

  public setPRValue(index: number, value: number){
    this.PRs[index].weight = value;
    if(!this.changes.PRs.includes(index))
      this.changes.PRs.push(index)
  }

  public saveChanges(callback: (success: boolean) => void) {
    const eventDocUpdate = doc(database, "users", this.email, 'events', new Date().toISOString().split('T')[0]);

    if (this.changes.weight && this.weight) {
      const weightHelper : Weight = {
        weight: this.weight,
        timestamp: new Date().getTime()
      }

      setDoc(eventDocUpdate, {weight: weightHelper}, {merge: true}).catch((error) => {
          Alert.alert("Error: ", error.message);
          callback(false);
        });
      this.changes.weight = false;
    }
    
    if (this.changes.PRs.length > 0) {
      const firestoreArray : PR[] =  this.PRs.map((value) => {return {name: value.name, weight: (value.weight)? value.weight : 0};});

      setDoc(eventDocUpdate, {PRs: firestoreArray}, {merge: true}).catch((error) => {
        Alert.alert("Error: ", error.message);
        callback(false);
      });

      this.changes.PRs = [];
    }

    setDoc(this.userDocPath, this.userDataToFirebase()).catch((error) => {
        Alert.alert("Error: ", error.message);
        callback(false);
      });
    callback(true);
  }

  public userDataToFirebase() {
    return {
      email: this.email,
      weight: this.weight,
      height: this.height,
      PRs: this.PRs.map(element => {
        return{
          name: element.name,
          weight: (element.weight)? element.weight : 0
        }
      })
    };
  }
}
