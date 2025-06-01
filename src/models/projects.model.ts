import mongoose, {Schema, Document} from "mongoose";


export interface IProject extends Document {
    title: string;
    description: string;
    longDescription?: string;    
    image?: string;
    category: string;
    tags: {
        id: string;
        name: string;
    }[];
    status: string;
    featured: boolean;
    year: number;
    client: string;
    duration?: string;
    link?: string;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: false },
    image: { type: String, required: false },
    category: { type: String, required: true },
    tags: [{
        id: { type: String, required: true },
        name: { type: String, required: true }
    }],
    status: { type: String, required: true },
    featured: { type: Boolean, default: false },
    year: { type: Number, required: true },
    client: { type: String, required: true },
    duration: { type: String, required: false },
    link: { type: String, required: false }
}, {
    timestamps: true
});

const Project = (mongoose.models.Project as mongoose.Model<IProject>) || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;