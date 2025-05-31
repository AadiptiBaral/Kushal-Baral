import mongoose, {Schema, Document} from "mongoose";

export interface IIntroduction extends Document {
    introduction: string;
    description: string;
    descriptionTitle: string;  
    numberOfProjects: number;
    numberOfClients: number;
    clientSatisfaction: number;
    yearsOfExperience: number;
    resume: string; 
    personalValues: {
        icon: string;
        title: string;
        description: string;
    }[];
    email: string;
    phone: string;
    location: string;
}

const IntroductionSchema: Schema<IIntroduction> = new Schema({
    introduction: { type: String, required: true },
    description: { type: String, required: true },
    descriptionTitle: { type: String, required: true },
    numberOfProjects: { type: Number, required: true },
    numberOfClients: { type: Number, required: true },
    clientSatisfaction: { type: Number, required: true },
    yearsOfExperience: { type: Number, required: true },
    resume: { type: String, required: true },
    personalValues: [{
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true }
    }],
    email: { type: String, required: true, validate: /\S+@\S+\.\S+/ },
    phone: { type: String, required: true },
    location: { type: String, required: true }
}, {
    timestamps: true
});

export const Introduction = mongoose.model<IIntroduction>("Introduction", IntroductionSchema);
export default Introduction;