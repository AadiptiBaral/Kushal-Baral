import mongoose, {Schema, Document, mongo} from "mongoose";
import { UUID } from "crypto";

export interface IProject extends Document {
    title: string;
    description: string;
    longDescription: string;    
    image: string;
    category: string;
    tags: {
        id: UUID;
        name: string;
    }[];
    status: string;
    featured: boolean;
    year: number;
    client: string;
    duration: string;
    link: string;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{
        id: { type: String, required: true },
        name: { type: String, required: true }
    }],
    status: { type: String, required: true },
    featured: { type: Boolean, default: false },
    year: { type: Number, required: true },
    client: { type: String, required: true },
    duration: { type: String, required: true },
    link: { type: String, required: true }
}, {
    timestamps: true
});

const Project = (mongoose.models.Project as mongoose.Model<IProject>) || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;