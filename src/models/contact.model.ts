import mongoose, {Document, Schema} from 'mongoose';

export interface IContact extends Document {
    fullName: string;
    email: string;
    subject: string;
    message: string;
}

const ContactSchema: Schema<IContact> = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, validate: /\S+@\S+\.\S+/ },
    subject: { type: String, required: true },
    message: { type: String, required: true }
}, {
    timestamps: true
});
const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;