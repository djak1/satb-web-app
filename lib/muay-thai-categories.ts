import { AgedCategories, Genders } from "@/app/generated/prisma";


export function calculateMuayThaiCategories(gender :Genders, weight: number, yearOfBirth: number){
    
    if (!Number.isFinite(weight) || weight <= 0) {
        throw new Error("Težina mora biti pozitivan broj.");
    }

    if (!Number.isInteger(yearOfBirth)) {
        throw new Error("Godište mora biti ceo broj.");
    }

    let  ageCategory : AgedCategories
    let weightCategory = 0;
    const age = new Date().getFullYear() - yearOfBirth;

    if(age >= 6 && age <= 7){
        ageCategory = AgedCategories.U8;
    }else if(age >= 8 && age <= 9){
        ageCategory = AgedCategories.U10;
    }else if(age >= 10 && age <= 11){
        ageCategory = AgedCategories.U12;
    }else if(age >= 12 && age <= 13){
        ageCategory = AgedCategories.U14;
    }else if(age >= 14 && age <= 15){
        ageCategory = AgedCategories.U16;
    }else if(age >= 16 && age <= 17){
        ageCategory = AgedCategories.U18;
    }else if(age >= 18 && age <= 23){
        ageCategory = AgedCategories.U24;
    }else if(age >= 24){
        ageCategory = AgedCategories.MASTERS_ELITE;
    }else{
        throw new Error("Wrong year of birth");
    }

    if(weight >= 30 && weight <= 32){
        weightCategory = 32
    }else if(weight > 32 && weight <= 34){
        weightCategory = 34
    }else if(weight > 34 && weight <= 36){
        weightCategory = 36
    }else if(weight > 36 && weight <= 38){
        weightCategory = 38
    }else if(weight > 38 && weight <= 40){
        weightCategory = 40
    }else if(weight > 40 && weight <= 42){
        weightCategory = 42
    }else if(weight > 42 && weight <= 44){
        weightCategory = 44
    }else if(weight > 44 && weight <= 46){
        weightCategory = 46
    }else if(weight > 46 && weight <= 48){
        weightCategory = 48
    }else if(weight > 48 && weight <= 50){
        weightCategory = 50
    }else if(weight > 50 && weight <= 52){
        weightCategory = 52
    }else if(weight > 52 && weight <= 54){
        weightCategory = 54
    }else if(weight > 54 && weight <= 56){
        weightCategory = 56
    }else if(weight > 56 && weight <= 58){
        weightCategory = 58
    }else if(weight > 58 && weight <= 60){
        weightCategory = 60
    }else if(weight > 60 && weight <= 63.5){
        weightCategory = 63.5
    }else if(weight > 63.5 && weight <= 67){
        weightCategory = 67
    }else if(weight > 67 && weight <= 71){
        weightCategory = 71
    }else if(weight > 71 && weight <= 75){
        weightCategory = 75
    }else if(weight > 75 && weight <= 81){
        weightCategory = 81
    }else if(weight > 81 && weight <= 86){
        weightCategory = 86
    }else if(weight > 86 && weight <= 91){
        weightCategory = 91
    }else if(weight > 91){
        weightCategory = 91.5
    }else{
        throw new Error("Wrong weight category");
    }

    return{
        ageCategory,
        weightCategory
    }
}